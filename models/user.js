const Collection = require('../lib/collection');

class User extends Collection {
  constructor() {
    super('users');
  }

  find() {
    return this.collection.find({}).toArray();
  }
}

module.exports = new User();