const User = require('../models/user');

class UserController {

  async listUsers(req, res) {
    const user = await User.collection.findOne({});
    return res.send(user);
  }



}

module.exports = new UserController();
