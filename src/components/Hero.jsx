import React, { useState, useEffect } from 'react';
import c3 from '../assets/c3.jpg';
import g2 from '../assets/g2.jpg';
import m1 from '../assets/m1.jpg';
import n1 from '../assets/n1.webp';
import o1 from '../assets/o2.webp';
import t3 from '../assets/t3.jpg';
import '../App.css';

const images = [g2, c3, m1, n1, o1, t3];

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
    <div className="hero-container" style={{ position: 'relative', overflow: 'hidden', marginTop: '5%', background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0.5))' }}>
      <div className="hero-image" style={{ position: 'relative', height: '90vh' }}>
        <img
          src={images[currentIndex]}
          alt="hero"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1,
           
            // filter: 'brightness(0.7)',
            transition: '0.5s ease-in-out',
            position: 'absolute',
          }}
        />

        {/* Navigation Arrows */}
        <div
          className="nav-box left"
          onClick={prev}
          style={{ position: 'absolute',top: '50%',left: '20px',transform: 'translateY(-50%)',fontSize: '2rem',background: 'rgba(0,0,0,0.3)', color: 'white',padding: '10px',borderRadius: '50%',cursor: 'pointer',zIndex: 10,opacity: showArrows ? 1 : 0,transition: 'opacity 0.3s ease'}}
          >
          ❮
        </div>
        <div
          className="nav-box right"
          onClick={next}
          style={{position: 'absolute',top: '50%',right: '20px',transform: 'translateY(-50%)',fontSize: '2rem',background: 'rgba(0,0,0,0.3)',color: 'white',padding: '10px',borderRadius: '50%',cursor: 'pointer',zIndex: 10,opacity: showArrows ? 1 : 0,transition: 'opacity 0.3s ease'}}
          >
          ❯
        </div>
      </div>

      {/* Dots */}
      <div className="dots" style={{display: 'flex', justifyContent: 'center', gap: '10px', position: 'absolute', bottom: '15px', width: '100%'}}>

        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: index === currentIndex ? '#28a745' : '#ccc', cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Hero Text */}
      <div className="hero-text" style={{position: 'absolute',top: '40%',width: '100%',textAlign: 'center',color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}
      >
        <h1 style={{ fontSize: '3.5rem', margin: 0 }}>Welcome to Castor Care Ghana</h1>
        <p style={{ fontSize: '1.5rem' }}>Transforming Agriculture, Changing Lives</p>
      </div>
    </div>
  );
};

export default Hero;
