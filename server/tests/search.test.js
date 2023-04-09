const assert = require('assert');
const request = require('supertest');
const express = require('express');
const fs = require('fs')
const app = express();
const JSONDatabase = require('../JSONDatabase');
const usersFilePath = './test.json';
const db = new JSONDatabase(usersFilePath);

require('../search')(app, db);

describe('GET /search', () => {
  before(() => {
    // Create a sample data file before running the tests
    const sampleData = {
      '1': { username: 'lmm3', name: 'Lucas', email: 'lmm3@cin.ufpe.br' },
      '2': { username: 'ramonwanderley', name: 'Ramon', email: 'rjvw@cin.ufpe.br' },
      '3': { username: 'mattvie', name: 'Matheus', email: 'mvmf@cin.ufpe.br' },
    };
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData));
  });

  after(() => {
    // Delete the sample data file after running the tests
    fs.unlinkSync(usersFilePath);
  });

  it('Deve retornar todos os valores do banco', (done) => {
    request(app)
      .get('/search')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 3);
        done();
      });
  });

  it('Deve retornar apenas usuários que contenham a letra a', (done) => {
    request(app)
      .get('/search?q=a')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 2);
        assert.strictEqual(res.body[0].username, 'ramonwanderley');
        assert.strictEqual(res.body[1].username, 'mattvie');
        done();
      });
  });

  it('Deve retornar uma lista vazia para o usuário romildo', (done) => {
    request(app)
      .get('/search?q=romildo')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 0);
        done();
      });
  });
});
