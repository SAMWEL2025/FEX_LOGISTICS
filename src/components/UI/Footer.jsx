import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="src/assets/fexlogistics-logo.jpg" 
                alt="Fex Logistics Logo" 
                className="h-12"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Dynamic and innovative logistics solutions tailored for businesses of all sizes.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-300 text-white"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-300 text-white"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-300 text-white"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-300 text-white"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-300 text-white"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-red-600">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Quote
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Location
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Tracking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Our Services */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-red-600">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/quote/express-international" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Express International
                </Link>
              </li>
              <li>
                <Link to="/quote/cargo-shipping" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Cargo Shipping
                </Link>
              </li>
              <li>
                <Link to="/quote/ecommerce" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link to="/quote/local-delivery" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Local Delivery
                </Link>
              </li>
              <li>
                <Link to="/quote/b2b-logistics" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  B2B Logistics
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-red-600">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-red-600 transition-colors duration-300 hover:pl-1 inline-block no-underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Notice */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Fex Logistics. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;