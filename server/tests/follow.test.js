const assert = require('assert');
const request = require('supertest');
const express = require('express');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersFilePath = './samples/users.json';

require('../routes/follow.routes')(app);
const sampleData = [
  {
    "email": "rjvw@cin.ufpe.br",
    "username": "ramonwanderley",
    "password": "4f252ec9d503d1d2e574f607cb9e3092ba5ee713d3b21e8bc5a96178d4b508f2",
    "created_at": "2020-01-23T01:23:45.678-03:00",
    "followers": [],
    "following": [
      "lmm3"
    ],
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
      "ramonwanderley",
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

describe('GET /users/:username/following', () => {
  before(() => {
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData, null, 2));

  });

  after(() => {
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData, null, 2));
  });

  it('Deve retornar os usuarios seguidos do usuário joaovictorbelo', (done) => {
    request(app)
      .get(`/users/joaovictorbelo/following`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.data.length, 2);
        done();
      });
  });

  it('Deve retornar um erro de que não existe usuario pedro', (done) => {
    request(app)
      .get(`/users/pedro/following`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'usuario não encontrado');
        done();
      });
  });
});

describe('POST /users/:username/following?user_to_follow=', () => {
  before(() => {
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData, null, 2));

  });

  after(() => {
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData, null, 2));
  });

  it('Deve salvar que o usuario joaovictorbelo segue HACardoso', (done) => {
    request(app)
      .post(`/users/joaovictorbelo/following?user_to_follow=HACardoso`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.data.length, 3);
        done();
      });
  });

  it('Deve retornar um erro de que voce deve estar logado para seguir alguem', (done) => {
    request(app)
      .post(`/users/undefined/following?user_to_follow=HACardoso`)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'voce deve estar logado para seguir um usuario');
        done();
      });
  });

  it('não deve permitir que voce siga sua propria conta', (done) => {
    request(app)
      .post(`/users/joaovictorbelo/following?user_to_follow=joaovictorbelo`)
      .expect(406)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'voce não pode seguir sua propria conta');
        done();
      });
  });
});

describe('DELETE /users/:username/following?user_to_unfollow=', () => {
  before(() => {
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData, null, 2));

  });

  after(() => {
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData, null, 2));
  });

  it('Deve salvar que o usuario joaovictorbelo nao segue mais lmm3', (done) => {
    request(app)
      .delete(`/users/joaovictorbelo/following?user_to_unfollow=lmm3`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.data.length, 1);
        done();
      });
  });

  it('Deve retornar um erro voce já não segue o usuario HACardoso', (done) => {
    request(app)
      .delete(`/users/joaovictorbelo/following?user_to_unfollow=HACardoso`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.message, 'você não segue esse usuario');
        done();
      });
  });
});

