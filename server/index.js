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
require('./follow')(app);



app.get('/podcasts/politics', (req, res) =>{
  let rawdata = fs.readFileSync('./samples/podcasts.json', 'utf-8');
  let podcasts = JSON.parse(rawdata)
  let podpolitics = podcasts.filter(x=> x.subject=="Politics")
  res.send(podpolitics)
})

app.get('/podcasts/economy', (req,res) =>{
  var rawdata = fs.readFileSync('./samples/podcasts.json', 'utf-8');
  var podcasts = JSON.parse(rawdata)
  var podeconomy = podcasts.filter(x=> x.subject=="Economy")
  res.send(podeconomy)
})

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