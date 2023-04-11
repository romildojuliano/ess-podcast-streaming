var Podcast = require('../models/Podcast');
var UserFavoritePodcast = require('../models/UserFavoritePodcast');
var fs = require('fs');
const JSONDatabase = require('../JSONDatabase');
const dbFavorites = new JSONDatabase('./samples/favorites.json');
const dbPodcasts = new JSONDatabase('./samples/podcasts.json');


exports.getUserFavorites = (req, res) => {
    var data = dbFavorites.getPartition(req.params.username);
    var podcastsData = dbPodcasts.getAll(); 
    data = data.map(favorite => {
      var podcast = podcastsData.find(podcast => podcast.name == favorite.podcast);
      if(podcast != null) {
        return new Podcast({...podcast, favorited_at: favorite.created_at});
      }
      else {
        return null
      }
    }).filter(favorite => favorite != null);
    res.send(data);
};

exports.favoritePodcast =  (req, res) => {    
    if(req.body == null || req.body.podcast == null || req.body.podcast.length < 3) {
      res.status(400).send({error:'Invalid Podcast'}).end();
      return;
    }
    var data = dbFavorites.getData();
    var lastFavoriteIndex =  data[req.params.username] != null ? data[req.params.username].findIndex(favorite => favorite.podcast == req.body.podcast) : -1;
    if( lastFavoriteIndex == -1  ) {
      var favorite = new UserFavoritePodcast(req.params.username, req.body.podcast);
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
    dbFavorites.writeData(data);
    res.send(lastFavoriteIndex == -1 ? {message: "Favorite with success"} : {message: "Disfavor with success"});
};

