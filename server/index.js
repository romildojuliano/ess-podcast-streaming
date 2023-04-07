var fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 4000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

require('./favorites')(app);
require('./userData')(app);
require('./follow')(app);
require('./podcasts')(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/search', (req, res) => {
  const query = req.query.q;
  if (query) {
      const results = db.getAllMatchingNames(query);
      res.json(results);
  } else {
      const allRecords = db.getAll();
      res.json(allRecords);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})