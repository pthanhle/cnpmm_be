const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gpa: { type: Number, required: true, min: 0, max: 10 },
    major: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);