import React, { useState } from 'react';
import s1 from '../assets/s1.jpg';
import t5 from '../assets/t5.webp';
import founder from '../assets/founder.jpg';
import h3 from '../assets/team/h3.jpg';
import '../App.css';
import { Link } from 'react-router-dom';

const Content = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = () => setShowOverlay(true);
  const closeOverlay = () => setShowOverlay(false);

  return (
    <div>
      {/* Who We Are Section */}
      <div className='section-style'>
        <div className='flex-container'>
          <div className='text-style'>
            <h1 className='heading-style'>Who We Are</h1>
            <p>
              Castor Care Ghana Ltd is a company focused on changing the agriculture sector. 
              We have evolved into a growing enterprise dedicated to transforming lives and landscapes. 
              Our company specializes in commodity trading like Soya bean, Maize and Shea nut to both local markets and export needs. 
              We also train smallholder farmers in financial literacy and good agricultural practices. 
              We’re proud to have expanded our portfolio to include trading in other commodities including Cashew, Tiger Nuts and Ginger.
            </p>
            <Link to="/about" className='more'>Read More <span>→</span></Link>
          </div>
          <img src={t5} alt="about" className='img-style' />
        </div>
      </div>

      {/* What We Offer Section */}
      <div className='section-style'>
        <div className='flex-container'>
          <img src={s1} alt="offer" className='img-style' />
          <div className='text-style'>
            <h1 className='heading-style'>What We Offer</h1>
            <p>
              Castor Care Ghana is a digital platform aimed at changing the food industry by connecting producers, traders and consumers worldwide.
              We promote sustainable food production, trade and consumption through:
            </p>
            <ul className='list-style'>
              <li>Supply chain optimization using data analytics and AI-driven insights</li>
              <li>Quality control and assurance through standardized processes and certifications</li>
              <li>Payment processing and financing solutions for buyers and sellers</li>
            </ul>
            <Link to="/service" className='more'>Read More <span>→</span></Link>
          </div>
        </div>
      </div>

      {/* Our Target Market Section */}
      <div className='target-container' style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'20px', padding:'20px', margin:'100px 0'}}>
        <div className='target' style={{width:'40%', padding:'10px 55px', borderRight:'2px solid #90ee90', minWidth:'300px'}}>
          <h4>Our Target Market</h4>
          <h2 style={{ color:'green'}}> We are committed to working with key stakeholders across the agricultural value chain, including:</h2>
          <ul>
            <li>Farmers and farmer cooperatives</li>
            <li>Food processors and manufacturers</li>
            <li>Local and international buyers</li>
            <li>Regulatory bodies and certification agencies</li>
          </ul>
        </div>

        {/* Founder Section */}
        <div className='target' style={{width:'40%', padding:'10px 55px', borderLeft:'2px solid #90ee90'}}>
          <p>At Castor Care Ghana our mission is to revolutionize the agricultural landscape by providing cutting-edge technology solutions that optimize the farm-to-table supply chain.</p>
          <div 
            className='founder-container' 
            style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', minWidth: '300px', cursor: 'pointer', marginTop: '20px' }}
            onClick={openOverlay}
          >
            <img 
              className='founder-style' 
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
              src={founder} 
              alt="founder" 
            />
            <div className='founder-text' style={{ lineHeight: '0.5' }}> 
              <h3>Kwaku Anim-Asiedu</h3>
              <p style={{ color: 'green' }}>Founder & CEO of Castor Care Ghana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Modal */}
      {showOverlay && (
        <div 
          className="overlay" 
          onClick={closeOverlay}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
        >
          <div 
            className="founder-popup" 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '12px',
              marginTop: '12%',
              maxWidth: '1000px',
              maxHeight: '90vh',
              width: '100%',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <button 
              onClick={closeOverlay}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#999'
              }}
            >
              &times;
            </button >
           <div 
  className="founder-header" 
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '40px',
    padding: '20px',
    textAlign: 'left'
  }}
>
  {/* Text Section */}
  <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
    <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#2e7d32' }}>About Kwaku Anim-Asiedu</h2>
    <h5 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '500', color: '#555' }}>
      Founder & CEO of Castor Care Ghana
    </h5>
    <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#333' }}>
      Kwaku Anim-Asiedu is the visionary behind Castor Care Ghana. With a passion for sustainable agriculture and rural development, 
      he has empowered thousands of Ghanaian farmers through access to quality inputs, training, and technology. His dedication to 
      empowering communities and promoting sustainable practices has positioned Castor Care Ghana as a leading force in the agricultural 
      sector. He is a visionary leader who is committed to making a positive impact in the agricultural world. An award-winning entrepreneur, 
      Kwaku has been recognized for his innovative approaches to solving agricultural challenges. A family man of two beautiful daughters, 
      he is a passionate advocate for the well-being of farmers, farmer cooperatives, and the agricultural sector in general.
    </p>
  </div>

  {/* Image Section */}
  <img
    src={h3}
    alt="Kwaku Anim-Asiedu"
    style={{
      flex: '1 1 300px',
      width: '100%',
      maxWidth: '500px',
      height: '500px',
      objectFit: 'cover',
      borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
    }}
  />
</div>

        </div>
        </div>
      )}
    </div>
  );
};

export default Content;
