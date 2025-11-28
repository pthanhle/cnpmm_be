const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    tieuDe: { type: String, required: true },
    noiDung: { type: String, required: true },
    tacGia: { type: String, required: true },
    ngayDang: { type: Date, default: Date.now },
    anh: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);