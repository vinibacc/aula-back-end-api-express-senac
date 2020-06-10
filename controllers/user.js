const User = require('../models/user');

class UserController {

    async listUsers(req, res) {
        const users = await User.find({});
        return res.send(users);
    }

    async create(req, res) {
        const { insertedId } = await User.insert(req.body);
        res.send({ insertedId });
    }

    async find(req, res) {
        const { id } = req.params;
        const user = await User.findOne(id);
        res.send(user);
    }

    async update(req, res) {
        const { id } = req.params;
        await User.updateOne(id, req.body);
        const user = await User.find(id);

        res.send(user);
    }

    async delete(req, res) {
        const { id } = req.params;
        await User.delete(id);
        res.send({});
    }



}

module.exports = new UserController();