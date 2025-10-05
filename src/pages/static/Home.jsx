import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShippingFast, 
  faEye, 
  faCheckCircle, 
  faGlobeAmericas, 
  faCubes, 
  faShoppingCart, 
  faMapMarkedAlt, 
  faRoad, 
  faHandshake, 
  faHome,
  faArrowRight,
  faArrowUp,
  faChevronDown,
  faEnvelope,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  // State for FAQ accordion
  const [activeFaq, setActiveFaq] = useState(null);
  
  // State for animated counters
  const [counters, setCounters] = useState({
    deliveries: 0,
    satisfaction: 0,
    support: 0,
    locations: 0
  });

  // State for email subscription
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isExpandedAbout, setIsExpandedAbout] = useState(false);
  const [isExpandedVision, setIsExpandedVision] = useState(false);

  // State for hero slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs for intersection observer
  const statsRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  // Hero slider data
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      headline: "Reliable Courier Services for Your Business",
      subtext: "Dynamic and innovative logistics solutions tailored for small, medium, and large enterprises. Swift delivery and customer satisfaction guaranteed.",
      ctaLink: "/auth/login"
    },
    {
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      headline: "Global Logistics Network",
      subtext: "Connecting businesses worldwide with our extensive logistics network and reliable delivery services across international borders.",
      ctaLink: "/contact"
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      headline: "Express Delivery Solutions",
      subtext: "Fast and secure delivery services for your packages. Real-time tracking and guaranteed delivery times for complete peace of mind.",
      ctaLink: "/quote"
    },
    {
      image: "https://images.unsplash.com/photo-1589829515890-73745e9475e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      headline: "E-commerce Logistics",
      subtext: "Specialized logistics solutions designed for online retailers. Streamline your delivery process and enhance customer satisfaction.",
      ctaLink: "/services"
    }
  ];

  // Toggle FAQ accordion
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Handle email subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed email:', email);
    setSubscribed(true);
    setEmail('');
    
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  // Animate counters when stats section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setCounters(prev => {
              const newValues = { ...prev };
              
              if (newValues.deliveries < 4000) newValues.deliveries += 40;
              if (newValues.satisfaction < 100) newValues.satisfaction += 1;
              if (newValues.support < 24) newValues.support += 1;
              if (newValues.locations < 50) newValues.locations += 1;
              
              return newValues;
            });
          }, 50);
          
          setTimeout(() => {
            clearInterval(interval);
            setCounters({
              deliveries: 4000,
              satisfaction: 100,
              support: 24,
              locations: 50
            });
          }, 2000);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Slider auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500); // Half of the transition duration for smoother effect
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Scroll animations
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = [
        { ref: aboutRef, class: 'animate-fade-in-up' },
        { ref: servicesRef, class: 'animate-fade-in-up' },
        { ref: faqRef, class: 'animate-fade-in-up' },
        { ref: ctaRef, class: 'animate-fade-in-up' }
      ];

      elements.forEach(({ ref, class: className }) => {
        if (ref.current) {
          const element = ref.current;
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;

          if (elementPosition < screenPosition) {
            element.classList.add(className);
          }
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  // FAQ data
  const faqs = [
    {
      question: "What areas do you cover for local delivery?",
      answer: "We cover all areas within Lagos and its surrounding suburbs for local delivery. Our network is constantly expanding to serve more locations."
    },
    {
      question: "How long does international delivery take?",
      answer: "International delivery times vary depending on the destination. Typically, express international deliveries take 3-7 business days, while standard international shipping takes 7-14 business days."
    },
    {
      question: "Do you offer tracking for all shipments?",
      answer: "Yes, we provide real-time tracking for all shipments. You can track your package using the tracking number provided at the time of booking through our website or mobile app."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfers, credit/debit cards, mobile payments, and cash on delivery for eligible services."
    },
    {
      question: "How can I schedule a pickup?",
      answer: "You can schedule a pickup by calling our customer service, using our website, or through our mobile app. Simply provide the pickup details, preferred time, and our team will arrange the rest."
    }
  ];

  // Services data
  const services = [
    {
      icon: faGlobeAmericas,
      title: "Express International",
      description: "Fast and reliable international delivery services to major destinations worldwide."
    },
    {
      icon: faCubes,
      title: "Cargo Shipping",
      description: "Secure and efficient cargo shipping solutions for businesses of all sizes."
    },
    {
      icon: faShoppingCart,
      title: "E-commerce",
      description: "Specialized logistics solutions designed for online retailers and e-commerce platforms."
    },
    {
      icon: faMapMarkedAlt,
      title: "Local Delivery Service",
      description: "Swift and reliable local delivery services within Lagos and surrounding areas."
    },
    {
      icon: faRoad,
      title: "Interstate Delivery",
      description: "Efficient delivery services connecting all states across Nigeria."
    },
    {
      icon: faHandshake,
      title: "B2B Logistics",
      description: "Comprehensive business-to-business logistics solutions tailored to your needs."
    },
    {
      icon: faHome,
      title: "Relocation",
      description: "Hassle-free relocation services for homes and offices with utmost care."
    }
  ];

  // Core values data
  const coreValues = [
    {
      title: "Speed",
      description: "We prioritize swift delivery to ensure your packages reach their destination on time, every time."
    },
    {
      title: "Agility",
      description: "We adapt quickly to changing needs and circumstances, providing flexible solutions for our clients."
    },
    {
      title: "Secure",
      description: "We ensure the safety and security of all shipments with robust tracking and handling protocols."
    },
    {
      title: "Cost Efficient",
      description: "We offer competitive rates without compromising on service quality, providing value for money."
    },
    {
      title: "Customer-centric",
      description: "We put our customers at the center of everything we do, ensuring satisfaction at every step."
    },
    {
      title: "Innovation",
      description: "We continuously innovate and improve our services to stay ahead in the logistics industry."
    }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollButton = document.getElementById('scrollToTop');
      if (window.scrollY > 300) {
        scrollButton.classList.remove('opacity-0', 'invisible');
        scrollButton.classList.add('opacity-100', 'visible');
      } else {
        scrollButton.classList.add('opacity-0', 'invisible');
        scrollButton.classList.remove('opacity-100', 'visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section with Slider */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Slider Background */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
        </div>
        
        <div className="container mx-auto px-4 z-20 text-center relative">
          {/* Slider Content */}
          <div className="max-w-4xl mx-auto">
            {/* Headline with slide-up animation */}
            <h1 
              key={`headline-${currentSlide}`}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transform transition-all duration-500 ease-out"
              style={{
                animation: 'slideUp 0.5s forwards',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              {slides[currentSlide].headline}
            </h1>
            
            {/* Subtext with fade-in animation and delay */}
            <p 
              key={`subtext-${currentSlide}`}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 transform transition-all duration-1000 ease-out"
              style={{
                animation: 'fadeIn 0.8s forwards',
                animationDelay: '0.5s',
                opacity: 0
              }}
            >
              {slides[currentSlide].subtext}
            </p>
            
            {/* Static CTA Button */}
            <Link 
              to={slides[currentSlide].ctaLink}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Book Shipment
            </Link>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-red-600">
              Who We Are
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Who We Are */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Logistics Team" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
                  <FontAwesomeIcon icon={faShippingFast} className="mr-3" /> About Fex Logistics
                </h3>
                <p className="text-gray-600 mb-4">
                  Fex Logistics is a dynamic and innovative brand tailored towards creating sustainable courier services for all small, medium and large enterprises. We are driven by our core value and our paramount goal is providing swift delivery and customer satisfaction both locally and internationally.
                </p>
                <p className="text-gray-600 mb-6">
                  {isExpandedAbout 
                    ? "If you're looking for a partner with vast industry knowledge, best competitive rates and hassle-free door-to-door delivery internationally and to states across Nigeria, Fex Logistics would match and surpass your expectations."
                    : "If you're looking for a partner with vast industry knowledge, best competitive rates and hassle-free door-to-door delivery..."
                  }
                </p>
                <button 
                  onClick={() => setIsExpandedAbout(!isExpandedAbout)}
                  className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-300 inline-flex items-center mb-4"
                >
                  {isExpandedAbout ? 'Read less' : 'Read more'}
                </button>
                <Link 
                  to="/about" 
                  className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-300 inline-flex items-center block"
                >
                  See more <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Our Vision */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Global Logistics Network" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-600 flex items-center">
                  <FontAwesomeIcon icon={faEye} className="mr-3" /> Our Vision
                </h3>
                <p className="text-gray-600 mb-4">
                  Our driven ambition is to provide the best solution and develop the best delivery network for online and offline stores in different cities globally, tailored towards adding courier chain value.
                </p>
                <p className="text-gray-600 mb-6">
                  {isExpandedVision 
                    ? "Transforming the logistics landscape with cutting-edge delivery solutions that offer reliable and efficient services, empowering businesses to thrive and provide exceptional delivery experiences."
                    : "Transforming the logistics landscape with cutting-edge delivery solutions that offer reliable and efficient services..."
                  }
                </p>
                <button 
                  onClick={() => setIsExpandedVision(!isExpandedVision)}
                  className="text-green-600 font-semibold hover:text-green-800 transition-colors duration-300 inline-flex items-center mb-4"
                >
                  {isExpandedVision ? 'Read less' : 'Read more'}
                </button>
                <Link 
                  to="/about" 
                  className="text-green-600 font-semibold hover:text-green-800 transition-colors duration-300 inline-flex items-center block"
                >
                  See more <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div ref={statsRef} className="bg-black text-white rounded-xl p-8 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-4 transition-all duration-300 hover:transform hover:-translate-y-2">
                <span className="text-4xl md:text-5xl font-bold text-red-600 block mb-2">
                  {counters.deliveries}+
                </span>
                <div className="text-gray-300 uppercase tracking-wider">Successful Deliveries</div>
              </div>
              
              <div className="p-4 transition-all duration-300 hover:transform hover:-translate-y-2">
                <span className="text-4xl md:text-5xl font-bold text-red-600 block mb-2">
                  {counters.satisfaction}%
                </span>
                <div className="text-gray-300 uppercase tracking-wider">Satisfied Customers</div>
              </div>
              
              <div className="p-4 transition-all duration-300 hover:transform hover:-translate-y-2">
                <span className="text-4xl md:text-5xl font-bold text-red-600 block mb-2">
                  {counters.support}/7
                </span>
                <div className="text-gray-300 uppercase tracking-wider">Customer Support</div>
              </div>
              
              <div className="p-4 transition-all duration-300 hover:transform hover:-translate-y-2">
                <span className="text-4xl md:text-5xl font-bold text-red-600 block mb-2">
                  {counters.locations}+
                </span>
                <div className="text-gray-300 uppercase tracking-wider">Service Locations</div>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">Our Core Values</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-5 bg-gray-50 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:translate-x-2"
                >
                  <div className="text-green-500 text-2xl mr-4">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-red-600">
              Our Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="text-5xl text-red-600 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to="/services" 
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section ref={ctaRef} className="py-20 bg-cover bg-center bg-no-repeat relative" 
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience Reliable Logistics?</h2>
            <p className="text-xl text-gray-200 mb-10">
              Join thousands of satisfied customers who trust Fex Logistics for their delivery needs. Get started today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/quote" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Get a Quote
              </Link>
              <Link 
                to="/contact" 
                className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-red-600">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${activeFaq === index ? 'shadow-lg' : ''}`}
              >
                <button 
                  className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center hover:bg-red-50 transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`text-red-600 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Subscription Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-white mb-8">Stay updated with our latest services and offers.</p>
            
            {subscribed ? (
              <div className="bg-white text-red-600 py-4 px-6 rounded-full inline-block">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white flex-grow max-w-md border-2 border-white text-white placeholder-white"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            If you couldn't find the answer to your question, feel free to reach out to our customer support team. We're here to help!
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button 
        id="scrollToTop"
        className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300 hover:bg-red-700 z-50"
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default Home;