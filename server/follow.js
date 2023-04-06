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

    app.post('/users/:userId/following', (req, res) => {
        const userID = req.params.userId;
        const userToFollow = req.query.user_to_follow;
        const users = db.readData();
        
        const response = {}

        const id1 = users.findIndex(user => user.username === userID)
        const id2 = users.findIndex(user => user.username === userToFollow)

        users[id1].following.push(userToFollow);
        users[id2].followers.push(userID);

        response.message = db.writeData(users);

        res.json(response);
    })
}