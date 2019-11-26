const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ProjectSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 2000
    },
    subtitle: {
        type: String,
        maxlength: 500
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    fundingGoal: {
        type: Number,
        trim: true
    },
    fundingDeadline: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Project", ProjectSchema);