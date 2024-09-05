// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        address,
        role,
      });
      alert('Registered successfully!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering:', error);
      alert('Failed to register');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
