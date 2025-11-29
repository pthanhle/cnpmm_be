const projectService = require('../services/projectService');

const createProject = async (req, res) => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await projectService.updateProject(req.params.id, req.body);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await projectService.deleteProject(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchProjects = async (req, res) => {
    try {
        const projects = await projectService.searchProjects(req.query.search);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProjectsByStatus = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByStatus(req.query.status);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMemberStats = async (req, res) => {
    try {
        const stats = await projectService.getMemberStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    searchProjects,
    getProjectsByStatus,
    getMemberStats
};