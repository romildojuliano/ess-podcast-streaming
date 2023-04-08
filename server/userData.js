const fs = require('fs');
module.exports = function(app){

  app.get('/getUser/:username', (req, res) => {
    const userID = req.params.username
    const users = JSON.parse(fs.readFileSync('./samples/users.json', 'utf8'));
    const podcasts = JSON.parse(fs.readFileSync('./samples/podcasts.json', 'utf8'));

    const id = users.findIndex(user => user.username === userID)
    const userPods = podcasts.filter(a => a.author === userID)

    let results = {}

    if(id === -1) {
      res.status = 404;
      results = {
        data: {},
        message: 'user not found'
      }
    } else {
      res.status = 200;
      results = {
        data: {
          userData: {...users[id], password: null},
          podcasts: userPods
        },
        message: 'user found'
      }
    }

    res.send(results);
  })
}