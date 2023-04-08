var fs = require('fs');
module.exports = function(app){

  app.get('/favorites/:username', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./samples/favorites.json', 'utf8')); 
    var result = data[req.params.username] != null ? data[req.params.username].filter(favorite => favorite.username == req.params.username) : [];
    res.send(result);
  })

  app.post('/favorite/:username', (req, res) => {
    if(req.body.podcast == null || req.body.podcast.length < 3) {
      res.status(400).send('Invalid Podcast').end();
    }
    var data = JSON.parse(fs.readFileSync('./samples/favorites.json', 'utf8')); 
    var lastFavoriteIndex =  data[req.params.username] != null ? data[req.params.username].findIndex(favorite => favorite.podcast == req.body.podcast) : -1;
    if( lastFavoriteIndex == -1  ) {
      var favorite = {"username": req.params.username, "podcast": req.body.podcast, "created_at": new Date().toISOString() };
      if(data[req.params.username] != null) {
        data[req.params.username].push(favorite);
      }
      else{
        data[req.params.username] = [favorite];
      }
    }
    else {
      data[req.params.username].splice(lastFavoriteIndex, 1); 
    }
    fs.writeFileSync('./samples/favorites.json', JSON.stringify(data) );
    res.send(lastFavoriteIndex == -1 ? "Favorite with success" : "Disfavor with success");
  })
}