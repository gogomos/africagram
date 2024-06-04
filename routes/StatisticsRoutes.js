const express = require('express');
const router = express.Router();
const { getUserCount,getUsersCountByCountry,getAveragePostsPerUser,getGenderDistribution } = require('../controllers/StatisticsController');

router.get('/user-count', getUserCount);

router.get('/users-count-by-country', getUsersCountByCountry);

router.get('/average-posts-per-user', getAveragePostsPerUser);

router.get('/gender-distribution', getGenderDistribution);

module.exports = router;
