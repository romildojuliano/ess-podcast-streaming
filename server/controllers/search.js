const fs = require('fs');
const JSONDatabase = require('../JSONDatabase');

const db = new JSONDatabase('./samples/users.json');

exports.searchUser =  (req, res) => {
    console.log('Search Request Recieved')
    const query = req.query.q;
    if (query) {
        const results = db.getAllMatchingNames(query);
        res.json(results);
    } else {
        const allRecords = db.getAll();
        res.json(allRecords);
    }
};


// module.exports = function(app){
//     app.get('/search', (req, res) => {
//         console.log('Search Request Recieved')
//         const query = req.query.q;
//         if (query) {
//             const results = db.getAllMatchingNames(query);
//             res.json(results);
//         } else {
//             const allRecords = db.getAll();
//             res.json(allRecords);
//         }
//       });
// }


