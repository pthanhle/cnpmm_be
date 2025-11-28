const nhanVienService = require('../services/nhanVienService');

class NhanVienController {
    async getAllNhanVien(req, res) {
        try {
            const { q } = req.query;
            const filter = q ? { $or: [{ hoTen: { $regex: q, $options: 'i' } }, { chucVu: { $regex: q, $options: 'i' } }] } : {};
            const nhanViens = await nhanVienService.getAllNhanVien(filter);
            res.json(nhanViens);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getNhanVienById(req, res) {
        try {
            const nhanVien = await nhanVienService.getNhanVienById(req.params.id);
            if (!nhanVien) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
            res.json(nhanVien);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createNhanVien(req, res) {
        try {
            const nhanVien = await nhanVienService.createNhanVien(req.body);
            res.status(201).json(nhanVien);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateNhanVien(req, res) {
        try {
            const nhanVien = await nhanVienService.updateNhanVien(req.params.id, req.body);
            if (!nhanVien) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
            res.json(nhanVien);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteNhanVien(req, res) {
        try {
            const deleted = await nhanVienService.deleteNhanVien(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
            res.json({ message: 'Đã xóa nhân viên thành công!' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new NhanVienController();