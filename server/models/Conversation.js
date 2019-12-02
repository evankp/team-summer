const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ConversationSchema = new Schema({
  users: [{
    type: ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: ObjectId,
    ref: 'Message'
  }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);