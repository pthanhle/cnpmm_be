const express = require('express');
const router = express.Router();
const nhanVienController = require('../controllers/nhanVienController');

router.get('/employees', nhanVienController.getAllNhanVien);
router.get('/employees/:id', nhanVienController.getNhanVienById);
router.post('/employees', nhanVienController.createNhanVien);
router.put('/employees/:id', nhanVienController.updateNhanVien);
router.delete('/employees/:id', nhanVienController.deleteNhanVien);

module.exports = router;