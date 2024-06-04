const express = require('express');
const router = express.Router();

const {updateUser, deleteUser} = require('../controllers/UserController');
const { authMiddleware }  = require('../Middleware/authentication');

router.put('/update-user/:id',authMiddleware, updateUser);
router.delete('/delete-user/:id',authMiddleware, deleteUser);

module.exports = router;