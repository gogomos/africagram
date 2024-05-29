const express = require('express');
const followerController = require('../controllers/FollowerController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Route to follow a user
router.post('/follow', authenticate, followerController.followUser);
// Route to unfollow a user
router.post('/unfollow', authenticate, followerController.unfollowUser);

module.exports = router;
