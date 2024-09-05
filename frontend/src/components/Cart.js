// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post('http://localhost:5000/api/checkout', { items: cartItems });
      alert('Order placed successfully!');
      setCartItems([]); // Clear cart after successful order
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item">
            {item.product.name} - ${item.product.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-3" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
