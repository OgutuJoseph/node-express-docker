const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const protect = require('../middleware/authMidlleware');

router
    .route('/')
    .get(protect, postController.getAllPosts)
    .post(protect, postController.createPost);

router
    .route('/:id')
    .get(protect, postController.getPost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

module.exports = router;
