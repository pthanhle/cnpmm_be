const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true, min: 0 },
    allowances: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    department: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);