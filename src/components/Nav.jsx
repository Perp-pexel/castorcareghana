import React, { useState, useEffect } from 'react';
import logo2 from '../assets/logo2.png';
import '../App.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };


  

  return (
    <div>
      <header
        style={{
          display: 'flex',justifyContent: 'space-between',alignItems: 'center',backgroundColor: '#f8f8f8',boxShadow: '0 2px 4px rgba(0,0,0,0.1)',position: 'fixed',top: '0',left: '0',right: '0',zIndex: '1000',padding: '0px 20px'
        }}
      >
        <div className="logo" onClick={ToggleEvent} >
          <img src={logo2} alt="Logo"style={{width: '39%',height: '39%',objectFit: 'cover',marginLeft: '10px'}}/>
        </div>


        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '10px' }}>
            {/* Contact icon for mobile */}
            <a href="tel:+233244185012" target="_blank" rel="noopener noreferrer" style={{ fontSize: '20px', textDecoration: 'none', color: '#228B22' }}>
              ☎️
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                fontSize: '30px',background: 'none',border: 'none',cursor: 'pointer',color: '#333'
              }}
            >
              ☰
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <nav className="nav-links">
              <ul
                style={{
                  display: 'flex',listStyle: 'none',margin: 0,padding: 0,gap: '20px',alignItems: 'center',fontSize: '15px',fontWeight: 'bold', color: '#333'
                }}
              >
              <Link to="/" className="navlink">Home</Link>
              <Link to="/about" className="navlink">About</Link>
              <Link to="/product" className="navlink">Products</Link>
              <Link to="/service" className="navlink">Services</Link>
              <Link to="/blog" className="navlink">Blog</Link>
              {/* Contact Button (Desktop) */}
              <Link to="/contact" className='navlink' style={{
                padding: '8px 16px',backgroundColor: '#28a745',color: '#fff',border: 'none',borderRadius: '20px',fontWeight: 'bold',textDecoration: 'none',display: 'flex',alignItems: 'center',gap: '5px',cursor: 'pointer'
              }}>Contact <span>→</span></Link>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Dropdown Menu */}
      {isMobile && menuOpen && (
        <div
          style={{ position: 'absolute',top: '100px',right: '20px',backgroundColor: '#fff',border: '1px solid #ddd',borderRadius: '8px',boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '10px 15px',zIndex: '1000'}}
        >
          <ul
            style={{listStyle: 'none',padding: 0,margin: 0,display: 'flex',flexDirection: 'column',gap: '10px',fontSize: '15px',fontWeight: 'bold', color: '#333' }}
          >
            <Link to="/" className='navlink' style={{ textDecoration: 'none', color: '#333' }} onClick={handleLinkClick}>
                Home
              </Link>
            <Link to="/about" className="navlink" style={{ textDecoration: 'none', color: '#333' }} onClick={handleLinkClick}>About</Link>
            <Link to="/product" className="navlink" style={{ textDecoration: 'none', color: '#333' }} onClick={handleLinkClick}>Products</Link>
            <Link to="/service" className="navlink" style={{ textDecoration: 'none', color: '#333' }} onClick={handleLinkClick}>Services</Link>
            <Link to="/blog" className="navlink" style={{ textDecoration: 'none', color: '#333' }} onClick={handleLinkClick}>Blog</Link>
            <li>
              <Link to="/contact" className="navlink" onClick={handleLinkClick} style={{ padding: '8px 16px',backgroundColor: '#28a745',color: '#fff',border: 'none',borderRadius: '20px',fontWeight: 'bold',textDecoration: 'none',display: 'flex',alignItems: 'center',gap: '5px',cursor: 'pointer', justifyContent: 'center' }}>
                Contact <span>→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
