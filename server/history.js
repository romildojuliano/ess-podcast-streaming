
const JSONDatabase = require('./JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

module.exports = function(app){

    app.get('/users/:username/history', (req, res) => {
        const username = req.params.username;
        const data = db.getAllMatchingNames([username])[0];

        const response = {
            status: data ? 200 : 404,
            data: data ? data.history : null,
            message: data ? `Ouviu ${data.history.length} podcasts` : 'Ainda não ouviu nenhum podcast'
        }

        res.json(response);
    })
    
}

  