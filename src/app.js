const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const Product = require('./models/Product');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/products', require('./routes/productRoutes'));
app.use('/cart', require('./routes/cartRoutes'));
app.use('/orders', require('./routes/orderRoutes'));

// Basic error handler
app.use(errorHandler);

module.exports = app;
