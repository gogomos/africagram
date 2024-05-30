const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/:id', userController.getUserById);

router.delete('/:id', userController.deleteUser);

router.get('/', userController.getAllUsers);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;
