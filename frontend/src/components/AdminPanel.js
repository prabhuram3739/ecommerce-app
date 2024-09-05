// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/orders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await axios.put(`http://localhost:5000/api/admin/product/${selectedProduct.id}`, selectedProduct);
      // Fetch updated product list
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
      alert('Product updated successfully');
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Orders Table */}
      <h3>Orders</h3>
      <div className="table-container">
        <table className="full-width-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.name}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products Table */}
      <h3>Products</h3>
      <div className="table-container">
        <table className="full-width-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => setSelectedProduct(product)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Form */}
      {selectedProduct && (
        <form onSubmit={handleUpdateProduct} className="edit-form">
          <h3>Edit Product</h3>
          <input
            type="text"
            value={selectedProduct.name}
            onChange={e => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="number"
            value={selectedProduct.price}
            onChange={e => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
            placeholder="Price"
          />
          <input
            type="number"
            value={selectedProduct.stock}
            onChange={e => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value, 10) })}
            placeholder="Stock"
          />
          <textarea
            value={selectedProduct.description}
            onChange={e => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
            placeholder="Description"
          />
          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;
