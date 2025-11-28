const blogService = require('../services/blogService');
const upload = require('../middleware/upload');

class BlogController {
    async getAllBlogs(req, res) {
        try {
            const { q, page = 1, limit = 10 } = req.query;
            const filter = q ? { $or: [{ tieuDe: { $regex: q, $options: 'i' } }, { tacGia: { $regex: q, $options: 'i' } }] } : {};
            const result = await blogService.getAllBlogs(filter, page, limit);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getBlogById(req, res) {
        try {
            const blog = await blogService.getBlogById(req.params.id);
            if (!blog) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
            res.json(blog);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createBlog(req, res) {
        try {
            const { tieuDe, noiDung, tacGia } = req.body;
            const anh = req.file ? req.file.path : '';
            const blog = await blogService.createBlog({ tieuDe, noiDung, tacGia }, anh);
            res.status(201).json(blog);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateBlog(req, res) {
        try {
            const { tieuDe, noiDung, tacGia } = req.body;
            const anh = req.file ? req.file.path : req.body.anh;
            const blog = await blogService.updateBlog(req.params.id, { tieuDe, noiDung, tacGia }, anh);
            if (!blog) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
            res.json(blog);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteBlog(req, res) {
        try {
            const deleted = await blogService.deleteBlog(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
            res.json({ message: 'Đã xóa bài viết thành công!' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new BlogController();