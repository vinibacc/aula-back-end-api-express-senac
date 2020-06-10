const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user');

router.get('/', UserController.listUsers);
router.get("/:id", UserController.find);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);


module.exports = router;