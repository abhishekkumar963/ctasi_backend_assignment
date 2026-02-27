E-commerce Backend API

CTASI – Backend Engineering Assignment

📖 Overview

This project is a RESTful API for a basic E-commerce system built using Node.js, Express, and MongoDB.

The API provides endpoints for:

Viewing products

Adding items to cart

Creating orders

Validating and deducting stock

Handling invalid requests properly

This project focuses only on backend functionality (no frontend included).

🧰 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
dotenv

Setup Instructions
1️⃣ Clone the Repository
2️⃣ Install Dependencies
3️⃣ Configure Environment Variables
4️⃣ Run the Server


You can test the APIs using:
Postman
Thunder Client (VS Code extension)


Base URL:
http://localhost:5000

1. Get All Products
GET /products
Example:
http://localhost:5000/products



2. Add Product to Cart

POST /cart/add

Request Body (JSON):

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}

3. Create Order
POST /orders
Request Body:

{
  "items": [
   {
      "productId": "PRODUCT_ID",
      "quantity": 1
    }
  ]
}

Validates stock
Deducts stock after successful order
Returns order ID and total amount
If stock is insufficient, API returns proper error response.


✅ Features Implemented

Product listing endpoint

Cart management endpoint

Order creation endpoint

Stock validation before checkout

Stock deduction after successful order

Proper error handling

Clean project structure



