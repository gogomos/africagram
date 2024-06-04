const express = require('express');
const postController = require('../controllers/PostController');
const { authMiddleware }  = require('../Middleware/authentication');
const upload = require('../config/multer');
const { checkUploadLimitMiddleware } = require('../Middleware/checkUploadLimit');

const router = express.Router();
 // after merge i need to add the authentication
router.get('/',authMiddleware,postController.getMyPosts);
router.get('/:id',authMiddleware,postController.getById);
router.post('/',authMiddleware,checkUploadLimitMiddleware , upload, postController.createPost);
router.put('/:id',authMiddleware,upload,  postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
