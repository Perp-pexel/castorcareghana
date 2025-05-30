import React from 'react';
import s1 from '../assets/s1.jpg';
import t5 from '../assets/t5.webp';
import founder from '../assets/founder.jpg'
import '../App.css';

const Content = () => {

  return (
    <div>
      <section className='section-style'>
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
            <a href="./about" className='more'>Read More <span>→</span></a>
          </div>
          <img src={t5} alt="about" className='img-style' />
        </div>
      </section>

      

      <section className='section-style'>
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
            <a href="./service" className='more'>Read More <span>→</span></a>
          </div>
        </div>
      </section>

      <section>
        <div className='target-container' style={{display:'flex', flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:'20px',padding:'20px',}}>
          <div className='target' style={{width:'40%',padding:'10px 55px',borderRight:'2px solid #90ee90'}}>
            <h4>Our Target Market</h4>
            <h2 style={{ color:'green'}}> We are committed to working with key stakeholders across the agricultural value chain, including:</h2>
            <ul>
              <li>Farmers and farmer cooperatives</li>
              <li>Food processors and manufacturers</li>
              <li>Local and international buyers</li>
              <li>Regulatory bodies and certification agencies</li>
            </ul>
          </div>
          <div className='target' style={{width:'40%',padding:'10px 55px', borderLeft:'2px solid #90ee90'}}>
            <p>At Castor Care Ghana our mission is to revolutionize the agricultural landscape by providing cutting-edge technology solutions that optimize the farm-to-table supply chain.</p>

            <div className='founder-container' style={{display:'flex',alignItems:'center',gap:'20px'}}>
            <img className='founder-style' style={{width:'100px',height:'100px',borderRadius:'50%'}} src={founder} alt="founder" />
            <div className='founder-text' style={{lineHeight:'0.5'}}> 
            <h1>Kwaku Anim-Asiedu</h1>
            <p style={{color:'green'}}>Founder & CEO of Castor Care Ghana</p>
            </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );    
};

export default Content;

