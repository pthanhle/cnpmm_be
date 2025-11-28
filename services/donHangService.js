const DonHang = require('../models/DonHang');

class DonHangService {
    async getAllDonHang(filter = {}) {
        return await DonHang.find(filter);
    }

    async getDonHangById(id) {
        return await DonHang.findById(id);
    }

    async createDonHang(data) {
        const donHang = new DonHang(data);
        return await donHang.save();
    }

    async updateDonHang(id, data) {
        return await DonHang.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async deleteDonHang(id) {
        return await DonHang.findByIdAndDelete(id);
    }
}

module.exports = new DonHangService();