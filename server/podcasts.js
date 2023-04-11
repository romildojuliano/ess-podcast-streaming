var fs = require('fs');

module.exports = function (app) {

    app.post('/podcasts', (req, res) => {
        var data = JSON.parse(fs.readFileSync('./samples/podcasts.json', 'utf8'))
        if (req.body.subject == "") {
            res.status(400).send('Invalid Request (Subject Missing)').end();
        } else if (req.body.name == "") {
            res.status(400).send('Invalid Request (Name Missing)').end();
        } else if (req.body.link == "") {
            res.status(400).send('Invalid Request (Link Missing)').end();
        } else if (req.body.author == "") {
            res.status(400).send('Invalid Request (Author Missing)').end();
        } else if (data.filter(x => x.name == req.body.name).length > 0) {
            res.status(400).send('Invalid Request (Duplicated Podcast)').end();
        } else {

            // extracting the thumbnail if it is a youtube link

            //var link = "https://www.youtube.com/watch?v=3Hp-yUDSF8g";
            var url_piece, image_piece;
            if (req.body.link.length == 43) {
                url_piece = req.body.link.slice(0, 23)
                image_piece = req.body.link.slice(32)

                if (url_piece == "https://www.youtube.com") {
                    image_piece = "https://img.youtube.com/vi/" + image_piece + "/sddefault.jpg";
                } else {
                    // coincidentally the link has 43 characters, but it is NOT a YouTube link
                    image_piece = "default.png"
                }
            } else {
                // worst case scenario, length!=43 (not YouTube link)
                image_piece = "default.png"
            }

            var newPodcast = {
                "subject": req.body.subject,
                "name": req.body.name,
                "link": req.body.link,
                "author": req.body.author,
                "created_at": new Date().toISOString(),
                "image": image_piece
            }

            data.push(newPodcast)
            fs.writeFileSync('./samples/podcasts.json', JSON.stringify(data, false, "\t"))
            res.send(newPodcast)
        }
    })

    app.get('/podcasts/politics', (req, res) => {
        let rawdata = fs.readFileSync('./samples/podcasts.json', 'utf-8');
        let podcasts = JSON.parse(rawdata)
        let podpolitics = podcasts.filter(x => x.subject == "Politics")
        res.send(podpolitics)
    })

    app.get('/podcasts/economy', (req, res) => {
        var rawdata = fs.readFileSync('./samples/podcasts.json', 'utf-8');
        var podcasts = JSON.parse(rawdata)
        var podeconomy = podcasts.filter(x => x.subject == "Economy")
        res.send(podeconomy)
    })

    app.get('/podcasts/politics2', (req, res) => {
        let rawdata = fs.readFileSync('./samples/podcasts2.json', 'utf-8');
        let podcasts = JSON.parse(rawdata)
        let podpolitics = podcasts.filter(x => x.subject == "Politics")
        res.send(podpolitics)
    })

}

