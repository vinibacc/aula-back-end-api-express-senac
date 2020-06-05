const { MongoClient } = require('mongodb');

class Database {
  async init() {
    const client = await MongoClient.connect('mongodb://localhost');
    this.db = client.db('super-news');
  }
}

module.exports = new Database();
