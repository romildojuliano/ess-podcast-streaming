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
}