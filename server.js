const express = require('express');
const cors = require('cors');
require('./configs/db'); // Kết nối MongoDB

const app = express();
const studentRoutes = require('./routes/studentRoutes');
const projectRoutes = require('./routes/projectRoutes');
const orderRoutes = require('./routes/orderRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', studentRoutes);
app.use('/api', projectRoutes);
app.use('/api', orderRoutes);
app.use('/api', employeeRoutes);
app.use(errorMiddleware);

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