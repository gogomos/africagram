const express = require('express');
const router = express.Router();

const likesController = require('../controllers/LikesController');
const { authMiddleware }  = require('../Middleware/authentication');

router.post('/like', authMiddleware, likesController.likePost);
router.post('/unlike', authMiddleware, likesController.unlikePost);

module.exports = router;