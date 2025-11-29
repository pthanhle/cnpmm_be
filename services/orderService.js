const Order = require('../models/orderModel');

class OrderService {
    async createOrder(data) {
        data.total = data.quantity * data.price; // Tính tổng tiền
        return await Order.create(data);
    }

    async getOrders() {
        return await Order.find();
    }

    async getOrderById(id) {
        return await Order.findById(id);
    }

    async updateOrder(id, data) {
        if (data.quantity || data.price) {
            data.total = (data.quantity || 0) * (data.price || 0);
        }
        return await Order.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteOrder(id) {
        return await Order.findByIdAndDelete(id);
    }

    async getTotalValue() {
        const result = await Order.aggregate([{ $group: { _id: null, totalValue: { $sum: '$total' } } }]);
        return result[0]?.totalValue || 0;
    }

    async getRevenueReport(startDate, endDate) {
        const match = {};
        if (startDate) match.createdAt = { $gte: new Date(startDate) };
        if (endDate) match.createdAt = { ...match.createdAt, $lte: new Date(endDate) };
        return await Order.aggregate([
            { $match: match },
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, dailyRevenue: { $sum: '$total' } } },
            { $sort: { _id: 1 } }
        ]);
    }
}

module.exports = new OrderService();