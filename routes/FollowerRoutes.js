const express = require('express');
const followerController = require('../controllers/FollowerController');
const { authMiddleware }  = require('../Middleware/authentication');
// const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Route to follow a user
router.post('/follow', authMiddleware, followerController.followUser);
// Route to unfollow a user
router.post('/unfollow', authMiddleware, followerController.unfollowUser);

module.exports = router;
