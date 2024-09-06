# E-commerce Application

## Overview

This is a full-stack e-commerce application developed using Node.js, Express, Sequelize, and React. It features user registration, login, product management, cart functionality, and order processing.

## Technologies

- **Backend**:
  - Node.js
  - Express.js
  - Sequelize (for ORM)
  - PostgreSQL (for database)
  - bcryptjs (for password hashing)
  - jsonwebtoken (for authentication)

- **Frontend**:
  - React
  - Axios (for HTTP requests)
  - Bootstrap (for styling)

## Features

- User registration and authentication
- Product catalog with add to cart
- Shopping cart with add
- Checkout process with order creation
- Admin functionality for managing products with update

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prabhuram3739/ecommerce-app.git
   cd ecommerce-app

   Navigate to the backend directory:
   cd backend

  Install dependencies:
  npm install

  Create a .env file in the backend directory and add the following environment variables:
  DB_HOST=localhost
DB_USER=your_db_user //postgres
DB_PASS=your_db_password //Prabhu@19
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret // eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNTQ0MTQyMywiaWF0IjoxNzI1NDQxNDIzfQ._DnQS0IDuQAqHQGHxzTXmJq8L8IMpSKZDGOsnV_DldE

Run database migrations:
npx sequelize-cli db:migrate

Run the server
npm start

Navigate to the frontend directory:
cd ../frontend

Install dependencies:
npm install

Start the frontend server:
npm start

Access the application:

Open your browser and go to http://localhost:5001 to access the frontend application. The backend server will be running on http://localhost:5000.

API Endpoints
User Routes:
POST /api/users/register - Register a new user
POST /api/users/login - Log in a user

Product Routes:
GET /api/products - Get a list of products
POST /api/products - Add a new product (Admin only)

Cart Routes:
POST /api/cart - Add item to cart
GET /api/cart - Get cart items
POST /api/checkout - Checkout and create an order

Order Routes:
GET /api/orders - Get orders (Admin only)

 Socket has been included to identify the real time updates for the order, Necessary relations has been given to the models, Basic css with the bootstrap has been applied as mentioned in the test that it doent need to be concentrated much.
 
