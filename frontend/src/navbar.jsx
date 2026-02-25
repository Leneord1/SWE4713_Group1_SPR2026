import React, { useState } from 'react';
import './navbar.css';
import logo from '../assets/Images/resourceDirectory/logo.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavigation('/')}>
          <img src={logo} alt="App Logo" className="navbar-logo-img" />
          <span className="navbar-brand">Dashboard</span>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
          <span className={isMenuOpen ? 'open' : ''}></span>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#/" className="nav-link" onClick={() => handleNavigation('/')}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#/dashboard" className="nav-link" onClick={() => handleNavigation('/dashboard')}>Dashboard</a>
          </li>
          <li className="nav-item">
            <button className="nav-logout-btn" onClick={() => handleNavigation('/login')}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

