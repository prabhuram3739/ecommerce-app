// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Function to handle adding a product to the cart
  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/add', { productId, quantity: 1, userId: 1 });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header my-4">Product Catalog</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product.id)}
                >
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

export default Home;
