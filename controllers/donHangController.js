const donHangService = require('../services/donHangService');

class DonHangController {
    async getAllDonHang(req, res) {
        try {
            const { khachHang, startDate, endDate } = req.query;
            let filter = {};
            if (khachHang) filter.khachHang = { $regex: khachHang, $options: 'i' };
            if (startDate && endDate) filter.ngayDat = { $gte: new Date(startDate), $lte: new Date(endDate) };
            const donHangs = await donHangService.getAllDonHang(filter);
            res.json(donHangs);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getDonHangById(req, res) {
        try {
            const donHang = await donHangService.getDonHangById(req.params.id);
            if (!donHang) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
            res.json(donHang);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createDonHang(req, res) {
        try {
            const donHang = await donHangService.createDonHang(req.body);
            res.status(201).json(donHang);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateDonHang(req, res) {
        try {
            const donHang = await donHangService.updateDonHang(req.params.id, req.body);
            if (!donHang) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
            res.json(donHang);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteDonHang(req, res) {
        try {
            const deleted = await donHangService.deleteDonHang(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
            res.json({ message: 'Đã xóa đơn hàng thành công!' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new DonHangController();