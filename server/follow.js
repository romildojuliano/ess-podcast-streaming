const fs = require('fs');
const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

module.exports = function(app){

    //function to get the users i'm following
    app.get('/users/:userId/following', (req, res) => {
        const userID = req.params.userId;
        const data = db.getAllMatchingNames([userID])[0];

        const response = {
            status: data ? 200 : 404,
            data: data ? data.following : null,
            message: data ? `seguindo ${data.following.length} usuários` : 'usuário não encontrado'
        }

        res.json(response);
    })

    //function to get users that follow me
    app.get('/users/:userId/followers', (req, res) => {
        const userID = req.params.userId;
        const data = db.getAllMatchingNames([userID])[0];

        const response = {
            status: data ? 200 : 404,
            data: data ? data.followers : null,
            message: data ? `${data.followers.length} seguidores` : 'usuário não encontrado'
        }

        res.json(response);
    })

    //function to create the follow relation
    app.post('/users/:userId/following', (req, res) => {
        const userID = req.params.userId;
        const userToFollow = req.query.user_to_follow;
        const users = db.readData();
        
        let response = {}

        const id1 = users.findIndex(user => user.username === userID)
        const id2 = users.findIndex(user => user.username === userToFollow)

        if (id1 === -1) {
            res.status(401);
            response = {
                data: {},
                message: 'voce deve estar logado para seguir um usuario'
            }
        } else if (id2 === -1) {
            res.status(404);
            response = {
                data: {},
                message: 'usuario não encontrado'
            }
        } else if (id1 === id2) {
            res.status(406);
            response = {
                data: {},
                message: 'voce não pode seguir sua propria conta'
            }
        } else if (users[id1].following.includes(userToFollow)) {
            res.status(400);
            response = {
                data: users[id1].following,
                message: 'você já segue esse usuario'
            }
        } else {
            users[id1].following.push(userToFollow);
            users[id2].followers.push(userID);
    
            response.message = db.writeData(users);
            response.data = users[id1].following;
            res.status(200);
        }

        res.json(response);
    })

    //function to undo the follow relation
    app.delete('/users/:userId/following', (req, res) => {
        const userID = req.params.userId;
        const userToUnfollow = req.query.user_to_unfollow;
        const users = db.readData();
        
        let response = {}

        const id1 = users.findIndex(user => user.username === userID)
        const id2 = users.findIndex(user => user.username === userToUnfollow)

        if (id1 === -1) {
            res.status(401);
            response = {
                data: {},
                message: 'voce deve estar logado para deixar de seguir um usuario'
            }
        } else if (id2 === -1) {
            res.status(404);
            response = {
                data: {},
                message: 'usuario não encontrado'
            }
        } else if (!users[id1].following.includes(userToUnfollow)) {
            res.status(400);
            response = {
                data: {},
                message: 'você não segue esse usuario'
            }
        } else {
            users[id1].following.pop(userToUnfollow);
            users[id2].followers.pop(userID);
    
            response.message = db.writeData(users);
            response.data = users[id1].following;
            res.status(200);
        }

        res.json(response);
    })


    //function to unfollow everyone
    app.delete('/users/:userId/unfollow_all', (req, res) => {
        const userID = req.params.userId;
        const users = db.readData();

        const id = users.findIndex(user => user.username === userID)

        users[id].following.forEach(user2 => {
            const id2 = users.findIndex(user => user.username === user2);
            users[id2].followers.pop(userID);
        })

        users[id].following = [];

        db.writeData(users);

        const response = {
            data: users[id].following,
            message: ''
        }

        res.json(response);
    })
}