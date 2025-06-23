import React from 'react';
import logo2 from '../assets/logo2.png';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-5 py-10 mt-24">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8 text-left">

        {/* Logo and Intro */}
        <div className="flex-1 min-w-[300px]">
          <img src={logo2} alt="Castor Care Ghana Logo" className="w-4/5 object-cover mb-2" />
          <p className="text-sm leading-relaxed">
            Castor Care Ghana Ltd is a company focused on changing the agriculture sector.
            We have evolved into a growing enterprise dedicated to transforming lives and landscapes…
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[150px] ml-10">
          <h3 className="mb-5 font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-500">Home</a></li>
            <li><a href="/about" className="hover:text-green-500">About</a></li>
            <li><a href="/contact" className="hover:text-green-500">Contact</a></li>
          </ul>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="mb-5 font-semibold text-lg">Information</h3>
          <ul className="space-y-2">
            <li><a href="/service" className="hover:text-green-500">Service</a></li>
            <li><a href="/product" className="hover:text-green-500">Product</a></li>
            <li><a href="/blog" className="hover:text-green-500">Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-row min-w-[350px]">
          <h3 className="mb-2 font-semibold text-lg">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+233244185012" className="flex items-center gap-2 hover:text-green-500"><FaPhone /> +233 244 185 012</a></li>
            <li><a href="https://wa.me/233247494088" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-500"><FaWhatsapp className="text-lg" /> +233 247 494 088</a></li>
            <li><a href="mailto:info@castorcareghana.com" className="flex items-center gap-2 hover:text-green-500"><FaEnvelope /> info@castorcareghana.com</a></li>
            <li><a href="https://maps.app.goo.gl/Lo3ogKrLVpQu8Ru99" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-500"><FaMapMarkerAlt /> 117 Haatso-Atomic Rd, Accra, Ghana</a></li>
          </ul>
          <p className="mt-4">Follow us on</p>
          <div className="flex gap-4 mt-2 text-lg">
            <a href="https://www.facebook.com/profile.php?id=61573519845973" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaFacebook /></a>
            <a href="https://www.instagram.com/castorcareghana?igsh=MWlydHZhanB0MGkyZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/castor-care-ghana" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaLinkedin /></a>
            <a href="https://www.tiktok.com/@castorcareghana?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaTiktok /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 pt-4 border-t border-gray-600 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Castor Care Ghana. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
