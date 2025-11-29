const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/students/search', studentController.searchStudents);
router.get('/students/stats', studentController.getGpaStats);

router.post('/students', studentController.createStudent);
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;