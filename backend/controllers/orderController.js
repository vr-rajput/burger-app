// backend/controllers/orderController.js
const Order = require('../models/orderModel');

// Generate the next order number
const generateOrderNumber = async () => {
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const lastOrderNumber = lastOrder ? parseInt(lastOrder.orderNumber.split('-')[1]) : 0;
    const newOrderNumber = lastOrderNumber + 1;
    return `BURG-${String(newOrderNumber).padStart(3, '0')}`;
};

// Create a new order
const createOrder = async (req, res) => { 
    const { customerMobile, items } = req.body;
    if (!customerMobile || !items) {
        return res.status(400).json({ message: 'Customer mobile and items are required' });
    }

    try {
        const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
        const orderNumber = await generateOrderNumber();

        const newOrder = new Order({
            customerMobile,
            items,
            totalPrice,
            orderNumber,
        });

        await newOrder.save();
        return res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) { 
        return res.status(500).json({ message: 'Server error' });
    }
};
// Get all orders
const nextOrder = async (req, res) => {
    try {
        const lastOrder = await Order.findOne().sort({ createdAt: -1 }).limit(1); // Get the most recent order
        let nextOrderNumber = 'BURG-001'; // Default if no orders exist

        if (lastOrder) {
            const lastNumber = lastOrder.orderNumber.split('-')[1]; // Extract the number part
            const nextNumber = parseInt(lastNumber) + 1; // Increment it
            nextOrderNumber = `BURG-${nextNumber.toString().padStart(3, '0')}`; // Format it as 'BURG-003'
        }

        return res.json({ orderNumber: nextOrderNumber });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder, getAllOrders, nextOrder };
