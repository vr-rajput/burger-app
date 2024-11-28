// backend/models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerMobile: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    orderNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
