const assert = require('assert');
const request = require('supertest');
const express = require('express');
const fs = require('fs')
const app = express();
const JSONDatabase = require('../JSONDatabase');
const usersFilePath = './test.json';
const db = new JSONDatabase(usersFilePath);

require('../routes/search')(app)

describe('GET /search', () => {
  before(() => {
    // Create a sample data file before running the tests
    const sampleData = [
      {
        "email": "rjvw@cin.ufpe.br",
        "username": "ramonwanderley",
        "password": "4f252ec9d503d1d2e574f607cb9e3092ba5ee713d3b21e8bc5a96178d4b508f2",
        "created_at": "2020-01-23T01:23:45.678-03:00",
        "followers": [],
        "following": [],
        "history": []
      },
      {
        "email": "rjal@cin.ufpe.br",
        "username": "romildojuliano",
        "password": "827f993c7f552c119c09f37de820eac9dde5dd682c462a06a879d65f59f9bbe7",
        "created_at": "2021-04-25T01:23:45.678-03:00",
        "followers": [],
        "following": []
      },
      {
        "email": "mvmf@cin.ufpe.br",
        "username": "mattvie",
        "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
        "created_at": "2021-05-05T01:23:45.678-03:00",
        "followers": [
          "joaovictorbelo"
        ],
        "following": [],
        "history": []
      },
      {
        "email": "lmm3@cin.ufpe.br",
        "username": "lmm3",
        "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
        "created_at": "2022-12-05T01:23:45.678-03:00",
        "followers": [
          "joaovictorbelo"
        ],
        "following": [],
        "history": []
      },
      {
        "email": "lmm4@cin.ufpe.br",
        "username": "lmm4",
        "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
        "created_at": "2022-12-05T01:23:45.678-03:00",
        "followers": [
          "joaovictorbelo"
        ],
        "following": [],
        "history": []
      },
      {
        "email": "jvblb@cin.ufpe.br",
        "username": "joaovictorbelo",
        "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
        "created_at": "2021-11-05T01:23:45.678-03:00",
        "followers": [],
        "following": [
          "lmm3",
          "mattvie"
        ],
        "history": []
      },
      {
        "email": "hac@cin.ufpe.br",
        "username": "HACardoso",
        "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
        "created_at": "2023-01-08T01:23:45.678-03:00",
        "followers": [],
        "following": [],
        "history": []
      },
      {
        "email": "ellc@cin.ufpe.br",
        "username": "LuanCavalcanti07",
        "password": "7e0188877d3164be217ed904382cd42d85858eafca52c8c4f0a35976c2d28e5d",
        "created_at": "2023-01-08T23:23:45.678-03:00",
        "followers": [],
        "following": [],
        "history": []
      }
    ];
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData));
  });


  it('Deve retornar todos os valores do banco', (done) => {
    request(app)
      .get('/search')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 8);
        done();
      });
  });

  it('Deve retornar apenas usuários que contenham palava lmm', (done) => {
    request(app)
      .get('/search?q=lmm')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 2);
        assert.strictEqual(res.body[0].username, 'lmm3');
        assert.strictEqual(res.body[1].username, 'lmm4');
        done();
      });
  });

  it('Deve retornar uma lista vazia para o usuário jacob', (done) => {
    request(app)
      .get('/search?q=jacob')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 0);
        done();
      });
  });
});
