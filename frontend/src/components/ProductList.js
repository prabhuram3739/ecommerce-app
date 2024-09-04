// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [available, setAvailable] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, [searchTerm, minPrice, maxPrice, available]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products', {
        params: { name: searchTerm, minPrice, maxPrice, available },
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post('/api/cart', { productId, quantity: 1 });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="container">
       <input type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
      <input type="number" placeholder="Min Price" onChange={(e) => setMinPrice(e.target.value)} />
      <input type="number" placeholder="Max Price" onChange={(e) => setMaxPrice(e.target.value)} />
      <label>
        Available Only
        <input type="checkbox" onChange={(e) => setAvailable(e.target.checked)} />
      </label>
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
