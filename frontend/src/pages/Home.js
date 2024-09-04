import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1 className="header">Product Catalog</h1>
      <div className="row">
        {products?.map(product => (
          <div className="col-md-4" key={product?.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product?.name}</h5>
                <p className="card-text">{product?.description}</p>
                <p className="card-text">${product?.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
