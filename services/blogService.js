const Blog = require('../models/Blog');

class BlogService {
    async getAllBlogs(filter = {}, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const blogs = await Blog.find(filter).skip(skip).limit(limit);
        const total = await Blog.countDocuments(filter);
        return { data: blogs, total, page, limit };
    }

    async getBlogById(id) {
        return await Blog.findById(id);
    }

    async createBlog(data, anh) {
        const blog = new Blog({ ...data, anh });
        return await blog.save();
    }

    async updateBlog(id, data, anh) {
        return await Blog.findByIdAndUpdate(id, { ...data, anh }, { new: true });
    }

    async deleteBlog(id) {
        return await Blog.findByIdAndDelete(id);
    }
}

module.exports = new BlogService();