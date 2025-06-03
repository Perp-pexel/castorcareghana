import React from 'react'
import ser1 from '../assets/ser1.jpg'
import ser2 from '../assets/ser2.avif'
// import s12 from '../assets/s12.jpg'
import h1 from '../assets/team/h1.jpg'
import h2 from '../assets/team/h2.jpg'
import '../App.css'

const Service = () => {
  return (
    <div>
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', color: '#333', marginTop: '5%' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#28a745' }}> Our Services</h1>
      <p style={{ fontSize: '16px', marginBottom: '30px' }}>
        We offer a wide range of services to meet your needs.
      </p>

      <div style={{display: 'flex',flexWrap: 'wrap',gap: '40px',marginBottom: '50px'}}>
        
  <div style={{ position: 'relative', width: '700px', height: '500px', marginTop: '5px' }}>

  <img
    src={ser1}
    alt="Service 1"
    style={{
      position: 'absolute',
      top: '0',
      right: '60px',
      width: '320px',
      height: '420px',
      objectFit: 'cover',
      borderRadius: '12px',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',zIndex: 1,
      transform: 'translateY(10px)',
      transition: 'transform 03s ease'}}
  />

  
  <img
    src={ser2}
    alt="Service 2"
    style={{
      position: 'absolute',
      top: '50px',
      left: '20px',
      width: '320px',
      height: '450px',
      objectFit: 'cover',
      borderRadius: '12px',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
      zIndex: 2, 
      transform: 'translateY(-10px)',
      transition: 'transform 0.3s ease'}}
  />
</div>

       
        <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#218838' }}>🎯 Key Objective</h2>
          <p>
            At Castor Care Ghana, our services are designed to address the challenges faced by farmers,
            traders, and consumers in the food industry. We are committed to achieving these objectives
            through innovative solutions and partnerships.
          </p>
          <p>We aim to:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>✅ Improve supply chain efficiency</li>
            <li>✅ Increase farmer income</li>
            <li>✅ Reduce post-harvest losses</li>
            <li>✅ Enhance food safety and quality control</li>
          </ul>
        </div>
      </div>

     
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '26px', marginBottom: '25px', color: '#28a745' }}>💡 Why Choose Us</h2>
        
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '30px'}}>
          
          <div style={{flex: '1 1 300px',background: '#f9f9f9',borderLeft: '6px solid #dc3545',padding: '20px',borderRadius: '10px',boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
            <h3 style={{ fontSize: '20px', color: '#dc3545' }}>🚨 Problem Statement</h3>
            <p>Ghana’s food supply chain is plagued by inefficiencies, including:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>❌ Lack of transparency and accountability</li>
              <li>❌ Inadequate tracking and tracing of products</li>
              <li>❌ High post-harvest losses</li>
              <li>❌ Inefficient payment systems</li>
              <li>❌ Limited access to market information</li>
              <li>❌ Food safety concerns</li>
            </ul>
          </div>

          
          <div style={{flex: '1 1 300px',background: '#f0fff5',borderLeft: '6px solid #28a745',padding: '20px',borderRadius: '10px',boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
            <h3 style={{ fontSize: '20px', color: '#28a745' }}>✅ Our Solution</h3>
            <p>We offer a blockchain-based platform that:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>🔒 Ensures transparent and tamper-proof data management</li>
              <li>📦 Enables real-time tracking and tracing from farm to table</li>
              <li>💰 Streamlines payment processes and reduces transaction costs</li>
              <li>📊 Provides actionable market insights</li>
              <li>🥗 Enhances food safety and quality control</li>
              <li>🆔 Adds unique traceability to each commodity</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ margin: '0 50px ', marginTop: '7%', height: '550px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', alignItems: 'center', textAlign: 'center' }}> 
        <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#28a745' }}>What We Do</h1>
        <p style={{ fontSize: '15px', margin: '30px 180px', color: '#333', lineHeight: '1.6' }}>At Castor Care Ghana, we leverage technology to transform the agricultural landscape. Our platform connects farmers, traders, and consumers, ensuring a more efficient and transparent food supply chain.</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '50px', padding: '20px', marginRight: '20px'}}>
          <div className='service-card'>
            <img className='service-img' src={h2} alt="" />
            <h1 className='service-title'>Empower Farmers</h1>
            <p className='service-description'>We empower farmers with access to markets and fair prices.</p>
            <p className='service-quote'>Agriculture is our priority.</p>
          </div>
          <div className='service-card'>
            <img className='service-img' src={h2} alt="" />
            <h1 className='service-title'>Support Traders</h1>
            <p className='service-description'>We provide traders with real-time market data and analytics.</p>
            <p className='service-quote'>Trade with confidence.</p>
          </div>
          <div className='service-card'>
            <img className='service-img' src={h1} alt="" />
            <h1 className='service-title'>Serve Consumers</h1>
            <p className='service-description'>We ensure consumers receive safe and high-quality food products.</p>
            <p className='service-quote'>Your health is our priority.</p>
          </div>
          <div className='service-card'>
            <img className='service-img' src={h1} alt="" />
            <h1 className='service-title'>Promote Sustainability</h1>
            <p className='service-description'>We promote sustainable agricultural practices.</p>
            <p className='service-quote'>For a greener future.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Service
