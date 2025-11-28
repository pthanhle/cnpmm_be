// routes/sinhVienRoutes.js
const express = require('express');
const router = express.Router();
const SinhVien = require('../models/SinhVien');

router.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.hoTen) {
            query.hoTen = { $regex: req.query.hoTen, $options: 'i' };
        }
        if (req.query.lop) {
            query.lop = req.query.lop;
        }
        if (req.query.diemTBMin && Number(req.query.diemTBMin) >= 7) {
            query.diemTB = { $gte: Number(req.query.diemTBMin) };
        }
        const students = await SinhVien.find(query);
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await SinhVien.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const student = new SinhVien(req.body);
        const saved = await student.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await SinhVien.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await SinhVien.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        res.json({ message: 'Đã xóa sinh viên thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;