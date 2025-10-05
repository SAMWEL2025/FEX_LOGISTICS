import React, { useState, useEffect, useRef } from 'react';
import { useNavigate as useReactRouterNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faPlane, 
  faShip,
  faBox,
  faBuilding,
  faHome,
  faGlobe,
  faWeight,
  faRuler,
  faInfoCircle,
  faNairaSign,
  faDollarSign,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Custom navigation hook that works with or without Router context
function useCustomNavigate() {
  try {
    // Try to use the React Router navigate function
    return useReactRouterNavigate();
  } catch (e) {
    // If not in a Router context, provide a fallback navigation function
    return (path) => {
      window.location.href = path;
    };
  }
}

const Quote = () => {
  const navigate = useCustomNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shipmentType: '', // 'express', 'interstate', or 'international'
    destination: '',
    weight: '',
    description: '',
    deliveryType: 'pickup', // 'pickup' or 'doorstep'
    expressService: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteResult, setQuoteResult] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [destinationError, setDestinationError] = useState('');
  const expressDestinationRef = useRef(null);
  const interstateDestinationRef = useRef(null);
  const internationalDestinationRef = useRef(null);

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 
    'Taraba', 'Yobe', 'Zamfara'
  ];

  // Lagos E-commerce zones and areas
  const lagosEcommerceZones = {
    'ZONE 1 - MAINLAND': {
      baseRate: 2500,
      areas: [
        'Surulere', 'Opebi', 'Anthony', 'Ejigbo', 'Isolo', 'Iyana Itire', 'Ikeja', 
        'Alausa ikeja', 'Oregun Ikeja', 'Oshodi', 'Obanikoro', 'Mushin', 'Palmgrove', 
        'Onipanu', 'Ago palace', 'Ilupeju', 'Coker', 'Ladipo', 'Fadeyi', 'Jakande gate', 
        'Ojota', 'Jibowu', 'Gbagada', 'Yaba'
      ],
      specialAreas: {
        'Computer village Ikeja': 500,
        'Arena market Oshodi': 500
      }
    },
    'ZONE 1 - ISLAND': {
      baseRate: 3500,
      areas: [
        'Ikoyi', 'Eko', 'Oniru', 'Admiralty Lekki', 'Victoria Island', 'Lagos island', 
        'CMS', 'Idumota', 'Marwa Lekki', 'Lekki Phase 1', 'Lekki phase 2', 'Jakande lekki', 
        'Osapa London', 'Alpha beach Lekki', 'Orchid Rd Lekki', 'Chevron Lekki', 'VGC', 
        'Ikota Lekki', 'Ilasan', 'Ologolo lekki', 'Igboefon', 'Agungi'
      ],
      specialAreas: {
        'Lagos island': 500,
        'CMS': 500,
        'Idumota': 500
      }
    },
    'ZONE 2 - MAINLAND': {
      baseRate: 3000,
      areas: [
        'Ikotun', 'Idimu', 'Ijegun', 'Isheri oshun', 'Omole phase 1/2', 'Costain', 
        'Somolu', 'Egbeda', 'Gowon estate', 'Akowonjo', 'Cele egbe', 'Agege', 'Festac', 
        'Amuwo odofin', 'Oworonshoki', 'Bariga', 'Ketu', 'Alapere', 'Ogba', 
        'Iyana Ipaja', 'Magodo', 'Ebute metta', 'Ogudu'
      ],
      specialAreas: {}
    },
    'ZONE 2 - ISLAND': {
      baseRate: 4000,
      areas: ['Ajah', 'Thomas estate', 'LBS', 'Lamgbasa', 'Badore ajah', 'Abraham adensanya'],
      specialAreas: {}
    },
    'ZONE 2 - ISLAND (Sangotedo)': {
      baseRate: 4500,
      areas: ['Sangotedo'],
      specialAreas: {}
    },
    'ZONE 2 - ISLAND (Addo)': {
      baseRate: 5000,
      areas: ['Addo'],
      specialAreas: {}
    },
    'ZONE 2 - ISLAND (Abijo)': {
      baseRate: 5500,
      areas: ['Abijo'],
      specialAreas: {}
    },
    'ZONE 2 - ISLAND (Awoyaya)': {
      baseRate: 6000,
      areas: ['Awoyaya'],
      specialAreas: {}
    },
    'ZONE 2 - ISLAND (Lakowe)': {
      baseRate: 6500,
      areas: ['Lakowe'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND': {
      baseRate: 3500,
      areas: [
        'Orile', 'Ojo', 'Satellite town', 'Navy town', 'Ajegunle', 'Ayobo', 
        'Lasu igando Rd', 'Ifako ijaiye', 'Iju ishaga', 'Meiran', 'Alagbado', 'Maza Maza'
      ],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Ojodu Berger)': {
      baseRate: 4000,
      areas: ['Ojodu Berger'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Trade fair)': {
      baseRate: 4000,
      areas: ['Trade fair'],
      specialAreas: {
        'Trade fair': 700
      }
    },
    'ZONE 3 - MAINLAND (Iyana Iba)': {
      baseRate: 4000,
      areas: ['Iyana Iba'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Abuleado)': {
      baseRate: 4000,
      areas: ['Abuleado'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Volks)': {
      baseRate: 4000,
      areas: ['Volks'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (New oko oba)': {
      baseRate: 4000,
      areas: ['New oko oba'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Ikorodu)': {
      baseRate: 4500,
      areas: ['Ikorodu'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Okokomiko)': {
      baseRate: 4500,
      areas: ['Okokomiko'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Alaba)': {
      baseRate: 4500,
      areas: ['Alaba'],
      specialAreas: {
        'Alaba': 800
      }
    },
    'ZONE 3 - MAINLAND (Alakuko)': {
      baseRate: 4500,
      areas: ['Alakuko'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Igbo Elerin)': {
      baseRate: 4500,
      areas: ['Igbo Elerin'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Iyana isashi)': {
      baseRate: 5000,
      areas: ['Iyana isashi'],
      specialAreas: {}
    },
    'ZONE 3 - MAINLAND (Opic isheri north)': {
      baseRate: 5500,
      areas: ['Opic isheri north'],
      specialAreas: {}
    }
  };

  // Create flat list of Lagos areas
  const lagosAreas = [];
  for (const zoneData of Object.values(lagosEcommerceZones)) {
    lagosAreas.push(...zoneData.areas);
  }

  // Inter-state zones and states
  const interStateZones = {
    1: ['Ibadan', 'Ekiti', 'Ilorin', 'Osogbo', 'Akure', 'Abeokuta'],
    2: ['Enugu', 'Owerri', 'Aba', 'Abakaliki', 'Awka', 'Nnewi', 'Onitsha'],
    3: ['Bayelsa', 'Port-harcourt', 'Calabar', 'Uyo', 'Warri', 'Asaba', 'Benin'],
    4: ['Bauchi', 'Yola', 'Makurdi', 'Jos', 'Lafia', 'Minna', 'Kano', 'Kaduna', 'Sokoto'],
    5: ['Taraba', 'Gusau', 'Maiduguri']
  };

  // Create flat list of inter-state destinations
  const interStateDestinations = [];
  for (const states of Object.values(interStateZones)) {
    interStateDestinations.push(...states);
  }

  // Inter-state base rates per zone
  const interStateBaseRates = {
    1: 6500,
    2: 7500,
    3: 7500,
    4: 8000,
    5: 8500
  };

  // States with doorstep delivery availability
  const doorstepAvailableStates = [
    'Ibadan', 'Enugu', 'Port-harcourt', 'Abuja', 'Kano', 'Kaduna', 'Benin', 'Abeokuta', 'Warri'
  ];

  // Zone mapping with all countries for international
  const zoneMapping = {
    1: ["UNITED KINGDOM", "UK", "ENGLAND", "SCOTLAND", "WALES", "NORTHERN IRELAND", "IRELAND", "DUBLIN"],
    2: ["GHANA", "SENEGAL", "GAMBIA"],
    3: ["USA", "CANADA", "MEXICO", "UNITED STATES", "AMERICA"],
    4: ["CYPRUS", "GERMANY", "FRANCE", "ITALY", "MALTA", "PORTUGAL", "SPAIN", "SWEDEN", "TURKEY", "AUSTRIA"],
    5: ["ANGOLA", "ETHIOPIA", "KENYA", "LIBYA", "NAMIBIA", "SOUTH AFRICA", "SUDAN", "TANZANIA", "ZAMBIA"],
    6: ["IRAQ", "ISRAEL", "JORDAN", "KUWAIT", "QATAR", "SAUDI ARABIA", "UNITED ARAB", "OMAN", "UNITED ARAB EMIRATES", "UAE"],
    7: ["CHINA", "INDIA", "JAPAN", "KOREA", "MALAYSIA", "PAKISTAN", "PHILIPPINES", "SINGAPORE", "VIETNAM", "MALDIVE", "AUSTRALIA"],
    8: ["ARGENTINA", "COLOMBIA", "BARBADOS", "BRAZIL", "GUYANA", "NEW ZEALAND", "JAMAICA"]
  };

  // Create international destinations list from zone mapping
  const internationalDestinations = [...new Set(
    Object.values(zoneMapping).flat()
  )].sort();

  // Function to get zone by country for international
  const getZoneByCountry = (country) => {
    const countryUpper = country.toUpperCase();
    for (const [zone, countries] of Object.entries(zoneMapping)) {
      if (countries.map(c => c.toUpperCase()).includes(countryUpper)) {
        return parseInt(zone);
      }
    }
    return null;
  };

  // Function to get zone by state for inter-state
  const getZoneByState = (state) => {
    for (const [zone, states] of Object.entries(interStateZones)) {
      if (states.includes(state)) {
        return parseInt(zone);
      }
    }
    return null;
  };

  // Function to get Lagos area rate
  const getLagosAreaRate = (area) => {
    for (const [zoneName, zoneData] of Object.entries(lagosEcommerceZones)) {
      if (zoneData.areas.includes(area)) {
        return {
          baseRate: zoneData.baseRate,
          additionalFee: zoneData.specialAreas[area] || 0
        };
      }
    }
    return null;
  };

  const expressServices = [
    { value: 'local-delivery', label: 'Local Delivery', icon: faTruck },
    { value: 'interstate', label: 'Interstate Delivery', icon: faTruck },
    { value: 'ecommerce', label: 'E-commerce', icon: faBox },
    { value: 'b2b-logistics', label: 'B2B Logistics', icon: faBuilding }
  ];

  const internationalServices = [
    { value: 'express-international', label: 'Express International', icon: faPlane },
    { value: 'cargo-shipping', label: 'Cargo Shipping', icon: faShip },
    { value: 'air-sea-freight', label: 'Air/Sea Freight', icon: faPlane }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Handle destination input for autocomplete
    if (name === 'destination') {
      setDestinationError('');
      
      if (value.trim() === '') {
        setDestinationSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      if (formData.shipmentType === 'express') {
        const filtered = lagosAreas.filter(area =>
          area.toLowerCase().includes(value.toLowerCase())
        );
        setDestinationSuggestions(filtered);
        setShowSuggestions(true);
      } else if (formData.shipmentType === 'interstate') {
        const filtered = interStateDestinations.filter(state =>
          state.toLowerCase().includes(value.toLowerCase())
        );
        setDestinationSuggestions(filtered);
        setShowSuggestions(true);
      } else if (formData.shipmentType === 'international') {
        const filtered = internationalDestinations.filter(country =>
          country.toLowerCase().includes(value.toLowerCase())
        );
        setDestinationSuggestions(filtered);
        setShowSuggestions(true);
      }
    }
  };

  const handleDestinationSelect = (destination) => {
    setFormData(prev => ({
      ...prev,
      destination
    }));
    setShowSuggestions(false);
    setDestinationError('');
  };

  const handleClickOutside = (e) => {
    if (
      expressDestinationRef.current && !expressDestinationRef.current.contains(e.target) &&
      interstateDestinationRef.current && !interstateDestinationRef.current.contains(e.target) &&
      internationalDestinationRef.current && !internationalDestinationRef.current.contains(e.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate quote based on form data
    let basePrice = 0;
    let estimatedDelivery = '';
    
    if (formData.shipmentType === 'express') {
      // Express shipment pricing (within Lagos)
      const areaRate = getLagosAreaRate(formData.destination);
      if (areaRate === null) {
        setDestinationError('Destination unavailable');
        return;
      }
      
      // Calculate base cost (add 500 for normal users)
      let baseCost = areaRate.baseRate + areaRate.additionalFee + 500;
      
      // Add 25 Naira to all charges
      baseCost += 25;
      
      basePrice = baseCost;
      estimatedDelivery = '24 Hours';
    } else if (formData.shipmentType === 'interstate') {
      // Inter-state shipment pricing (from Lagos to other states)
      const zone = getZoneByState(formData.destination);
      if (zone === null) {
        setDestinationError('Destination unavailable');
        return;
      }
      
      const weight = parseFloat(formData.weight);
      
      // Base cost for up to 1kg
      let baseCost = interStateBaseRates[zone];
      
      // Add extra weight cost if above 1kg
      if (weight > 1) {
        baseCost += (weight - 1) * 1000;
      }
      
      // Add express service cost (50% extra)
      if (formData.expressService) {
        baseCost *= 1.5;
      }
      
      // Add doorstep delivery cost if available and selected
      if (formData.deliveryType === 'doorstep' && doorstepAvailableStates.includes(formData.destination)) {
        baseCost += 5000;
      }
      
      // Add 25 Naira to all charges
      baseCost += 25;
      
      basePrice = baseCost;
      estimatedDelivery = formData.expressService ? '3 Days' : '4 Days';
    } else {
      // International shipment pricing
      const zone = getZoneByCountry(formData.destination);
      if (zone === null) {
        setDestinationError('Destination unavailable');
        return;
      }
      
      const weight = parseFloat(formData.weight);
      let baseCost = 0;

      // Base rates for 0.5-2kg by zone
      const baseRates = {
        1: 65000,
        2: 75000,
        3: 8500,
        4: 92500
      };

      if (zone <= 4) {
        baseCost = baseRates[zone];
      } else {
        baseCost = baseRates[4] + 5000; // 97500 for zones 5-8
      }

      // Adjust for weight
      if (weight > 2.0 && weight <= 5.0) {
        baseCost += 5000;
      } else if (weight > 5.0 && weight <= 10.0) {
        baseCost += 15000; // 5000 for above 2kg + 10000 for above 5kg
      } else if (weight > 10.0) {
        baseCost += 15000 + 12000 * (weight - 10);
      }

      // Add 25 Naira to all shipments
      baseCost += 25;
      basePrice = baseCost;
      estimatedDelivery = '5-10 Days';
    }
    
    // Set quote result
    setQuoteResult({
      price: Math.round(basePrice),
      currency: 'NGN',
      estimatedDelivery
    });
    
    setShowQuote(true);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      shipmentType: '',
      destination: '',
      weight: '',
      description: '',
      deliveryType: 'pickup',
      expressService: false
    });
    setShowQuote(false);
    setQuoteResult(null);
    setDestinationError('');
  };

  const handleBookShipment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Log to console for debugging
    console.log("Navigating to signup page");
    
    // Navigate to signup page using our custom navigate function
    navigate('/auth/signup');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Request a Quote</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Get a customized quote for your logistics needs. Select between Express (Within Lagos), Inter-state or International shipment.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {isSubmitted && showQuote ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mb-8">
              <div className="text-green-600 text-5xl mb-4">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Quote Generated!</h2>
              <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6">
                <p className="text-gray-700 mb-2">Estimated Cost:</p>
                <p className="text-3xl font-bold text-green-700 mb-4">
                  <FontAwesomeIcon icon={faNairaSign} /> {quoteResult.price.toLocaleString()}
                </p>
                <p className="text-gray-700">Estimated Delivery: {quoteResult.estimatedDelivery}</p>
              </div>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  New Quote
                </button>
                <button 
                  onClick={handleBookShipment}
                  type="button"
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Book Shipment
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Form Section */}
                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipment Details</h2>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Shipment Type Selection */}
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Shipment Type</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.shipmentType === 'express' 
                              ? 'border-red-600 bg-red-50' 
                              : 'border-gray-300 hover:border-red-400'
                          }`}
                          onClick={() => setFormData(prev => ({ 
                            ...prev, 
                            shipmentType: 'express',
                            destination: '',
                            deliveryType: 'pickup',
                            expressService: false
                          }))}
                        >
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faTruck} className="text-red-600 text-xl mr-3" />
                            <div>
                              <h3 className="font-semibold text-gray-800">Express</h3>
                              <p className="text-sm text-gray-600">Within Lagos</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.shipmentType === 'interstate' 
                              ? 'border-red-600 bg-red-50' 
                              : 'border-gray-300 hover:border-red-400'
                          }`}
                          onClick={() => setFormData(prev => ({ 
                            ...prev, 
                            shipmentType: 'interstate',
                            destination: '',
                            deliveryType: 'pickup',
                            expressService: false
                          }))}
                        >
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faTruck} className="text-red-600 text-xl mr-3" />
                            <div>
                              <h3 className="font-semibold text-gray-800">Inter-state</h3>
                              <p className="text-sm text-gray-600">Lagos to other states</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.shipmentType === 'international' 
                              ? 'border-red-600 bg-red-50' 
                              : 'border-gray-300 hover:border-red-400'
                          }`}
                          onClick={() => setFormData(prev => ({ 
                            ...prev, 
                            shipmentType: 'international',
                            destination: '',
                            deliveryType: 'pickup',
                            expressService: false
                          }))}
                        >
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faPlane} className="text-red-600 text-xl mr-3" />
                            <div>
                              <h3 className="font-semibold text-gray-800">International</h3>
                              <p className="text-sm text-gray-600">Global shipping</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {formData.shipmentType && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                            <input 
                              type="email" 
                              id="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                            <input 
                              type="tel" 
                              id="phone" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="weight" className="block text-gray-700 mb-2">Weight (kg)</label>
                            <input 
                              type="number" 
                              id="weight" 
                              name="weight"
                              value={formData.weight}
                              onChange={handleChange}
                              step="0.1"
                              min="0.1"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                              required
                            />
                          </div>
                          
                          {formData.shipmentType === 'express' && (
                            <div className="relative" ref={expressDestinationRef}>
                              <label htmlFor="destination" className="block text-gray-700 mb-2">Destination Area</label>
                              <input 
                                type="text" 
                                id="destination" 
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                onFocus={() => formData.destination && setShowSuggestions(true)}
                                placeholder="Start typing area name..."
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                  destinationError ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                              />
                              {destinationError && (
                                <p className="text-red-500 text-sm mt-1">{destinationError}</p>
                              )}
                              {showSuggestions && destinationSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                  {destinationSuggestions.map((area, index) => (
                                    <div 
                                      key={index}
                                      className="px-4 py-2 hover:bg-red-50 cursor-pointer"
                                      onClick={() => handleDestinationSelect(area)}
                                    >
                                      {area}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {formData.shipmentType === 'interstate' && (
                            <div className="relative" ref={interstateDestinationRef}>
                              <label htmlFor="destination" className="block text-gray-700 mb-2">Destination State</label>
                              <input 
                                type="text" 
                                id="destination" 
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                onFocus={() => formData.destination && setShowSuggestions(true)}
                                placeholder="Start typing state name..."
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                  destinationError ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                              />
                              {destinationError && (
                                <p className="text-red-500 text-sm mt-1">{destinationError}</p>
                              )}
                              {showSuggestions && destinationSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                  {destinationSuggestions.map((state, index) => (
                                    <div 
                                      key={index}
                                      className="px-4 py-2 hover:bg-red-50 cursor-pointer"
                                      onClick={() => handleDestinationSelect(state)}
                                    >
                                      {state}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {formData.shipmentType === 'international' && (
                            <div className="relative" ref={internationalDestinationRef}>
                              <label htmlFor="destination" className="block text-gray-700 mb-2">Destination</label>
                              <input 
                                type="text" 
                                id="destination" 
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                onFocus={() => formData.destination && setShowSuggestions(true)}
                                placeholder="Start typing country name..."
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                  destinationError ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                              />
                              {destinationError && (
                                <p className="text-red-500 text-sm mt-1">{destinationError}</p>
                              )}
                              {showSuggestions && destinationSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                  {destinationSuggestions.map((country, index) => (
                                    <div 
                                      key={index}
                                      className="px-4 py-2 hover:bg-red-50 cursor-pointer"
                                      onClick={() => handleDestinationSelect(country)}
                                    >
                                      {country}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {formData.shipmentType === 'interstate' && (
                          <>
                            <div className="mb-6">
                              <label className="block text-gray-700 mb-2">Delivery Type</label>
                              <div className="flex space-x-4">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="pickup"
                                    name="deliveryType"
                                    value="pickup"
                                    checked={formData.deliveryType === 'pickup'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500"
                                  />
                                  <label htmlFor="pickup" className="ml-2 block text-sm text-gray-700">
                                    Pickup
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id="doorstep"
                                    name="deliveryType"
                                    value="doorstep"
                                    checked={formData.deliveryType === 'doorstep'}
                                    onChange={handleChange}
                                    disabled={!doorstepAvailableStates.includes(formData.destination)}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 disabled:opacity-50"
                                  />
                                  <label htmlFor="doorstep" className={`ml-2 block text-sm ${!doorstepAvailableStates.includes(formData.destination) ? 'text-gray-400' : 'text-gray-700'}`}>
                                    Door-step Delivery {doorstepAvailableStates.includes(formData.destination) ? '(+₦5,000)' : '(Not available)'}
                                  </label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="expressService"
                                  name="expressService"
                                  checked={formData.expressService}
                                  onChange={handleChange}
                                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                                />
                                <label htmlFor="expressService" className="ml-2 block text-sm text-gray-700">
                                  Express Service (50% extra cost)
                                </label>
                              </div>
                            </div>
                          </>
                        )}
                        
                        <div className="mb-6">
                          <label htmlFor="description" className="block text-gray-700 mb-2">Shipment Description</label>
                          <textarea 
                            id="description" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            placeholder="Please provide details about your shipment..."
                          ></textarea>
                        </div>
                      </>
                    )}
                    
                    <button 
                      type="submit" 
                      disabled={!formData.shipmentType}
                      className={`w-full py-3 px-6 rounded-md font-semibold transition-colors duration-300 ${
                        formData.shipmentType 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {formData.shipmentType ? 'Get Quote' : 'Select Shipment Type to Continue'}
                    </button>
                  </form>
                </div>
                
                {/* Info Section */}
                <div className="md:w-1/3 bg-red-50 p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Services</h2>
                  
                  <div className="space-y-4">
                    {formData.shipmentType === 'express' ? (
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <h3 className="font-bold text-lg mb-2 text-red-800">Express Delivery Notes</h3>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Additional fee if package is bulky</li>
                          <li>• Lagos zone rate alone</li>
                          <li>• ORDER BEFORE 12PM FOR EARLY PICK-UP</li>
                          <li>• 24hours delivery service</li>
                          <li>• RESCHEDULE DELIVERY FOR NEXT DAY PICK-UP</li>
                          <li className="font-semibold mt-2">Customer service: 09067966989</li>
                        </ul>
                      </div>
                    ) : formData.shipmentType === 'interstate' ? (
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <h3 className="font-bold text-lg mb-2 text-red-800">Inter-state Shipping</h3>
                        <p className="text-sm text-gray-700 mb-3">
                          Delivery from Lagos to other Nigerian states with 3-4 days delivery service.
                        </p>
                      </div>
                    ) : formData.shipmentType === 'international' ? (
                      internationalServices.map((service, index) => (
                        <div key={index} className="flex items-start">
                          <FontAwesomeIcon icon={service.icon} className="text-red-600 mt-1 mr-3" />
                          <div>
                            <h3 className="font-semibold text-gray-800">{service.label}</h3>
                            <p className="text-sm text-gray-600">
                              {service.value === 'express-international' && 'Fast international delivery service'}
                              {service.value === 'cargo-shipping' && 'Large cargo shipping solutions'}
                              {service.value === 'air-sea-freight' && 'Combined air and sea freight options'}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <FontAwesomeIcon icon={faInfoCircle} className="text-red-600 text-4xl mb-4" />
                        <p className="text-gray-700">
                          Select a shipment type to see available services and pricing information.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 p-4 bg-white rounded-lg border border-red-200">
                    <h3 className="font-bold text-lg mb-2 text-red-800">Need Help?</h3>
                    <p className="text-gray-700 mb-3">
                      Our customer service team is available to assist you with your quote request.
                    </p>
                    <p className="text-gray-700">
                      Call us: <span className="font-semibold">09015179909</span>
                    </p>
                    <p className="text-gray-700">
                      Email: <span className="font-semibold">support@fexlogistics.com.ng</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quote;