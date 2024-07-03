// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import deeptimizeLogo from '../assets/images/deeptimize-logo.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <img alt="Deeptimize Logo" className='navbar-logo' src={deeptimizeLogo} />
      </div>
    </div>
  );
}

export default Navbar;
