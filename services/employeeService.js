const Employee = require('../models/employeeModel');

class EmployeeService {
    async createEmployee(data) {
        return await Employee.create(data);
    }

    async getEmployees() {
        return await Employee.find();
    }

    async getEmployeeById(id) {
        return await Employee.findById(id);
    }

    async updateEmployee(id, data) {
        return await Employee.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteEmployee(id) {
        return await Employee.findByIdAndDelete(id);
    }

    async searchEmployees(searchTerm) {
        return await Employee.find({
            $or: [
                { fullName: { $regex: searchTerm, $options: 'i' } },
                { employeeId: { $regex: searchTerm, $options: 'i' } }
            ]
        });
    }

    async getMonthlySalary(id) {
        const employee = await Employee.findById(id);
        if (!employee) return null;
        return employee.salary + employee.allowances;
    }
}

module.exports = new EmployeeService();