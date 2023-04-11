const assert = require('assert');
const request = require('supertest');
const express = require('express');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const podcastsFilePath = './podcasts.json'

require('./podcasts')(app);

describe('GET /podcasts/politics', function() {
  

it('Deve retornar os podcasts cadastrados com a tag Politica no formato JSON', function(done) {

  request(app)
  .get('/podcasts/politics')
  .expect(200)
  .end((err,res) =>{
    var key, count = 0;
    for (key in res.body){
      count++;
    }

    if  (err) return done(err);
    assert.strictEqual(count,5);
    done();
  });

});
});

describe('GET /podcasts/politics2', function() {
  

  it('Deve retornar os podcasts cadastrados com a tag Politica no formato JSON', function(done) {
  
  
    request(app)
    .get('/podcasts/politics2')
    .expect(200)
    .end((err,res) =>{
      var key, count = 0;
      for (key in res.body){
        count++;
      }
  
      if  (err) return done(err);
      assert.strictEqual(count,6);
      done();
    });
  
  });
  });
  
describe('GET /podcasts/economy', function() {
  

  it('Deve retornar os podcasts cadastrados com a tag Politica no formato JSON', function(done) {
    
    request(app)
    .get('/podcasts/economy')
    .expect(200)
    .end((err,res) =>{
      var key, count = 0;
      for (key in res.body){
        count++;
      }
  
      if  (err) return done(err);
      assert.strictEqual(count,5);
      done();
    });
  
  });
  });
