const express = require('express');
const cors = require('cors');
const nhanVienRoutes = require('./routes/nhanVienRoutes');
const donHangRoutes = require('./routes/donHangRoutes');
const blogRoutes = require('./routes/blogRoutes');
require('./configs/db'); // Kết nối MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', nhanVienRoutes);
app.use('/api', donHangRoutes);
app.use('/api', blogRoutes);

// Kiểm tra kết nối MongoDB trước khi khởi động server
const mongoose = require('./configs/db');
mongoose.connection.once('open', () => {
    console.log('✅ MongoDB đã sẵn sàng!');
    const PORT = 3000;
    app.listen(PORT, () => console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`));
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Không thể khởi động server do lỗi MongoDB:', err);
    process.exit(1);
});