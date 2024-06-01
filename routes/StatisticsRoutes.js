const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/StatisticsController');

router.get('/user-count', statisticController.getUserCount);

router.get('/users-count-by-country', statisticController.getUsersCountByCountry);

router.get('/average-posts-per-user', statisticController.getAveragePostsPerUser);

router.get('/gender-distribution', statisticController.getGenderDistribution);

module.exports = router;

