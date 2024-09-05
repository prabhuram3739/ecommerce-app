// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure any custom styles do not conflict with Bootstrap

const Header = () => {
  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div className="navbar-brand">
          <Link className="nav-link" to="/">E-Commerce</Link>
        </div>
        <nav className="navbar">
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
