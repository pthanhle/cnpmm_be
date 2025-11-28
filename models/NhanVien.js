const mongoose = require('mongoose');

const NhanVienSchema = new mongoose.Schema({
    maNV: { type: String, required: true, unique: true },
    hoTen: { type: String, required: true },
    chucVu: String,
    luong: Number,
    ngayVaoLam: Date
}, { timestamps: true });

module.exports = mongoose.model('NhanVien', NhanVienSchema);