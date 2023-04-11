const fs = require('fs');
const JSONDatabase = require('./JSONDatabase');

module.exports = function(app, db){
    app.get('/search', (req, res) => {
        console.log('Search Request Recieved')
        const query = req.query.q;
        if (query) {
            const results = db.getAllMatchingNames(query);
            res.json(results);
        } else {
            const allRecords = db.getAll();
            res.json(allRecords);
        }
      });
}


