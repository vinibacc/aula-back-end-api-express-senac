const Collection = require('../lib/collection');

class User extends Collection {
  constructor() {
    super('users');
  }
}

module.exports = new User();