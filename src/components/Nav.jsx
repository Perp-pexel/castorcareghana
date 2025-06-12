import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../assets/logo2.png';
import '../App.css';
import { FaUser } from 'react-icons/fa';

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with real auth check

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    setIsLoggedIn(false); // Replace with real logout logic
  };

  return (
    <div>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0px 20px',
        height: '70px'
      }}>
        {/* Logo */}
        <div className="logo">
          <img src={logo2} alt="Logo" style={{ width: '39%', height: '39%', objectFit: 'cover', marginLeft: '10px' }} />
        </div>

        {/* Desktop Layout */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            {/* Centered Nav Links */}
            <nav className="nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <ul style={{
                display: 'flex',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                gap: '20px',
                alignItems: 'center',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                <Link to="/" className="navlink">Home</Link>
                <Link to="/about" className="navlink">About</Link>
                <Link to="/product" className="navlink">Products</Link>
                <Link to="/service" className="navlink">Services</Link>
                <Link to="/blog" className="navlink">Blog</Link>
                <Link to="/contact" className="navlink" style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer'
                }}>
                  Contact <span>→</span>
                </Link>
              </ul>
            </nav>

            {/* User Icon */}
            <div onClick={toggleUserMenu} style={{ cursor: 'pointer', fontSize: '28px', color: '#666', paddingRight: '50px', marginLeft: '250px', marginTop: '10px' }} aria-label="User menu">
              <FaUser />
            </div>
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '10px' }}>
            <a href="tel:+233244185012" style={{ fontSize: '20px', color: '#666', textDecoration: 'none' }}>☎️</a>
            <div onClick={toggleUserMenu} style={{ fontSize: '24px', color: '#666', cursor: 'pointer', marginTop: '10px'}}><FaUser /></div>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: '30px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>☰</button>
          </div>
        )}
      </header>

      {/* Mobile Nav Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100px',
          right: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '10px 15px',
          zIndex: 1000
        }}>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            <Link to="/" className="navlink" onClick={handleLinkClick}>Home</Link>
            <Link to="/about" className="navlink" onClick={handleLinkClick}>About</Link>
            <Link to="/product" className="navlink" onClick={handleLinkClick}>Products</Link>
            <Link to="/service" className="navlink" onClick={handleLinkClick}>Services</Link>
            <Link to="/blog" className="navlink" onClick={handleLinkClick}>Blog</Link>
            <li>
              <Link to="/contact" className="navlink" onClick={handleLinkClick} style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: '#fff',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Contact <span>→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* User Dropdown */}
      {userMenuOpen && (
        <div style={{
          position: 'fixed',
          top: isMobile ? '70px' : '70px',
          right: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '10px 15px',
          zIndex: 1000,
          minWidth: '150px',
        }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: '10px', fontSize: '15px', fontWeight: 'bold', display: 'flex', flexDirection: 'column', gap: '10px', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            {!isLoggedIn ? (
              <>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/signin" onClick={handleLinkClick}  style={{ textDecoration: 'none', color: '#333' }}>
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333', }}>
                    Create Account
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/dashboard" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>
                    Dashboard
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/orders" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>
                    My Orders
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/profile" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#333' }}>
                    Update Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} style={{
                    background: 'none',
                    border: 'none',
                    color: '#333',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '14px',
                    textAlign: 'left',
                    width: '100%'
                  }}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
