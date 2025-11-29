const Project = require('../models/projectModel');

class ProjectService {
    async createProject(data) {
        return await Project.create(data);
    }

    async getProjects(query = {}) {
        return await Project.find(query);
    }

    async getProjectById(id) {
        return await Project.findById(id);
    }

    async updateProject(id, data) {
        return await Project.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteProject(id) {
        return await Project.findByIdAndDelete(id);
    }

    async searchProjects(searchTerm) {
        return await Project.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { projectId: { $regex: searchTerm, $options: 'i' } }
            ]
        });
    }

    async getProjectsByStatus(status) {
        return await Project.find({ status });
    }

    async getMemberStats() {
        return await Project.aggregate([
            { $project: { name: 1, memberCount: { $size: '$members' } } },
            { $sort: { memberCount: -1 } }
        ]);
    }
}

module.exports = new ProjectService();