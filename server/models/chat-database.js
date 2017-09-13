var mongoose = require('mongoose');

const DB_URI = 'mongodb://TEubanks:something@ds161503.mlab.com:61503/teubanks-projects';

// SCHEMA
var messageSchema = mongoose.Schema({
  sender: String,
  sentAt: { type: Date, default: Date.now },
  body: String
});

var chatSchema = mongoose.Schema({
  topic: { type: [String] }, unique: true },
  users: [String],
  messages: [messageSchema]
});

function insertTestChats() {
  mongoose.connect(DB_URI, { useMongoClient: true });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));

  db.once('open', function() {
    var testMessages = [
      new Message({
        sender: 'Whittlestein',
        body: 'And puck'
      }),
      new Message({
        sender: 'Sighing and Crying',
        body: 'Vertical blinds are seriously annoying'
      })
    ];

    var testChat = new Chat({
      topic: 'Testing in vesting',
      users: ['Whittlestein', 'Sighing and Crying'],
      messages: testMessages
    });

    testChat.save(function (err, testChat) {
      if (err) return console.error(err);
    });
  });
}

function insertMessage(chatId, message) {
  mongoose.connect()
}

// module.exports = {
//   insertTestDoc: function insertTestDoc() {
//     MongoClient.connect(DB_URI, function(err, db) {
//       assert.equal(null, err);
//       insertDocument(db, function() {
//         db.close();
//       });
//     });
//   }
// }
