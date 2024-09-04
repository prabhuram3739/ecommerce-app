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
    // Notify user of order status change
    io.emit('updateOrderStatus', data);
  });

  socket.on('newOrder', (data) => {
    // Notify admin of new order
    io.emit('newOrderNotification', data);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Database sync and server start
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
