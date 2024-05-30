const express = require('express');
const router = express.Router();

const profileController = require('../controllers/ProfileController');

// router.get('/', profileController.getProfile);
router.get('/:id', profileController.getProfileByID);
router.post('/', profileController.createProfile);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;