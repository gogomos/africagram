const express = require('express');
const postController = require('../controllers/PostController');
// const authenticate = require('../middleware/authenticate');

const router = express.Router();
 // after merge i need to add the authentication
router.get('/',postController.getMyPosts);
router.get('/:id',postController.getById);
router.post('/',postController.createPost);
router.put('/:id',postController.updatePost);
router.delete('/:id',postController.deletePost);

module.exports = router;
