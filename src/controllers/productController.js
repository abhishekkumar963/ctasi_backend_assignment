const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts
};
