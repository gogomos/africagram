const express = require('express');
const router = express.Router();

const profileController = require('../controllers/ProfileController');
const { authMiddleware }  = require('../Middleware/authentication');

// router.get('/', profileController.getProfile);
router.get('/:id',authMiddleware, profileController.getProfileByID);
router.post('/',authMiddleware, profileController.createProfile);
router.put('/:id',authMiddleware, profileController.updateProfile);
router.delete('/:id',authMiddleware, profileController.deleteProfile);

module.exports = router;