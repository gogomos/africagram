const express = require('express');
const router = express.Router();

const likesController = require('../controllers/LikesController');

router.post('/like', likesController.likePost);
router.post('/unlike', likesController.unlikePost);

module.exports = router;