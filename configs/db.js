const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/cnpmm';

mongoose.connect(uri)
    .then(() => console.log('✅ Kết nối MongoDB thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

module.exports = mongoose;