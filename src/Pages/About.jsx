import React from 'react'
import m5 from '../assets/m5.jpg';

const About = () => {
  return (
    <div>
      <section className='about-section' style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'20px'}}>
        <div style={{flex: '1', paddingRight: '20px'}}>
        <img src={m5} alt="Our Story" />
        <img src="" alt="" />
        </div>
         <div>
          <h1 >Our Story</h1>
          <p></p>
          <p>Castor Care Ghana Ltd is a company focused on changing the agriculture sector. We have evolved into a growing enterprise dedicated to transforming lives and landscapes. Our company specializes in commodity trading like Soya bean, Maize and Shea nut to both local markets and export needs. We also train smallholder farmers in financial literacy and good agriculture practices. We’re proud to have expanded our portfolio to include trading in other commodities including Cashew, Tiger Nuts and Ginger.
          </p>
          <p>
          At Castor Care Ghana, we prioritize community needs, social responsibility and environmental sustainability. We’re dedicated to making a significant contribution to the United Nations Sustainable Development Goals (UN SDGs) 1,2, 3, 5, 8, 9, and 12. Our mission includes developing a robust impact measurement metric to assess and enhance our contributions to environmental, social and economic goals.
           </p>
          <p>
          Castor Care Ghana’s cutting-edge Agri-tech Solution, harnessing Technology to optimize the farm-to-table supply chain. This innovation ensures transparency, traceability and accountability which empowers farmers, suppliers and consumers. As a key player in the agricultural sector, we’re striving to make a positive impact both locally and globally.
          </p>
        </div>
        </section>

        <section>
          <div>
          <h1>Our Vision</h1>
          <p>At Castor Care Ghana, we envision a future where technology and agriculture work hand in hand to create sustainable and efficient food systems. We aim to empower farmers, enhance food security, and promote responsible consumption through innovative solutions.</p>
          </div>
       

        <div>
          <h1>Our Mission</h1>
          <p>Our mission is to revolutionize the agricultural landscape by providing cutting-edge technology solutions that optimize the farm-to-table supply chain. We are committed to fostering sustainable practices, enhancing food security, and empowering communities through education and innovation.</p>
        </div>

        <div>
          <h1>Our Values</h1>
          <p>At Castor Care Ghana, we believe in:</p>
          <ul>
            <li>Quality</li>
            <li>Transparency</li>
            <li>Responsible Practices</li>
            <li>Sustainability</li>
          </ul>
        </div>
        </section>
     

    </div>
  )
}

export default About