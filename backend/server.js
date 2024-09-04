const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./models');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('orderStatusChange', (data) => {
    io.emit('updateOrderStatus', data);
  });

  socket.on('newOrder', (data) => {
    io.emit('newOrderNotification', data);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Database sync and server start
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
