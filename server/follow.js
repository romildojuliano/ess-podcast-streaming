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
            response = {
                status: 401,
                message: 'voce deve estar logado para seguir um usuario'
            }
        } else if (id2 === -1) {
            response = {
                status: 404,
                message: 'usuario não encontrado'
            }
        } else if (id1 === id2) {
            response = {
                status: 406,
                message: 'voce não pode seguir sua propria conta'
            }
        } else if (users[id1].following.includes(userToFollow)) {
            response = {
                status: 304,
                message: 'você já segue esse usuario'
            }
        } else {
            users[id1].following.push(userToFollow);
            users[id2].followers.push(userID);
    
            response.message = db.writeData(users);
            response.status = 200;
        }

        res.json(response);
    })

    //function to undo the follow relation
    app.delete('/users/:userId/following', (req, res) => {
        const userID = req.params.userId;
        const userToUnfollow = req.query.user_to_unfollow;
        const users = db.readData();
        
        const response = {}

        const id1 = users.findIndex(user => user.username === userID)
        const id2 = users.findIndex(user => user.username === userToUnfollow)

        users[id1].following.pop(userToUnfollow);
        users[id2].followers.pop(userID);

        response.message = db.writeData(users);

        res.json(response);
    })
}