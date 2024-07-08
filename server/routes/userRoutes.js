// const express = require('express');
// const UserController = require('../controllers/UserController');
// const router = express.Router();

// router.post('/register', UserController.register);
// router.post('/login', UserController.login);
// router.get('/:id', UserController.getUser);

// module.exports = router;// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUserById);

module.exports = router;