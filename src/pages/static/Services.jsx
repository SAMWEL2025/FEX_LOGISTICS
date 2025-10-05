import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobeAmericas, 
  faCubes, 
  faShoppingCart, 
  faMapMarkedAlt, 
  faRoad, 
  faHandshake, 
  faHome,
  faArrowRight,
  faArrowLeft,
  faCheck,
  faTimes,
  faClock,
  faShieldAlt,
  faMoneyBillWave,
  faHeadset,
  faTruck,
  faBoxOpen,
  faPlane,
  faShip,
  faTrain
} from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  // State for active service
  const [activeService, setActiveService] = useState(0);
  
  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  
  // Refs for intersection observer
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const processRef = useRef(null);
  const pricingRef = useRef(null);
  const ctaRef = useRef(null);

  // Services data (expanded from Home page)
  const services = [
    {
      id: 1,
      icon: faGlobeAmericas,
      title: "Express International",
      description: "Fast and reliable international delivery services to major destinations worldwide.",
      detailedDescription: "Our Express International service connects you to over 200 countries with delivery times as fast as 1-3 business days to major global destinations. We handle all customs documentation and provide end-to-end tracking for complete peace of mind.",
      features: [
        "Delivery to 200+ countries",
        "Real-time tracking",
        "Customs clearance included",
        "1-3 business days to major destinations",
        "Insurance options available",
        "24/7 customer support"
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      icon: faCubes,
      title: "Cargo Shipping",
      description: "Secure and efficient cargo shipping solutions for businesses of all sizes.",
      detailedDescription: "Our Cargo Shipping service offers comprehensive solutions for large shipments including sea freight, air freight, and land transportation. We provide full container loads (FCL), less than container loads (LCL), and specialized cargo handling.",
      features: [
        "Sea, air, and land freight options",
        "Full container load (FCL) services",
        "Less than container load (LCL) services",
        "Specialized cargo handling",
        "Warehousing and distribution",
        "Supply chain management"
      ],
      image: "https://images.unsplash.com/photo-1596313015260-9c05d8955c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      icon: faShoppingCart,
      title: "E-commerce",
      description: "Specialized logistics solutions designed for online retailers and e-commerce platforms.",
      detailedDescription: "Our E-commerce logistics service is tailored to meet the unique needs of online businesses. We provide end-to-end solutions including order fulfillment, inventory management, and last-mile delivery to enhance your customer experience.",
      features: [
        "Order fulfillment",
        "Inventory management",
        "Last-mile delivery",
        "Returns management",
        "Integration with major e-commerce platforms",
        "Real-time delivery notifications"
      ],
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 4,
      icon: faMapMarkedAlt,
      title: "Local Delivery Service",
      description: "Swift and reliable local delivery services within Lagos and surrounding areas.",
      detailedDescription: "Our Local Delivery Service provides fast and efficient transportation solutions within Lagos and its surrounding suburbs. With our extensive network of delivery agents, we ensure same-day and next-day delivery options for urgent shipments.",
      features: [
        "Same-day delivery",
        "Next-day delivery",
        "Real-time tracking",
        "Proof of delivery",
        "Flexible scheduling",
        "Dedicated delivery agents"
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 5,
      icon: faRoad,
      title: "Interstate Delivery",
      description: "Efficient delivery services connecting all states across Nigeria.",
      detailedDescription: "Our Interstate Delivery service connects all major cities and states across Nigeria with reliable and cost-effective transportation solutions. We offer both express and standard delivery options to meet your specific needs.",
      features: [
        "Nationwide coverage",
        "Express and standard options",
        "Real-time tracking",
        "Dedicated vehicles",
        "Secure packaging",
        "Proof of delivery"
      ],
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      icon: faHandshake,
      title: "B2B Logistics",
      description: "Comprehensive business-to-business logistics solutions tailored to your needs.",
      detailedDescription: "Our B2B Logistics service provides customized supply chain solutions for businesses of all sizes. From warehousing and distribution to transportation and reverse logistics, we offer end-to-end solutions to optimize your operations.",
      features: [
        "Customized supply chain solutions",
        "Warehousing and distribution",
        "Transportation management",
        "Reverse logistics",
        "Inventory management",
        "Dedicated account management"
      ],
      image: "https://images.unsplash.com/photo-1559028006-44a27f080cdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 7,
      icon: faHome,
      title: "Relocation",
      description: "Hassle-free relocation services for homes and offices with utmost care.",
      detailedDescription: "Our Relocation service provides comprehensive moving solutions for both residential and commercial clients. We handle everything from packing and loading to transportation and unpacking, ensuring a smooth and stress-free moving experience.",
      features: [
        "Residential relocation",
        "Commercial relocation",
        "Packing and unpacking",
        "Furniture assembly",
        "Storage solutions",
        "Insurance coverage"
      ],
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  // Features data
  const features = [
    {
      icon: faClock,
      title: "Fast Delivery",
      description: "Swift and timely delivery of your packages to any destination."
    },
    {
      icon: faShieldAlt,
      title: "Secure Handling",
      description: "Your packages are handled with utmost care and security throughout the journey."
    },
    {
      icon: faMoneyBillWave,
      title: "Competitive Pricing",
      description: "Affordable rates without compromising on service quality."
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your logistics needs."
    }
  ];

  // Process data
  const processSteps = [
    {
      step: 1,
      title: "Book Your Shipment",
      description: "Schedule your delivery online or through our customer service."
    },
    {
      step: 2,
      title: "Package Collection",
      description: "Our team collects your package from the specified location."
    },
    {
      step: 3,
      title: "In Transit",
      description: "Your package is on its way to the destination with real-time tracking."
    },
    {
      step: 4,
      title: "Delivery Confirmation",
      description: "Package delivered successfully with confirmation and proof of delivery."
    }
  ];

  // Pricing data
  const pricingPlans = [
    {
      name: "Standard",
      price: "₦2,500",
      period: "per shipment",
      features: [
        "Delivery within 3-5 business days",
        "Basic tracking",
        "Email support",
        "Up to 10kg"
      ],
      excluded: ["Express delivery", "Priority support", "Insurance"],
      popular: false
    },
    {
      name: "Express",
      price: "₦5,000",
      period: "per shipment",
      features: [
        "Delivery within 1-2 business days",
        "Advanced tracking",
        "Phone & email support",
        "Up to 20kg",
        "Express delivery"
      ],
      excluded: ["Priority support", "Insurance"],
      popular: true
    },
    {
      name: "Premium",
      price: "₦8,500",
      period: "per shipment",
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "24/7 priority support",
        "Up to 30kg",
        "Express delivery",
        "Insurance included"
      ],
      excluded: [],
      popular: false
    }
  ];

  // Handle service click
  const handleServiceClick = (index) => {
    setActiveService(index);
    setModalContent(services[index]);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Scroll animations
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = [
        { ref: heroRef, class: 'animate-fade-in' },
        { ref: servicesRef, class: 'animate-fade-in-up' },
        { ref: featuresRef, class: 'animate-fade-in-up' },
        { ref: processRef, class: 'animate-fade-in-up' },
        { ref: pricingRef, class: 'animate-fade-in-up' },
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
    animateOnScroll(); // Run once on load

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 z-10"></div>
        
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            Comprehensive logistics solutions tailored to meet your delivery needs
          </p>
          <nav className="flex justify-center space-x-4">
            <Link to="/" className="text-white hover:text-red-200 transition-colors duration-300">
              Home
            </Link>
            <span className="text-red-200">/</span>
            <span className="text-red-200">Services</span>
          </nav>
        </div>
      </section>

      {/* Services Overview Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-red-600">
              Our Logistics Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              We offer a wide range of logistics services designed to meet the diverse needs of individuals and businesses alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                onClick={() => handleServiceClick(index)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="text-4xl text-red-600 mb-4">
                    <FontAwesomeIcon icon={service.icon} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <button className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-300 inline-flex items-center">
                    Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-red-600">
              Why Choose Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Our commitment to excellence ensures that your packages are delivered safely, securely, and on time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              >
                <div className="text-5xl text-red-600 mb-6">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-red-600">
              Our Delivery Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Our streamlined delivery process ensures your packages reach their destination efficiently and securely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-red-600">
              Service Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Transparent and competitive pricing for all our logistics services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? 'ring-2 ring-red-500 relative' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-red-600 text-white text-center py-2 font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.excluded.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-400">
                        <FontAwesomeIcon icon={faTimes} className="text-gray-400 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/quote" 
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                      plan.popular 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship With Us?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Experience reliable, efficient, and secure logistics services with Fex Logistics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/quote" 
              className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get a Quote
            </Link>
            <Link 
              to="/contact" 
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold">{modalContent.title}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={modalContent.image} 
                    alt={modalContent.title} 
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <div className="text-5xl text-red-600 mb-6">
                    <FontAwesomeIcon icon={modalContent.icon} />
                  </div>
                  <p className="text-gray-600 mb-6">{modalContent.detailedDescription}</p>
                  
                  <Link 
                    to="/quote" 
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
                  >
                    Request This Service
                  </Link>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4">Service Features</h4>
                  <ul className="space-y-3 mb-8">
                    {modalContent.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="text-xl font-bold mb-4">Transportation Methods</h4>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <FontAwesomeIcon icon={faTruck} className="text-3xl text-red-600 mb-2" />
                      <p>Ground Transport</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <FontAwesomeIcon icon={faPlane} className="text-3xl text-red-600 mb-2" />
                      <p>Air Freight</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <FontAwesomeIcon icon={faShip} className="text-3xl text-red-600 mb-2" />
                      <p>Sea Freight</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <FontAwesomeIcon icon={faTrain} className="text-3xl text-red-600 mb-2" />
                      <p>Rail Transport</p>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-4">Service Availability</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                      Available in all service locations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;