import React from 'react';
import m5 from '../assets/m5.jpg';
import s6 from '../assets/s6.jpg';
import g1 from '../assets/g1.webp';
import Team from '../components/Team';
import '../App.css';

const About = () => {
  return (
    <div style={{ marginTop: '7%' }}>
      {/* OUR STORY SECTION */}
      <section style={{ display: 'flex', flexWrap: 'wrap', padding: '40px', gap: '30px', margin: '20px', }}>

  <div style={{ flex: '1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
    <img src={m5} alt="Our Story" style={{ width: '100%', height: '300px', objectFit: 'cover', gridColumn: 'span 2', borderRadius: '10px' }} />
    <img src={s6} alt="Harvest in action" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
    <img src={g1} alt="Sacks of produce" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
  </div>

        <div style={{ flex: '1 1 45%', lineHeight: '1.8', fontSize: '16px', color: '#333' }}>
          <h1 style={{ color: '#800020', fontSize: '30px', marginBottom: '20px' }}>Our Story</h1>
          <p>Castor Care Ghana Ltd is a company focused on changing the agriculture sector. We have evolved into a growing enterprise dedicated to transforming lives and landscapes. Our company specializes in commodity trading like Soya bean, Maize and Shea nut to both local markets and export needs. We also train smallholder farmers in financial literacy and good agriculture practices. We’re proud to have expanded our portfolio to include trading in other commodities including Cashew, Tiger Nuts and Ginger.</p>
          <p>At Castor Care Ghana, we prioritize community needs, social responsibility and environmental sustainability. We’re dedicated to making a significant contribution to the United Nations Sustainable Development Goals (UN SDGs) 1,2, 3, 5, 8, 9, and 12. Our mission includes developing a robust impact measurement metric to assess and enhance our contributions to environmental, social and economic goals.</p>
          <p>Castor Care Ghana’s cutting-edge Agri-tech Solution, harnessing Technology to optimize the farm-to-table supply chain. This innovation ensures transparency, traceability and accountability which empowers farmers, suppliers and consumers. As a key player in the agricultural sector, we’re striving to make a positive impact both locally and globally.</p>
        </div>
      </section>

      {/* VISION, MISSION, VALUES SECTION */}
      <section style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 20px', gap: '50px',flexWrap: 'nowrap', margin: '50px'}}>
        <div className='statement'>
          <h2 style={{ color: '#006400', marginBottom: '10px' }}>Our Vision</h2>
          <p>At Castor Care Ghana, we envision a future where technology and agriculture work hand in hand to create sustainable and efficient food systems. We aim to empower farmers, enhance food security, and promote responsible consumption through innovative solutions.</p>
        </div>

        <div className='statement'>
          <h2 style={{ color: '#006400', marginBottom: '10px' }}>Our Mission</h2>
          <p>Our mission is to revolutionize the agricultural landscape by providing cutting-edge technology solutions that optimize the farm-to-table supply chain. We are committed to fostering sustainable practices, enhancing food security, and empowering communities through education and innovation.</p>
        </div>

        <div className='statement'>
          <h2 style={{ color: '#006400', marginBottom: '10px' }}>Our Values</h2>
          <p>At Castor Care Ghana, we believe in:</p>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li>Quality</li>
            <li>Transparency</li>
            <li>Responsible Practices</li>
            <li>Sustainability</li>
          </ul>
        </div>
      </section>

      

      <div>
         <Team/>
      </div>
     
    </div>
  );
};

export default About;
