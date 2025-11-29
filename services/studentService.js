const Student = require('../models/studentModel');

class StudentService {
    async createStudent(data) {
        return await Student.create(data);
    }

    async getStudents(query = {}) {
        return await Student.find(query);
    }

    async getStudentById(id) {
        return await Student.findById(id);
    }

    async updateStudent(id, data) {
        return await Student.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteStudent(id) {
        return await Student.findByIdAndDelete(id);
    }

    async searchStudents(searchTerm) {
        return await Student.find({
            $or: [
                { fullName: { $regex: searchTerm, $options: 'i' } },
                { studentId: { $regex: searchTerm, $options: 'i' } }
            ]
        });
    }

    async getGpaStats() {
        const [maxGpaStudent] = await Student.aggregate([{ $sort: { gpa: -1 } }, { $limit: 1 }]);
        const [minGpaStudent] = await Student.aggregate([{ $sort: { gpa: 1 } }, { $limit: 1 }]);
        return { max: maxGpaStudent, min: minGpaStudent };
    }
}

module.exports = new StudentService();