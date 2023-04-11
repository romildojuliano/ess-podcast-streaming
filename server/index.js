var fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const port = 4000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const JSONDatabase = require('./JSONDatabase');
const favoritesController = require('./controllers/favorites');

const db = new JSONDatabase('./samples/users.json');

require('./userData')(app);
require('./follow')(app);
require('./podcasts')(app);
require('./search')(app, db);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/search', (req, res) => {
  console.log('Search Request Recieved')
  const query = req.query.q;
  console.log(query)
  if (query) {
      const results = db.getAllMatchingNames(query);
      res.json(results);
  } else {
      const allRecords = db.getAll();
      res.json(allRecords);
  }
});

app.get('/favorites/:username', favoritesController.getUserFavorites);
app.post('/favorite/:username', favoritesController.favoritePodcast);

app.get('/podcast/:name', (req, res) => {
  var data = JSON.parse(fs.readFileSync('./samples/podcasts.json', 'utf8'));
  res.json(data.find(({name}) => name == req.params.name));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} with cors`)
})