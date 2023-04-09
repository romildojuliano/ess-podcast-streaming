var fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const port = 4000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

require('./favorites')(app);
require('./userData')(app);
require('./follow')(app);
require('./podcasts')(app);
require('./search')(app, db);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} with cors`)
})