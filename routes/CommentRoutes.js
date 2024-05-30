const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
// const authMiddleware = require('../middleware/authMiddleware'); // Ensure you have this middleware to authenticate users

// Route to create a comment
router.post('/',commentController.createComment);

// Route to delete a comment by ID
router.delete('/:id',commentController.deleteComment);
// Route to get all comments
router.get('/',commentController.getAllComments);

module.exports = router;
