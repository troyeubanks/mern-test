var mongoose = require('mongoose');

// SCHEMA
var messageSchema = mongoose.Schema({
  sender: String,
  sentAt: { type: Date, default: Date.now },
  body: String
});

var chatSchema = mongoose.Schema({
  topic: { type: String, unique: true },
  users: [String],
  messages: [messageSchema]
});

var Message = mongoose.model('Message', messageSchema);
var Chat = mongoose.model('Chat', chatSchema);

module.exports = {
  // insertTestChats: insertTestChats
  Message: Message,
  Chat: Chat
}
