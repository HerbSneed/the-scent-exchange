const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUserById);

module.exports = router;