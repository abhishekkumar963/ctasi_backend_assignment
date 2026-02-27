const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Add item to cart
// @route   POST /cart/add
// @access  Public
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            res.status(400);
            throw new Error('Product ID and quantity are required');
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        // In a real app, we'd find the cart by user ID. 
        // For this assignment, we'll just simulate success as per the example.
        // We could also store it in a single cart for simplicity if needed.
        
        // Find existing cart (since no userId, we'll just use one cart for all)
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addToCart
};
