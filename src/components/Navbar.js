import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import Logo from "./../assets/image/logo.png"

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <nav className="navbar">
      <div className="img-wrapper">
        <img src={Logo} alt="" className='logo'/>
      </div>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        <Link to="/" className='home'>
          <li>Home</li>
        </Link>
        <Link to="/" className='guide'>
          <li>Guide</li>
        </Link>
        <Link to="/" className='contact'>
          <li>Contacts</li>
        </Link>
        <Link to="/" className='about'>
          <li>About</li>
        </Link>
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  )
}

export default Navbar