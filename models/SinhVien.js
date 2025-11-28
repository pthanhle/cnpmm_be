// models/SinhVien.js
const mongoose = require('mongoose');

const SinhVienSchema = new mongoose.Schema({
    maSV: { type: String, required: true, unique: true },
    hoTen: { type: String, required: true },
    ngaySinh: { type: Date, required: true },
    lop: { type: String, required: true },
    diemTB: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('SinhVien', SinhVienSchema);