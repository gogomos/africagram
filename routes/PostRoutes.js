const express = require('express');
const postController = require('../controllers/PostController');
const { authMiddleware }  = require('../Middleware/authentication');


const router = express.Router();
 // after merge i need to add the authentication
router.get('/',authMiddleware,postController.getMyPosts);
router.get('/:id',authMiddleware,postController.getById);
router.post('/',authMiddleware,postController.createPost);
router.put('/:id',authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
