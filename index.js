const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/songs', (req, res) => {
  const testReponse = {
    title: 'Traphouse',
    artist: 'Tory Lanez',
    album: 'Traphouse',
    year: '2015'
  };

  res.json(testReponse);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App running on port ${port}`);
