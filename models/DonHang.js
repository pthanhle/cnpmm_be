const mongoose = require('mongoose');

const DonHangSchema = new mongoose.Schema({
    maDH: { type: String, required: true, unique: true },
    khachHang: { type: String, required: true },
    sanPham: [
        {
            tenSP: String,
            soLuong: Number,
            gia: Number
        }
    ],
    tongTien: Number,
    ngayDat: { type: Date, required: true }
}, { timestamps: true });

DonHangSchema.pre('save', function (next) {
    this.tongTien = this.sanPham.reduce((total, item) => total + (item.soLuong * item.gia), 0);
    next();
});

DonHangSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.sanPham) {
        update.tongTien = update.sanPham.reduce((total, item) => total + (item.soLuong * item.gia), 0);
    }
    next();
});

module.exports = mongoose.model('DonHang', DonHangSchema);