var fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');
const followController = require('./controllers/followController');

require('./routes/favorites')(app);
require('./routes/follow.routes')(app);
require('./userData')(app);
require('./podcasts')(app);
require('./routes/search')(app);
require('./history')(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/podcast/:name', (req, res) => {
  var data = JSON.parse(fs.readFileSync('./samples/podcasts.json', 'utf8'));
  res.json(data.find(({name}) => name == req.params.name));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} with cors`)
})