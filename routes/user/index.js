const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user');

router.get('/', UserController.listUsers);
// router.delete('/', );
// router.post('/', );


module.exports = router;