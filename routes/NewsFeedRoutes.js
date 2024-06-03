const express = require('express');
const router = express.Router();
const newsFeedController = require('../controllers/NewsFeedController');

router.get('/', newsFeedController.getNewsFeed);

module.exports = router;