module.exports = function(app){
    app.get('/search', (req, res) => {
        const query = req.query.q;
        if (query) {
            const results = db.getAllMatching(query);
            res.json(results);
        } else {
            const allRecords = db.getAll();
            res.json(allRecords);
        }
    });
}