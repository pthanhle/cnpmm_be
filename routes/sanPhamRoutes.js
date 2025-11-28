// routes/sanPhamRoutes.js
const express = require('express');
const router = express.Router();
const SanPham = require('../models/SanPham');

router.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.tenSP) {
            query.tenSP = { $regex: req.query.tenSP, $options: 'i' };
        }
        if (req.query.giaMin) {
            query.gia = { $gte: Number(req.query.giaMin) };
        }
        const products = await SanPham.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await SanPham.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = new SanPham(req.body);
        const saved = await product.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await SanPham.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await SanPham.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json({ message: 'Đã xóa sản phẩm thành công!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;