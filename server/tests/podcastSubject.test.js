const assert = require('assert');
const request = require('supertest');
const express = require('express');
const fs = require('fs')
const app = express();
const JSONDatabase = require('../JSONDatabase');
const usersFilePath = './test.json';
const db = new JSONDatabase(usersFilePath);

require('./podcasts')(app);

describe('GET /podcasts', () => {
  before(() => {
    // Create a sample data file before running the tests
    const sampleData = {
      '1': { subject: 'Politics', name: 'World Economic Crisis', author: 'ramonwanderley' },
      '2': { subject: 'Politics', name: 'Brexit', author: 'romildojuliano' },
      '3': { subject: 'Economy', name: 'US Debt', author: 'lmm3' },
    };
    fs.writeFileSync(usersFilePath, JSON.stringify(sampleData));
  });

  after(() => {
    // Delete the sample data file after running the tests
    fs.unlinkSync(usersFilePath);
  });

  it('Deve retornar todos os valores do banco', (done) => {
    request(app)
      .get('/podcasts')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 3);
        done();
      });
  });

  it('Deve retornar apenas usuários que contenham a letra a', (done) => {
    request(app)
      .get('/podcasts?q=a')
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
      .get('/podcasts?q=romildo')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 0);
        done();
      });
  });
});
