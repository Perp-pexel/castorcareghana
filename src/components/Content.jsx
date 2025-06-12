import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s1 from '../assets/s1.jpg';
import t5 from '../assets/t5.webp';
import founder from '../assets/founder.jpg';
import h3 from '../assets/team/h3.jpg';
import c6 from '../assets/c6.webp';
import g4 from '../assets/g4.webp';
import n2 from '../assets/n2.jpeg';
import m6 from '../assets/m6.png';
import s2 from '../assets/s2.jpg';
import t4 from '../assets/t4.jpg';
import o8 from '../assets/o8.webp';
import so4 from '../assets/so4.png';
import '../App.css';

const ProductCard = ({ img, title, description }) => (
  <div className="product-card" style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    maxWidth: '500px',
    width: '90%',
    margin: '0 auto'
  }}>
    <div style={{ flex: '0 0 70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={img} alt={title} style={{
        width: '70px',
        height: '70px',
        objectFit: 'cover',
        borderRadius: '8px'
      }} />
    </div>
    <div style={{ flex: '1', marginLeft: '20px', maxWidth: '320px' }}>
      <div style={{ fontSize: '18px', fontWeight: '600', color: 'green', marginBottom: '8px' }}>{title}</div>
      <p style={{ fontSize: '13px', color: '#555', textAlign: 'justify', lineHeight: '1.4' }}>{description}</p>
    </div>
  </div>
);

const Content = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openOverlay = () => setShowOverlay(true);
  const closeOverlay = () => setShowOverlay(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const productList = [
    { img: c6, title: "Cashew Nuts", description: "Cashew kernels are nutrient-rich, kidney-shaped seeds from the tropical cashew tree, valued for both their taste and health benefits." },
    { img: g4, title: "Ginger", description: "Ginger is a Southeast Asian plant known for its root, widely used as a spice and traditional medicine in global cuisines." },
    { img: n2, title: "Ground Nut", description: "Groundnuts, or peanuts, are protein-rich underground seeds valued for their healthy fats and nutrients." },
    { img: m6, title: "Maize", description: "Maize, or corn, is an ancient cereal grain and global staple, widely used for food, animal feed, and industry." },
    { img: s2, title: "Shea Nuts", description: "Shea nuts are fat-rich seeds from West Africa's shea tree, used to make shea butter for cosmetics and skincare." },
    { img: t4, title: "Tiger Nuts", description: "Tiger nuts are nutrient-rich underground tubers high in fiber and healthy fats, enjoyed as a wholesome snack." },
    { img: so4, title: "Soya Beans", description: "Soya beans are a type of legume widely grown for their edible bean, a significant source of protein and oil." },
    { img: o8, title: "Castor", description: "Castor is a plant known for oil-rich seeds used in medicine, cosmetics, and industry. Its oil has many benefits." }
  ];

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
      <div className='target-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '20px', margin: '100px 0' }}>
        <div className='target' style={{ width: '40%', padding: '10px 55px', borderRight: '2px solid #90ee90', minWidth: '300px' }}>
          <h4>Our Target Market</h4>
          <h2 style={{ color: 'green' }}> We are committed to working with key stakeholders across the agricultural value chain, including:</h2>
          <ul>
            <li>Farmers and farmer cooperatives</li>
            <li>Food processors and manufacturers</li>
            <li>Local and international buyers</li>
            <li>Regulatory bodies and certification agencies</li>
          </ul>
        </div>
        <div className='target' style={{ width: '40%', padding: '10px 55px', borderLeft: '2px solid #90ee90' }}>
          <p>At Castor Care Ghana our mission is to revolutionize the agricultural landscape by providing cutting-edge technology solutions that optimize the farm-to-table supply chain.</p>
          <div className='founder-container' onClick={openOverlay} style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', marginTop: '20px' }}>
            <img className='founder-style' style={{ width: '100px', height: '100px', borderRadius: '50%' }} src={founder} alt="founder" />
            <div className='founder-text' style={{ lineHeight: '0.8' }}>
              <h3>Kwaku Anim-Asiedu</h3>
              <p style={{ color: 'green' }}>Founder & CEO of Castor Care Ghana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Overlay */}
      {showOverlay && (
        <div className="overlay" onClick={closeOverlay} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div className="founder-popup" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', padding: '30px', borderRadius: '12px', marginTop: '12%', maxWidth: '1000px', maxHeight: '90vh', width: '100%', boxShadow: '0 8px 16px rgba(0,0,0,0.3)', position: 'relative' }}>
            <button onClick={closeOverlay} style={{ position: 'absolute', top: '10px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>&times;</button>
            <div className="founder-header" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '40px', marginBottom: '40px', padding: '20px', textAlign: 'left' }}>
              <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#2e7d32' }}>About Kwaku Anim-Asiedu</h2>
                <h5 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: '500', color: '#555' }}>Founder & CEO of Castor Care Ghana</h5>
                <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#333' }}>
                  Kwaku Anim-Asiedu is the visionary behind Castor Care Ghana. With a passion for sustainable agriculture and rural development, he has empowered thousands of Ghanaian farmers through access to quality inputs, training, and technology. His dedication to empowering communities and promoting sustainable practices has positioned Castor Care Ghana as a leading force in the agricultural sector.
                </p>
              </div>
              <img src={h3} alt="Kwaku Anim-Asiedu" style={{ flex: '1 1 300px', width: '100%', maxWidth: '500px', height: '500px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      )}

      {/* Product Section */}
      <div style={{ padding: '40px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '28px', color: '#333', marginBottom: '40px' }}> Commodities Traded</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          justifyItems: 'center'
        }}>
          {productList.map((product, index) => (
            <div key={index} onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
              <ProductCard img={product.img} title={product.title} description={product.description} />
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div onClick={closeProductModal} style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#fff',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '30%',
            maxHeight: '85%',
            overflowY: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <button onClick={closeProductModal} style={{
              position: 'absolute',
              top: '15px',
              right: '25px',
              fontSize: '1.5rem',
              background: 'transparent',
              border: 'none',
              color: '#555',
              cursor: 'pointer'
            }}>&times;</button>
            <img src={selectedProduct.img} alt={selectedProduct.title} style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '20px'
            }} />
            
            <h2 style={{ color: 'green' }}>{selectedProduct.title}</h2>
            <p style={{ fontSize: '1rem', color: '#333', lineHeight: '1.6' }}>{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
