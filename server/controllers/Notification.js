const { Notification } = require('../models');
const { ObjectId } = require('mongoose').Types;

exports.getNotifications = (req, res) => {
  if (req.user._id !== req.params.userId) {
    return res.status(403).json({
      error: 'Access denied.'
    });
  }
  const { userId } = req.params;
  Notification.find({ user: userId })
    .populate({ path: 'user', select: 'name' })
    .populate({ path: 'investor', select: 'name profilePic' })
    .populate({ path: 'project', select: 'title' })
    .sort([['date', 'desc']])
    .exec((err, notifications) => {
      if (err) return res.status(400).json({ err });

      return res.status(200).json(notifications);
    });
};

exports.deleteNotification = (req, res) => {
  const { notificationId } = req.params;
  const { _id } = req.user;

  Notification.deleteOne({ _id: notificationId, 'user._id': _id }, function (err) {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(200).json('Notification successfully deleted.');
  })
}