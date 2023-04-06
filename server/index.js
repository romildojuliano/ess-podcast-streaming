const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./favorites')(app)
require('./search')(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})