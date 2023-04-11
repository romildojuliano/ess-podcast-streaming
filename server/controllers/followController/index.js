const JSONDatabase = require('../../JSONDatabase');
const User = require('../../models/User');
const { errorHandle } = require('./errorHandle')

const db = new JSONDatabase('./samples/users.json');

class FollowController {
    async getFollowing(req, res) {
        const userID = req.params.userId;
        const user = new User(db.getAllMatchingNames([userID])[0]);

        let {response, status} = errorHandle(null, user, null);

        if (status === 200) {
            response = {
                data: user.following,
                message: `seguindo ${user.following.length} usuários`
            }
        }

        res.status(status);
        res.json(response);
    }

    async getFollowers(req, res) {
        const userID = req.params.userId;
        const user = new User(db.getAllMatchingNames([userID])[0]);

        let {response, status} = errorHandle(null, user, null);

        if (status === 200) {
            response = {
                data: user.followers,
                message: `${user.followers.length} seguidores`
            }
        }

        res.status(status);
        res.json(response);
    }

    async follow(req, res) {
        const userID = req.params.userId;
        const userToFollow = req.query.user_to_follow;

        const user1 = new User(db.getAllMatchingNames([userID])[0]);
        const user2 = new User(db.getAllMatchingNames([userToFollow])[0]);

        let {response, status} = errorHandle(user1, user2, true);

        if (status === 200) {
            user1.following.push(userToFollow);
            user2.followers.push(userID);

            db.updateRegisters('username', [user1, user2]);
    
            response = {
                data: user1.following,
                message: 'success',
            }
        }

        res.status(status);
        res.json(response);
    }

    async unFollow(req, res){
        const userID = req.params.userId;
        const userToUnfollow = req.query.user_to_unfollow;
        
        const user1 = new User(db.getAllMatchingNames([userID])[0]);
        const user2 = new User(db.getAllMatchingNames([userToUnfollow])[0]);
        
        let {response, status} = errorHandle(user1, user2, false);

        if (status === 200) {
            user1.following.pop(userToUnfollow);
            user2.followers.pop(userID);
    
            db.updateRegisters('username', [user1, user2]);
    
            response = {
                data: user1.following,
                message: 'success',
            }
        }

        res.status(status);
        res.json(response);
    }

    async unFollowAll(req, res) {
        const userID = req.params.userId;

        const user = new User(db.getAllMatchingNames([userID])[0]);

        const usersToUpdate = [];

        let {response, status} = errorHandle(null, user, null);

        if (status === 200) {
            user.following.forEach(element => {
                const user2 = new User(db.getAllMatchingNames([element])[0]);
                user2.followers.pop(userID);
                usersToUpdate.push(user2);
            })

            user.following = [];

            usersToUpdate.push(user)

            db.updateRegisters('username', usersToUpdate)

            response = {
                data: user.following,
                message: ''
            }
        }

        res.status(status);
        res.json(response);
    }
}

module.exports = new FollowController();