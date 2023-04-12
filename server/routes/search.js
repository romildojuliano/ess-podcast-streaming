const searchController = require("../controllers/search")

module.exports = function(app){
    app.get('/search', searchController.searchUser);
   
}