'use strict';
const { User } = require('../models');
const { encodeToken } = require('../utils');
const {decodeToken} = require('../utils');

exports.register = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const { name, email, _id } = user;
            const token = encodeToken({ name, email, _id });
            return res.status(201).json({
                status: 201,
                token,
                user: {
                    _id,
                    name,
                    email
                }
            });
        }
    });
}

exports.login = (req, res) => {
    const { name, password } = req.body;
    User.findOne({
        name
    }, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'User not found' });
        } else if (user && user.comparePassword(password)) {
            const { name, email, _id } = user;
            const token = encodeToken({ name, email, _id });
            return res.json({
                status: 200,
                token,
                user: {
                    _id,
                    name,
                    email
                }
            });
        } else {
            return res.json({
                status: 401,
                message: 'invalid name/password'
            });
        }
    });
}

exports.userById = (req, res, next, id) => {
        User.findById(id)
        .populate('projects')
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'Projects not found.'
                });
            }
            const { _id, name, email, projects } = user;
            req.profile = {  _id, name, email, projects }
        })
        next();
}

exports.isAuth = (req, res, next) => {
    const {authorization} = req.headers;
    if (authorization) {
        const token = authorization.split(' ')[1];
        const decodedToken = decodeToken(token);
        req.user = decodedToken.payload;
    } 
    let user = req.profile && req.user._id && req.profile._id == req.user._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
}