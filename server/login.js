const JSONDatabase = require("./JSONDatabase")
const db = new JSONDatabase('./samples/users.json');

module.exports = function (app) {
    app.get('/login/:username', (req, res) => {
        const username = req.params.username
        const data = db.getAllMatchingNames([username])[0];

        if (data) {
            res.json(data)
        }
    })
}
