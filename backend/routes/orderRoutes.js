// backend/routes/orderRoutes.js
const express = require('express');
const { createOrder, getAllOrders, nextOrder } = require('../controllers/orderController');

const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get all orders (for debugging or admin purposes)
router.get('/', getAllOrders);

// Route to get the next order
router.get('/next', nextOrder );

module.exports = router;
