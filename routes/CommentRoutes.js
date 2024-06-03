const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');
const { authMiddleware }  = require('../Middleware/authentication'); // Ensure you have this middleware to authenticate users

// Route to create a comment
router.post('/', authMiddleware, commentController.createComment);

// Route to delete a comment by ID
router.delete('/:id',authMiddleware, commentController.deleteComment);
// Route to get all comments
router.get('/',authMiddleware, commentController.getAllComments);

module.exports = router;
