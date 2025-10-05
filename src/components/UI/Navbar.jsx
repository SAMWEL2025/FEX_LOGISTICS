import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Quote', path: '/quote' },
    { name: 'Location', path: '/location' },
    { name: 'Tracking', path: '/auth/login' },
    { name: 'Book Shipment', path: '/auth/signup' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="src/assets/fexlogistics-logo.jpg" 
                alt="Fex Logistics Logo" 
                className="h-8 md:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-6">
              <ul className="flex items-center space-x-4 lg:space-x-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-white dark:text-gray-200 font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-0.5 after:bg-red-600 dark:after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth Links & Dark Mode Toggle - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <DarkModeToggle size="sm" />
              
              <Link 
                to="/auth/login" 
                className="px-3 py-1 text-white dark:text-gray-200 text-sm font-medium border border-white/30 dark:border-gray-600 rounded hover:text-red-600 dark:hover:text-red-400 hover:border-red-600 dark:hover:border-red-400 transition-colors duration-300"
              >
                Login
              </Link>
              <Link 
                to="/auth/signup" 
                className="px-3 py-1 bg-red-600 dark:bg-red-500 text-white text-sm font-medium rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button & Dark Mode */}
            <div className="md:hidden flex items-center space-x-2">
              <DarkModeToggle size="sm" />
              <button 
                className="text-white dark:text-gray-200 text-xl focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5">
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 text-white text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Logo in Mobile Menu */}
          <Link to="/" className="flex items-center mb-6 pb-4 border-b border-white/10" onClick={closeMenu}>
            <img 
              src="src/assets/fexlogistics-logo.jpg" 
              alt="Fex Logistics Logo" 
              className="h-8"
            />
          </Link>

          {/* Mobile Navigation Links */}
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="block px-4 py-3 text-white font-medium rounded hover:bg-red-600/10 hover:text-red-600 dark:hover:text-red-400 hover:pl-6 transition-all duration-300"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Links */}
          <div className="mt-6 space-y-3">
            <Link 
              to="/auth/login" 
              className="block px-4 py-3 text-white dark:text-gray-200 font-medium border border-white/30 dark:border-gray-600 rounded text-center hover:text-red-600 dark:hover:text-red-400 hover:border-red-600 dark:hover:border-red-400 transition-colors duration-300"
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link 
              to="/auth/signup" 
              className="block px-4 py-3 bg-red-600 dark:bg-red-500 text-white font-medium rounded text-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Spacer for Desktop View Only */}
      <div className="hidden md:block h-16"></div>
    </>
  );
};

export default Navbar;

