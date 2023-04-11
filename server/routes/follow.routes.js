const followController = require('../controllers/followController');

module.exports = function(app){
    //function to get the users i'm following
    app.get('/users/:userId/following', followController.getFollowing);

    //function to get users that follow me
    app.get('/users/:userId/followers', followController.getFollowers)

    //function to create the follow relation
    app.post('/users/:userId/following', followController.follow)

    //function to undo the follow relation
    app.delete('/users/:userId/following', followController.unFollow)

    //function to unfollow everyone
    app.delete('/users/:userId/unfollow_all', followController.unFollowAll)
}