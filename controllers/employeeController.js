const employeeService = require('../services/employeeService');

const createEmployee = async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await employeeService.deleteEmployee(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchEmployees = async (req, res) => {
    try {
        const employees = await employeeService.searchEmployees(req.query.search);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMonthlySalary = async (req, res) => {
    try {
        const salary = await employeeService.getMonthlySalary(req.params.id);
        if (salary === null) return res.status(404).json({ error: 'Employee not found' });
        res.json({ monthlySalary: salary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    getMonthlySalary
};