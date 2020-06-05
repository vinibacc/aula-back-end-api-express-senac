const Database = require('./lib/database');

async function createUserRoute(req, res) {
  const { insertedId } = await Database.db.collection('users').insertOne(req.body);
  res.send({ insertedId });
} 

function validateUserMiddleware (req, res, next) {
  const { name, email, password, avatar, roles } = req.body;
 
  if(name.length < 5) {
    return res.status(400).send({ message: 'Name should length greater than 5' });
  }

  if(!Array.isArray(roles)) {
    return res.status(400).send({ message: 'Roles should be an array' });
  }

  req.body = { name, email, password, avatar, roles };

  return next();
}

function validateListUserMiddleware(req, res, next) {
  const { limit=10, skip=0, orderBy='name', order=1 } = req.query;

  console.log(limit);

  if(Number.isNaN(limit) || Number.isNaN(skip)) {
    res.status(400);
    throw Error('Limit and Skip should be a number');
  }
  
  if(limit < 1 || skip < 0) {
    res.status(400);
    throw new Error('Limit should be greater than 0 and Skip should be at least 0' );
  }

  req.query.limit = Number(limit);
  req.query.skip = Number(skip);
  req.query.order = Number(order);
  req.query.orderBy = orderBy;

  return next();
}

async function listUserRoute(req, res) {
  const { limit, skip, orderBy, order } = req.query;
  const sort = {};
  sort[orderBy] = order;

  const users = await Database.db.collection('users').find({})
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .toArray();
  
  res.send(users);
}

async function userDetailsRoute(req, res) {
  const { id } = req.params;
  const user = await Database.db.collection('users').findOne({ _id: id })

  if(!user) {
    return res.status(404).send();
  }

  res.send(user);
}

async function updateUserRoute(req, res) {
  const { id } = req.params;
  await Database.db.collection('users').updateOne({ _id: id }, { $set: req.body });
  const user = await Database.db.collection('users').findOne({ _id: id });

  if(!user) {
    res.status(404).send();
  }

  res.send(user);
}

async function userDeleteRoute(req, res) {
  const { id } = req.params;
  const response = await Database.db.collection('users').deleteOne({ _id: id });
  console.log(response);
  res.send({});
}

module.exports = {
  createUserRoute,
  validateUserMiddleware,
  listUserRoute,
  validateListUserMiddleware,
  userDetailsRoute,
  updateUserRoute,
  userDeleteRoute
}

