import React from 'react';
import logo2 from '../assets/logo2.png';
import '../App.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok, FaWhatsapp, } from 'react-icons/fa';
import absa from '../assets/absa.png';
import mestafrica from '../assets/mestafrica.jpg';

const Footer = () => {
  return (
    <div>
      <footer style={{backgroundColor: '#2e2e2e',color: '#fff',padding: '40px 20px', marginTop: '100px'}}>

        <div className="footer-container" style={{display: 'flex',flexWrap: 'wrap',justifyContent: 'space-between',alignItems: 'flex-start',gap: '20px',maxWidth: '1200px',margin: '0 auto',textAlign: 'left'}}>

          {/* Logo and Intro */}
          <div className="footer-logo" style={{ flex: '1', minWidth: '300px' }}>
            <img src={logo2} alt="Castor Care Ghana Logo" style={{ width: '80%', objectFit: 'cover', marginBottom: '5px' }} />
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              Castor Care Ghana Ltd is a company focused on changing the agriculture sector.
              We have evolved into a growing enterprise dedicated to transforming lives and landscapes…
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links" style={{ flex: '1', minWidth: '150px', marginLeft: '100px' }}>
            <h3 style={{ marginBottom: '20px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: '10px 0' }}>
              <li><a href="/" className='link-style'>Home</a></li>
              <li><a href="/about" className='link-style'>About</a></li>
              <li><a href="/contact" className='link-style'>Contact</a></li>
            </ul>
          </div>

          {/* Info */}
          <div className="footer-info" style={{ flex: '1', minWidth: '150px' }}>
            <h3 style={{ marginBottom: '20px' }}>Information</h3>
            <ul style={{ listStyle: 'none', padding: '10px 0' }}>
              <li><a href="/service" className='link-style'>Service</a></li>
              <li><a href="/product" className='link-style'>Product</a></li>
              <li><a href="/blog" className='link-style'>Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact" style={{ flex: '1', minWidth: '350px' }}>
            <h3 style={{ marginBottom: '10px' }}>Contact Us</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a className='link-style' href="tel:+233550000000" target='_blank' rel="noopener noreferrer"><FaPhone /> +233 55 000 0000</a></li>
              <li><a className='link-style' href="https://wa.me/233247494088" target='_blank' rel="noopener noreferrer"><FaWhatsapp style={{ fontSize: '21px', fontWeight: 'xx-bold' }} /> +233 247 494 088</a></li>
              <li><a className='link-style' href="mailto: info@castorcareghana.com" target='_blank' rel="noopener noreferrer"><FaEnvelope /> info@castorcareghana.com</a></li>
              <li><a className='link-style' href="https://maps.app.goo.gl/Lo3ogKrLVpQu8Ru99" target='_blank' rel="noopener noreferrer"><FaMapMarkerAlt /> 117 Haatso-Atomic Rd, Accra, Ghana</a></li>
            </ul>
            <p style={{ marginTop: '10px' }}>Follow us on</p>
            <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
              <a className='social-icon' href="https://www.facebook.com/castorcareghana" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a className='social-icon' href="https://www.instagram.com/castorcareghana" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a className='social-icon' href="https://www.linkedin.com/company/castor-care-ghana" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a className='social-icon' href="https://www.twitter.com/castorcareghana" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a className='social-icon' href="https://www.youtube.com/@castorcareghana" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a className='social-icon' href="https://www.tiktok.com/@castorcareghana" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            </div>
          </div>
        </div>


        {/* Bottom Footer */}

        <div className="footer-bottom" style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '15px', fontSize: '14px' }}>
          <p>&copy; {new Date().getFullYear()} Castor Care Ghana. All rights reserved.</p>
          <p>
            Powered by 
           <a href="https://www.absa.com.gh/business/absa-young-africa-works-programme/" target="_blank" rel="noopener noreferrer"><img src={absa} alt="" style={{ width: '25px', marginLeft: '5px' }} /></a> 
           <a href="https://vc4a.com/mest/" target="_blank" rel="noopener noreferrer"><img src={mestafrica} alt="Your Design Company Logo" style={{ width: '25px', marginLeft: '5px' }} /></a>

          </p>
        </div>
      </footer>
    </div>
  );
};


export default Footer;
