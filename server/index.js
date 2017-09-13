var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 3000;

var Chat = require('./models/chat').Chat;
var DB_URI = 'mongodb://@ds161503.mlab.com:61503/teubanks-projects';

var chatRoutes = require('./routes/chat-routes');

mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, { useMongoClient: true });

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

chatRoutes(app);

app.listen(port);
console.log(`App running on port ${port}`);
