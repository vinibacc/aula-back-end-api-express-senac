const { ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./lib/database');
const routes = require('./routes');
const { 
  createUserRoute, 
  validateUserMiddleware,
  listUserRoute,
  validateListUserMiddleware,
  userDetailsRoute,
  updateUserRoute,
  userDeleteRoute
} = require('./user');
const server = express();
Database.init();

server.use(bodyParser.json());

// server.param('id', (req, res, next, id) => {
//   req.params.id = ObjectId(id);
//   next();
// });

// server.post('/users', validateUserMiddleware, createUserRoute);
// server.post('/users/:id', validateUserMiddleware, updateUserRoute);
// server.get('/users', validateListUserMiddleware, listUserRoute);
// server.get('/users/:id', userDetailsRoute);
// server.delete('/users/:id', userDeleteRoute);

server.use(routes);

server.use((err, req, res, next) => {
  res.send({ message: err.message } );
})

server.listen(3000, () => {
  console.log('We are alive!');
});

