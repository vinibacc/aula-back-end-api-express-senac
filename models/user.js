const Collection = require('../lib/collection');

class User extends Collection {
    constructor() {
        super('users');
    }

    find() {
        return this.collection.find({}).toArray();
    }

    findOne(id) {
        return this.collection.find({ _id: ObjectId(id) }).toArray();
    }

    insert(user) {
        return this.collection.insertOne(user);
    }

    update(id, body) {
        return this.collection.updateOne({ _id: ObjectId(id) }, { $set: body });
    }

    delete(id) {
        return this.collection.deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = new User();