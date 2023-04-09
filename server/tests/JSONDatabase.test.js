const assert = require('assert');
const fs = require('fs');
const JSONDatabase = require('../JSONDatabase');

const DB_FILE = 'test.json';

describe('JSONDatabase', () => {
  beforeEach(() => {
    // Create a new, empty test database before each test
    fs.writeFileSync(DB_FILE, JSON.stringify({}));
  });

  afterEach(() => {
    // Delete the test database file after each test
    fs.unlinkSync(DB_FILE);
  });

  describe('#readData()', () => {
    it('should return an empty object when the file is empty', () => {
      const db = new JSONDatabase(DB_FILE);
      const data = db.readData();
      assert.deepStrictEqual(data, {});
    });

    it('should return null when the file does not exist', () => {
      const db = new JSONDatabase('nonexistent.json');
      const data = db.readData();
      assert.strictEqual(data, null);
    });

    it('should return an object when the file contains valid JSON data', () => {
      const db = new JSONDatabase(DB_FILE);
      fs.writeFileSync(DB_FILE, JSON.stringify({test: 'data'}));
      const data = db.readData();
      assert.deepStrictEqual(data, {test: 'data'});
    });

  });

  describe('#writeData(data)', () => {
    it('should write the given data to the file', () => {
      const db = new JSONDatabase(DB_FILE);
      db.writeData({test: 'data'});
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      assert.strictEqual(fileData, JSON.stringify({test: 'data'}, null, 2));
    });
  });

  describe('#getAll()', () => {
    it('should return an empty array when there is no data in the database', () => {
      const db = new JSONDatabase(DB_FILE);
      const data = db.getAll();
      assert.deepStrictEqual(data, []);
    });

    it('should return an array of all objects in the database', () => {
      const db = new JSONDatabase(DB_FILE);
      db.writeData({a: {name: 'Lucas'}, b: {name: 'Ramon'}});
      const data = db.getAll();
      assert.deepStrictEqual(data, [{name: 'Lucas'}, {name: 'Ramon'}]);
    });
  });

  describe('#getAllMatchingNames(pattern)', () => {
    it('should return an empty array when there is no data in the database', () => {
      const db = new JSONDatabase(DB_FILE);
      const data = db.getAllMatchingNames('foo');
      assert.deepStrictEqual(data, []);
    });

    it('should return an array of objects with a matching name', () => {
      const db = new JSONDatabase(DB_FILE);
      db.writeData({a: {username: 'Lucas123'}, b: {username: 'Ramon456'}});
      const data = db.getAllMatchingNames('Lucas');
      assert.deepStrictEqual(data, [{username: 'Lucas123'}]);
    });

    it('should not return objects with a non-matching name', () => {
        const db = new JSONDatabase(DB_FILE);
        db.writeData({a: {username: 'Lucas123'}, b: {username: 'Ramon456'}});
        const data = db.getAllMatchingNames('Matheus789');
        assert.deepStrictEqual(data, []);
      });
  
    });
  });