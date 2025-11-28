const express = require('express');
const router = express.Router();
const donHangController = require('../controllers/donHangController');

router.get('/orders', donHangController.getAllDonHang);
router.get('/orders/:id', donHangController.getDonHangById);
router.post('/orders', donHangController.createDonHang);
router.put('/orders/:id', donHangController.updateDonHang);
router.delete('/orders/:id', donHangController.deleteDonHang);

module.exports = router;