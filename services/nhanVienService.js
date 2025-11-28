const NhanVien = require('../models/NhanVien');

class NhanVienService {
    async getAllNhanVien(filter = {}) {
        return await NhanVien.find(filter);
    }

    async getNhanVienById(id) {
        return await NhanVien.findById(id);
    }

    async createNhanVien(data) {
        const nhanVien = new NhanVien(data);
        return await nhanVien.save();
    }

    async updateNhanVien(id, data) {
        return await NhanVien.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteNhanVien(id) {
        return await NhanVien.findByIdAndDelete(id);
    }
}

module.exports = new NhanVienService();