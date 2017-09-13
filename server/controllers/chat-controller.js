var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');
var Message = mongoose.model('Message');

exports.listChats = function (req, res) {
  Chat.find({}, function findAllChats(err, chats) {
    if (err) res.send(err);
    res.json(chats);
  });
}

exports.getChat = function (req, res) {
  Chat.findOne({ topic: req.params.chatId }, function findChat(err, chat) {
    if (err) res.send(err);
    res.json(chat);
  });
}

exports.createChat = function (req, res) {
  var newChat = new Chat(req.body);
  newChat.save(function (err, chat) {
    if (err) res.send(err);
    res.json(chat);
  });
}

exports.insertMessage = function (req, res) {
  var newMessage = new Message({
    sender: req.body.sender,
    body: req.body.body
  });

  Chat.findOneAndUpdate({ topic: req.params.chatId }, { $push: { messages: newMessage } }, {}, function insertMessage(err, chat) {
    if (err) res.send(err);
    res.json(chat);
  });
}

exports.deleteChat = function (req, res) {
  res.json('Upcoming feature');
}
