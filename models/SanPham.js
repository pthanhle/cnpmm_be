// models/SanPham.js
const mongoose = require('mongoose');

const SanPhamSchema = new mongoose.Schema({
    maSP: { type: String, required: true, unique: true },
    tenSP: { type: String, required: true },
    gia: { type: Number, required: true },
    soLuong: { type: Number, required: true },
    moTa: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SanPham', SanPhamSchema);