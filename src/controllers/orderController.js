const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Create new order
// @route   POST /orders
// @access  Public
const createOrder = async (req, res, next) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            res.status(400);
            throw new Error('Order items are required');
        }

        let total = 0;
        const orderItems = [];

        // Validate stock and calculate total
        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                res.status(404);
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            if (product.stock < item.quantity) {
                res.status(400);
                throw new Error(`Insufficient stock for product: ${product.name}`);
            }

            // Deduct stock
            product.stock -= item.quantity;
            await product.save();

            total += product.price * item.quantity;
            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        // Generate unique order ID
        const orderId = `ord_${Date.now()}`;

        const order = new Order({
            orderId,
            items: orderItems,
            total,
            status: 'completed'
        });

        await order.save();

        res.status(201).json({
            orderId: order.orderId,
            total: order.total
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder
};
