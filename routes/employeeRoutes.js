const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/employees/search', employeeController.searchEmployees);

router.post('/employees', employeeController.createEmployee);
router.get('/employees', employeeController.getEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);
router.get('/employees/:id/salary', employeeController.getMonthlySalary);

module.exports = router;