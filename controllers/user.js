const User = require('../models/user');

class UserController {

  async listUsers(req, res) {
    const users = await User.find({});
    return res.send(users);
  }



}

module.exports = new UserController();
