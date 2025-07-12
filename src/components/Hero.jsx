import React, { useState, useEffect } from 'react';
import c3 from '../assets/c3.jpg';
import g1 from '../assets/g1.webp';
import m5 from '../assets/m5.jpg';
import n6 from '../assets/n6.jpg';
import o7 from '../assets/o7.jpg';
import t3 from '../assets/t3.jpg';
import so2 from '../assets/so2.jpg';
import s16 from '../assets/s16.jpg';
import '../App.css';
import { Link } from 'react-router-dom';

const images = [c3, o7, m5, n6, g1, t3, so2, s16];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container" style={{
      position: 'relative',
      overflow: 'hidden',
      marginTop: '5%',
      background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0.5))',
      height: '90vh',
      width: '100%'
    }}>
      <div className="hero-image-wrapper" style={{
        position: 'relative',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
        objectFit: 'cover',
        justifyContent: 'center'
      }}>
        <img
          src={images[currentIndex]}
          alt="hero"
          className="hero-image"
          style={{
            width: '100%',
            height: '100vh',
            opacity: 1,
            filter: 'brightness(0.8)',
            transition: '0.5s ease-in-out',
          }}
        />

        <div
          className="nav-box left"
          onClick={prev}
          style={{
            position: 'absolute',
            top: '50%',
            left: '20px',
            transform: 'translateY(-50%)',
            fontSize: '2rem',
            background: 'rgba(0,0,0,0.3)',
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 1,
            opacity: showArrows ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          ❮
        </div>
        <div
          className="nav-box right"
          onClick={next}
          style={{
            position: 'absolute',
            top: '50%',
            right: '20px',
            transform: 'translateY(-50%)',
            fontSize: '2rem',
            background: 'rgba(0,0,0,0.3)',
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 1,
            opacity: showArrows ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          ❯
        </div>
      </div>

      <div className="dots" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        position: 'absolute',
        bottom: '15px',
        width: '100%',
        zIndex: 1
      }}>
        {images.map((_, index) => (
          <div
            key={index}
            className="dot"
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#28a745' : '#ccc',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          />
        ))}
      </div>

      <div className="hero-text" style={{
        position: 'absolute',
        top: '30%',
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
      }}>
        <h4 className="hero-title" style={{ fontSize: '3rem', margin: 0, fontWeight: 'bold' }}>
          Welcome to 
        </h4>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', margin: 0, fontWeight: 'bold' }}>
          Castor Care Ghana
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.5rem', marginBottom: '50px' }}>
          Transforming Agriculture, Changing Lives
        </p>
        <Link to="/education" className="navlink" style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          borderRadius: '20px',
          fontWeight: 'bold',
          textDecoration: 'none',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '1.2rem',
          transition: 'background-color 0.3s ease',
          width: '150px',
          justifyContent: 'center',
          zIndex: '1',
          position: 'relative'
        }}>Get Educated<span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
