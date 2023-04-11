const assert = require('assert');
const request = require('supertest');
const express = require('express');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const favoritesFilePath = './samples/favorites.json';

require('../routes/favorites')(app);

describe('GET /favorites', () => {
  before(() => {
    // Create a sample data file before running the tests
    const sampleData = {
      "ramonwanderley": [
        { "username": "ramonwanderley", "podcast": "GIT e GITHUB", "created_at": "2023-04-09T19:49:35.755Z" },
        { "username": "ramonwanderley", "podcast": "World Economic Crisis", "created_at": "2023-04-09T19:50:32.701Z" }
      ],
      "mattvie": [
        { "username": "mattvie", "podcast": "FED", "created_at": "2023-04-07T16:02:47.137Z" },
        { "username": "mattvie", "podcast": "US Debt", "created_at": "2023-04-07T17:21:56.600Z" }
      ]
    }; 

    fs.writeFileSync(favoritesFilePath, JSON.stringify(sampleData));

  });

  after(() => {
    // Delete the sample data file after running the tests
    fs.unlinkSync(favoritesFilePath);
  });

  it('Deve retornar os favoritos do usuário ramonwanderley', (done) => {
    request(app)
      .get(`/favorites/ramonwanderley`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 2);
        done();
      });
  });

  it('Deve retornar array vázio do usuário inexistente com username java', (done) => {
    request(app)
      .get(`/favorites/java`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 0);
        done();
      });
  });
});

describe('POST /favorite', () => {
  before(() => {
    // Create a sample data file before running the tests
    const sampleData = {
      "ramonwanderley": [
        { "username": "ramonwanderley", "podcast": "GIT e GITHUB", "created_at": "2023-04-09T19:49:35.755Z" },
        { "username": "ramonwanderley", "podcast": "World Economic Crisis", "created_at": "2023-04-09T19:50:32.701Z" }
      ],
      "mattvie": [
        { "username": "mattvie", "podcast": "FED", "created_at": "2023-04-07T16:02:47.137Z" },
        { "username": "mattvie", "podcast": "US Debt", "created_at": "2023-04-07T17:21:56.600Z" }
      ]
    }; 

    fs.writeFileSync(favoritesFilePath, JSON.stringify(sampleData));

  });

  after(() => {
    // Delete the sample data file after running the tests
    fs.unlinkSync(favoritesFilePath);
  });

  it('Deve favoritar o podcast Brexit no usuário ramonwanderley', (done) => {
    request(app)
      .post('/favorite/ramonwanderley')
      .type('form')
      .send({podcast: "Brexit"})
      .set("Content-Type", "application/json")
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, "Favorite with success");
        done();
      });
  });

  it('Deve desfavoritar o podcast FED no usuário mattvie', (done) => {
    request(app)
      .post('/favorite/mattvie')
      .type('form')
      .send({podcast: "FED"})
      .set("Content-Type", "application/json")
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, "Disfavor with success");
        done();
      });
  });
  it('Deve retornar error Invalid Podcast sem nome do podcast fornecido', (done) => {
    request(app)
      .post('/favorite/mattvie')
      .type('form')
      .send({})
      .set("Content-Type", "application/json")
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.error, "Invalid Podcast");
        done();
      });
  });
});

