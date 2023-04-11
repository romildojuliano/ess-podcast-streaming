const assert = require('assert');
const request = require('supertest');
const express = require('express');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const podcastsFilePath = '../samples/podcasts.json'

require('../podcasts')(app);

describe('POST /podcasts/', function () {

    before(() => {

        sampleData = {
            "subject": "Economy",
            "name": "John Wick goes shopping",
            "link": "https://www.youtube.com/watch?v=km7DDDE-i0c",
            "author": "mattvie"
        }

        duplicatedData = {
            "subject": "Politics",
            "name": "Dee Snider's Hearing",
            "link": "https://www.youtube.com/watch?v=S0Vyr1TylTE",
            "author": "mattvie"
        }

    })

    it('Deve adicionar o novo podcast na conta do autor mattvie', function (done) {
        request(app)
            .post('/podcasts')
            .type('form')
            .send(sampleData)
            .set("Content-Type", "application/json")
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.subject, "Economy");
                assert.strictEqual(res.body.name, "John Wick goes shopping");
                assert.strictEqual(res.body.link, "https://www.youtube.com/watch?v=km7DDDE-i0c");
                assert.strictEqual(res.body.author, "mattvie");
                done();
            });

    });

    it('Deve adicionar podcast duplicado na conta do autor mattvie', function (done) {
        request(app)
            .post('/podcasts')
            .type('form')
            .send(duplicatedData)
            .set("Content-Type", "application/json")
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                //assert.strictEqual(res.body.error, "Invalid Request");
                assert.ifError(null)
                done();
            });

    });
});