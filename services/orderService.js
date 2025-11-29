const Order = require('../models/orderModel');

class OrderService {
    async createOrder(data) {
        const quantity = Number(data.quantity);
        const price = Number(data.price);

        data.total = quantity * price;

        return await Order.create(data);
    }

    async getOrders(query = {}) {
        return await Order.find(query);
    }

    async getOrderById(id) {
        return await Order.findById(id);
    }

    async updateOrder(id, data) {
        const currentOrder = await Order.findById(id);
        if (!currentOrder) {
            throw new Error('Đơn hàng không tồn tại');
        }

        const newQuantity = data.quantity !== undefined ? Number(data.quantity) : currentOrder.quantity;
        const newPrice = data.price !== undefined ? Number(data.price) : currentOrder.price;

        const newTotal = newQuantity * newPrice;

        data.quantity = newQuantity;
        data.price = newPrice;
        data.total = newTotal;

        return await Order.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteOrder(id) {
        return await Order.findByIdAndDelete(id);
    }

    async getTotalValue() {
        const result = await Order.aggregate([
            { $group: { _id: null, totalValue: { $sum: '$total' } } }
        ]);
        return result[0]?.totalValue || 0;
    }

    async getRevenueReport(startDate, endDate) {
        const match = {};
        if (startDate) match.createdAt = { $gte: new Date(startDate) };
        if (endDate) match.createdAt = { ...match.createdAt, $lte: new Date(endDate) };

        return await Order.aggregate([
            { $match: match },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    dailyRevenue: { $sum: '$total' }
                }
            },
            { $sort: { _id: 1 } }
        ]);
    }
}

module.exports = new OrderService();