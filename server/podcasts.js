var fs = require('fs');

module.exports = function (app) {

    app.post('/podcasts', (req, res) => {
        if (req.body.subject == null) {
            res.status(400).send('Invalid Request (Subject Missing').end();
        } else if (req.body.name == null) {
            res.status(400).send('Invalid Request (Name Missing').end();
        } else if (req.body.link == null) {
            res.status(400).send('Invalid Request (Link Missing').end();
        } else if (req.body.author == null) {
            res.status(400).send('Invalid Request (Author Missing').end();
        } else {

            var data = JSON.parse(fs.readFileSync('./samples/podcasts.json', 'utf8'))

            var link = req.body.link;
            //var link = "https://www.youtube.com/watch?v=3Hp-yUDSF8g";

            var link_url, image_code;

            if (link.length == 43) {
                link_url = link.slice(0, 23)
                image_code = link.slice(32)

                if (link_url == "https://www.youtube.com") {
                    //console.log(link_url)

                    image_code = "https://img.youtube.com/vi/" + image_code + "/sddefault.jpg";

                    //console.log(image_code)
                } else {
                    image_code = "default.png"
                }

            } else {
                image_code = "default.png"
            }

            var newPodcast = {
                "subject": req.body.subject,
                "name": req.body.name,
                "link": req.body.link,
                "author": req.body.author,
                "createdAt": new Date().toISOString(),
                "image": image_code
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

}

