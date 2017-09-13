module.exports = function chatRoutes(app) {
  var chatController = require('../controllers/chat-controller.js');

  app.route('/chats')
    .get(chatController.listChats);

  app.route('/chats/:chatId')
    .get(chatController.getChat)
    .post(chatController.createChat)
    .put(chatController.insertMessage)
    .delete(chatController.deleteChat);
}

// app.get('/api/songs', (req, res) => {
//   var sampleChat = new Chat({
//     topic: 'Ghost',
//     users: ['twelve sided die', 'picnic table'],
//     messages: [
//       new Message({
//         sender: 'twelve sided die',
//         body: 'sup wit it'
//       }),
//       new Message({
//         sender: 'picnic table',
//         body: 'yogi beara'
//       })
//     ]
//   });
//
//   sampleChat.save(function (err) {
//     if (err) throw err;
//
//     console.log('Chat saved successfully!');
//   });
//
//   res.send('whatever');
// });
