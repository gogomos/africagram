const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/StatisticsController');

router.get('/user-count', statisticController.getUserCount);

router.get('/post-count/:id', statisticController.getPostCountByUser);

module.exports = router;
