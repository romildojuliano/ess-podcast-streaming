const favoritesController = require('../controllers/favorites');

module.exports = function(app){
app.get('/favorites/:username', favoritesController.getUserFavorites);
app.post('/favorite/:username', favoritesController.favoritePodcast);
}