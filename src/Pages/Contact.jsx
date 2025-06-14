import React from 'react';
import {FaPhone,FaEnvelope,FaFacebook,FaInstagram,FaTwitter,FaWhatsapp,FaLinkedin,FaYoutube,FaTiktok} from 'react-icons/fa';
import contact from '../assets/contact.jpg';
import '../App.css';
import Nav from '../components/Nav.jsx';


const Divider = () => (
  <div style={{
    height: '25px',
    width: '1px',
    backgroundColor: '#ccc'
  }} />
);

const Contact = () => {
  return (
    <div>
    <Nav/>
    
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', marginTop: '5%' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Get in Touch</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        We’d love to hear from you! Please fill out the form below.
      </p>

      {/* First Row: Form overlayed on Image */}
      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', marginBottom: '60px' }}>
        {/* Image (wider than before) */}
        <div style={{ flex: '1 1 100%', position: 'relative' }}>
          <img src={contact} alt="Contact" style={{ width: '60%',height: '650px', objectFit: 'cover', borderRadius: '10px', marginLeft: '35%' }}/>

          {/* Overlayed Form - 5% over the left side of the image */}
          <div
            style={{
              position: 'absolute',top: '10%',left: '5%',width: '45%',backgroundColor: 'rgba(255, 255, 255, 0.95)',padding: '30px', borderRadius: '10px',borderTop: '2px solid green',boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            <h2>Contact Form</h2>
            <form>
              <div className='form-style'>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" className='input-style'/>
              </div>
              <div className='form-style'>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className='input-style' />
              </div>
              <div className='form-style'>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required className='input-style' />
              </div>
              <button type="submit" className='button-style'>Submit</button>
            </form>
          </div>
        </div>
      </div>

      
      <div>
        {/* Contact Info */}
        <div style={{ flex: '1 1 40%', maxWidth: '700px' }}>
  <div
    style={{
      backgroundColor: '#fff',padding: '30px',borderRadius: '10px',boxShadow: '0 4px 10px rgba(0,0,0,0.1)',fontSize: '20px'
    }}
  >
    <h3 style={{ marginBottom: '20px' }}>Contact Info</h3>

    {/* Contact Row with Dividers */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
      {/* Phone */}
      <a href="tel:+233244185012" target="_blank" rel="noopener noreferrer" className='contact-style'>
        <FaPhone className='icon-color' /> +233 244 185 012
      </a>

      <Divider />

      {/* WhatsApp */}
      <a className='contact-style' href="https://wa.me/233247494088" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className='icon-color' style={{ fontSize: '21px', fontWeight: 'xx-bold' }} /> +233 247 494 088
      </a>

      <Divider />

      {/* Email */}
      <a className='contact-style' href="mailto:info@castorcareghana.com" target="_blank" rel="noopener noreferrer">
        <FaEnvelope className='icon-color' /> Email Us
      </a>

      {/* <Divider /> */}

      {/* Social Icons */}
      <div style={{alignItems: 'center', gap: '20px' }}>
      <p>Follow Us:</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <a className="social-style" href="https://facebook.com/castorcareghana" target="_blank" rel="noopener noreferrer" ><FaFacebook /></a>
        <a className="social-style" href="https://instagram.com/castorcareghana" target="_blank" rel="noopener noreferrer" ><FaInstagram /></a>
        <a className="social-style" href="https://linkedin.com/company/castor-care-ghana" target="_blank" rel="noopener noreferrer" ><FaLinkedin /></a>
        <a className="social-style" href="https://youtube.com/@castorcareghana" target="_blank" rel="noopener noreferrer" ><FaYoutube /></a>
        <a className="social-style" href="https://tiktok.com/@castorcareghana" target="_blank" rel="noopener noreferrer" ><FaTiktok /></a>
        <a className="social-style" href="https://twitter.com/castorcareghana" target="_blank" rel="noopener noreferrer" ><FaTwitter /></a>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Map */}
<div style={{ margin: '0 20px', alignItems: 'right', justifyContent: 'right' }}>
  <h2 style={{ textAlign: 'right', marginTop: '5%', marginRight: '25%', fontSize: '30px' }}>
    Our Location
  </h2>
  <div
    style={{
      flex: '1 1 55%',
      minWidth: '500px',
      borderRadius: '10px',
      overflow: 'hidden',
    }}
  >
   <iframe
  title="Castor Care Ghana Location"
  width="100%"
  height="100%"
  style={{
    minHeight: '350px',
    maxWidth: '70%',
    border: 0,
    borderRadius: '10px',
    marginLeft: '30%',
  }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2171021226123!2d-0.212714!3d5.6672902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c3e0687f697%3A0xa720b1306c1af02d!2s117%20Haatso-Atomic%20Rd%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1717264156344!5m2!1sen!2sgh"
>
  </iframe>
  </div>
</div>

    </div>
  </div>
  <footer className="footer">© 2025 Castor Care. All rights reserved.</footer>
  </div>
  );
};


export default Contact;
