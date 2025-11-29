const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects/search', projectController.searchProjects);
router.get('/projects/report', projectController.getProjectsByStatus);
router.get('/projects/stats', projectController.getMemberStats);

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getProjects);
router.get('/projects/:id', projectController.getProjectById);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;