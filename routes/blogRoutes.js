const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/upload');

router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', upload.single('anh'), blogController.createBlog);
router.put('/blogs/:id', upload.single('anh'), blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;