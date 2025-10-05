import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faSave,
  faTimes,
  faArrowLeft,
  faMapMarkerAlt,
  faWeightHanging,
  faUser,
  faPhone,
  faNoteSticky,
  faChevronRight,
  faChevronLeft,
  faInfoCircle,
  faCheck,
  faCreditCard,
  faTruck,
  faBox,
  faEnvelope,
  faArrowRight,
  faPaperPlane,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

const BookShipment = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Sender Information (pre-filled from user profile)
    senderName: '',
    senderNumber: '',
    senderAddress: '',
    senderState: 'Lagos',
    
    // Receiver Information (to be filled)
    receiverName: '',
    receiverNumber: '',
    receiverAddress: '',
    receiverState: '',
    receiverNote: '',
    
    // Package Information
    weight: '',
    numberOfItems: '1',
    
    // Other fields
    pickupLocation: '',
    email: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [destinationInput, setDestinationInput] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const destinationRef = useRef(null);

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

  // Package types
  const packageTypes = [
    { value: 'small', label: 'Small Package', icon: faBox, description: 'Under 5kg' },
    { value: 'medium', label: 'Medium Package', icon: faBox, description: '5-20kg' },
    { value: 'large', label: 'Large Package', icon: faBox, description: 'Over 20kg' }
  ];

  // Function to get Lagos area rate
  const getLagosAreaRate = (area) => {
    for (const [zoneName, zoneData] of Object.entries(lagosEcommerceZones)) {
      if (zoneData.areas.includes(area)) {
        return {
          baseRate: zoneData.baseRate,
          additionalFee: zoneData.specialAreas[area] || 0,
          zoneName
        };
      }
    }
    return null;
  };

  // Function to sanitize phone number input
  const sanitizePhoneNumber = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  // Calculate shipping price based on form data
  const calculateShippingPrice = () => {
    if (!formData.receiverState) return 0;
    
    const areaRate = getLagosAreaRate(formData.receiverState);
    if (areaRate) {
      // Base rate + additional fee + 500 for ecommerce users + 25 processing fee
      return areaRate.baseRate + areaRate.additionalFee + 500 + 25;
    }
    
    return 0;
  };

  // Handle destination input change
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestinationInput(value);
    
    if (value.trim() === '') {
      setDestinationSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    // Filter areas based on input
    const filtered = lagosAreas.filter(area =>
      area.toLowerCase().includes(value.toLowerCase())
    );
    
    setDestinationSuggestions(filtered);
    setShowSuggestions(true);
  };

  // Handle destination selection
  const handleDestinationSelect = (area) => {
    setDestinationInput(area);
    setFormData(prev => ({ ...prev, receiverState: area }));
    setShowSuggestions(false);
  };

  // Handle click outside to close suggestions
  const handleClickOutside = (e) => {
    if (destinationRef.current && !destinationRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  // Update calculated price when relevant form data changes
  useEffect(() => {
    if (activeStep === 1) {
      setCalculatedPrice(calculateShippingPrice());
    }
  }, [formData, activeStep]);

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simulate getting user data from profile
  useEffect(() => {
    // In a real app, this would come from the user's profile
    const userProfile = {
      name: 'Ecommerce Store',
      phone: '+234 801 234 5678',
      address: '123, Lagos Street, Ikeja',
      state: 'Lagos',
      email: 'store@example.com'
    };
    
    setFormData(prev => ({
      ...prev,
      senderName: userProfile.name,
      senderNumber: userProfile.phone,
      senderAddress: userProfile.address,
      senderState: userProfile.state,
      email: userProfile.email || '',
      pickupLocation: userProfile.address
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle phone number input with sanitization
  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizePhoneNumber(value);
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      // Receiver validation
      if (!formData.receiverName || formData.receiverName.trim() === '') newErrors.receiverName = 'Receiver name is required';
      if (!formData.receiverNumber || formData.receiverNumber.trim() === '') newErrors.receiverNumber = 'Receiver phone number is required';
      if (!formData.receiverAddress || formData.receiverAddress.trim() === '') newErrors.receiverAddress = 'Receiver address is required';
      if (!formData.receiverState || formData.receiverState.trim() === '') {
        newErrors.receiverState = 'Receiver area in Lagos is required';
      }
    }
    
    if (step === 1) {
      if (!formData.weight || formData.weight.trim() === '') newErrors.weight = 'Weight is required';
      if (!formData.pickupLocation || formData.pickupLocation.trim() === '') newErrors.pickupLocation = 'Pickup location is required';
      if (!formData.email || formData.email.trim() === '') newErrors.email = 'Email is required';
      if (!formData.numberOfItems || formData.numberOfItems.trim() === '') newErrors.numberOfItems = 'Number of items is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 2));
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(activeStep)) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const newShipment = {
          id: `EC${Math.floor(Math.random() * 100000)}`,
          ...formData,
          price: calculatedPrice,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0]
        };
        
        console.log('New shipment created:', newShipment);
        
        setLoading(false);
        setRequestSent(true);
        
        // After showing success message, redirect to payments
        setTimeout(() => {
          navigate('/dashboard/ecommerce/payments', { state: { shipment: newShipment } });
        }, 2000);
      }, 1500);
    }
  };

  const getStepTitle = (step) => {
    switch(step) {
      case 0: return 'Delivery Details';
      case 1: return 'Package Information';
      case 2: return 'Payment & Review';
      default: return '';
    }
  };

  const renderStepContent = () => {
    switch(activeStep) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Receiver Information */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                Receiver Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg ${errors.receiverName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter receiver's full name"
                  />
                  {errors.receiverName && <p className="mt-1 text-sm text-red-600">{errors.receiverName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="receiverNumber"
                    value={formData.receiverNumber}
                    onChange={handlePhoneNumberChange}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className={`w-full px-4 py-3 border rounded-lg ${errors.receiverNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter receiver's phone number"
                  />
                  {errors.receiverNumber && <p className="mt-1 text-sm text-red-600">{errors.receiverNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="receiverAddress"
                    value={formData.receiverAddress}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg ${errors.receiverAddress ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter street address"
                  />
                  {errors.receiverAddress && <p className="mt-1 text-sm text-red-600">{errors.receiverAddress}</p>}
                </div>
                
                <div className="relative" ref={destinationRef}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area in Lagos *</label>
                  <input
                    type="text"
                    name="receiverState"
                    value={destinationInput}
                    onChange={handleDestinationChange}
                    onFocus={() => destinationInput && setShowSuggestions(true)}
                    className={`w-full px-4 py-3 border rounded-lg ${errors.receiverState ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Type or select area in Lagos"
                  />
                  {errors.receiverState && <p className="mt-1 text-sm text-red-600">{errors.receiverState}</p>}
                  
                  {/* Destination Suggestions */}
                  {showSuggestions && destinationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                      {destinationSuggestions.map((area, index) => (
                        <div 
                          key={index}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => handleDestinationSelect(area)}
                        >
                          {area}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    name="receiverNote"
                    value={formData.receiverNote}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Enter any special instructions for the receiver"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Lagos Delivery Zones Info */}
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lagos Delivery Zones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-purple-700 mb-2">ZONE 1 - MAINLAND (₦2,500)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Surulere, Opebi, Anthony, Ejigbo, Isolo, Iyana Itire, Ikeja, Alausa ikeja, Oregun Ikeja</li>
                    <li>Computer village Ikeja (+₦500)</li>
                    <li>Arena market Oshodi (+₦500)</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-purple-700 mb-2">ZONE 1 - ISLAND (₦3,500)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Ikoyi, Eko, Oniru, Admiralty Lekki, Victoria Island</li>
                    <li>Lagos island, CMS, Idumota (+₦500 each)</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-purple-700 mb-2">Other Zones</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>ZONE 2 MAINLAND: ₦3,000</li>
                    <li>ZONE 2 ISLAND: ₦4,000 - ₦6,500</li>
                    <li>ZONE 3 MAINLAND: ₦3,500 - ₦5,500</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Help Text */}
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <div className="flex">
                <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Fast & Easy Delivery</p>
                  <p className="text-xs text-yellow-700">As an ecommerce business, you get special rates for all deliveries within Lagos. Payment is made online after booking.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            {/* Package Information */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FontAwesomeIcon icon={faWeightHanging} className="mr-1 text-red-500" /> Weight (kg) *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter weight in kg"
                  />
                  {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Items *
                  </label>
                  <input
                    type="number"
                    name="numberOfItems"
                    value={formData.numberOfItems}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg ${errors.numberOfItems ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter number of items"
                    min="1"
                  />
                  {errors.numberOfItems && <p className="mt-1 text-sm text-red-600">{errors.numberOfItems}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-red-500" /> Pickup Location *
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter pickup location"
                  />
                  {errors.pickupLocation && <p className="mt-1 text-sm text-red-600">{errors.pickupLocation}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-1 text-red-500" /> Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <FontAwesomeIcon icon={faBox} className="mr-1 text-red-500" /> Package Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packageTypes.map((type) => (
                    <div 
                      key={type.value}
                      className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                        formData.packageType === type.value ? 'border-red-500 bg-red-50 shadow-sm' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, packageType: type.value }))}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          formData.packageType === type.value ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <FontAwesomeIcon icon={type.icon} />
                        </div>
                        <h3 className="font-medium">{type.label}</h3>
                        <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Price Calculation */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Delivery Cost</h3>
                <button 
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {showPriceBreakdown ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              
              {formData.receiverState && getLagosAreaRate(formData.receiverState) ? (
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Delivery Area:</span>
                    <span className="font-medium">{formData.receiverState}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Zone:</span>
                    <span className="font-medium">{getLagosAreaRate(formData.receiverState).zoneName}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Base Rate:</span>
                    <span className="font-medium">₦{getLagosAreaRate(formData.receiverState).baseRate}</span>
                  </div>
                  {getLagosAreaRate(formData.receiverState).additionalFee > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Additional Fee:</span>
                      <span className="font-medium">₦{getLagosAreaRate(formData.receiverState).additionalFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Service Fee:</span>
                    <span className="font-medium">₦500</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Processing Fee:</span>
                    <span className="font-medium">₦25</span>
                  </div>
                  {showPriceBreakdown && (
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="text-sm text-gray-600 mb-2">Price Breakdown:</div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Base Rate:</span>
                        <span>₦{getLagosAreaRate(formData.receiverState).baseRate}</span>
                      </div>
                      {getLagosAreaRate(formData.receiverState).additionalFee > 0 && (
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600">Additional Fee:</span>
                          <span>₦{getLagosAreaRate(formData.receiverState).additionalFee}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Service Fee:</span>
                        <span>₦500</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span>₦25</span>
                      </div>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Cost:</span>
                      <span className="text-xl font-bold text-green-600">₦{calculatedPrice}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-lg text-center">
                  <p className="text-gray-600">Select a delivery area to see the price</p>
                </div>
              )}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            {/* Payment Section */}
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faCreditCard} className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Online Payment</h3>
                    <p className="text-sm text-gray-600">Secure payment processing for your shipment</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Delivery Area:</span>
                    <span className="font-medium">{formData.receiverState}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Package Type:</span>
                    <span className="font-medium">{packageTypes.find(t => t.value === formData.packageType)?.label || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Weight:</span>
                    <span className="font-medium">{formData.weight ? `${formData.weight} kg` : 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Number of Items:</span>
                    <span className="font-medium">{formData.numberOfItems || 'Not specified'}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-green-600">₦{calculatedPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Review Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Shipment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">Sender Information</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm">{formData.senderName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="text-sm">{formData.senderNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm">{formData.senderAddress}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">Receiver Information</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm">{formData.receiverName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="text-sm">{formData.receiverNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm">{formData.receiverAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Area in Lagos</p>
                      <p className="text-sm">{formData.receiverState}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">Package Details</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="text-sm">{formData.weight ? `${formData.weight} kg` : 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Package Type</p>
                      <p className="text-sm">{packageTypes.find(t => t.value === formData.packageType)?.label || 'Not selected'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Number of Items</p>
                      <p className="text-sm">{formData.numberOfItems || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">Delivery Details</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Pickup Location</p>
                      <p className="text-sm">{formData.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Delivery Area</p>
                      <p className="text-sm">{formData.receiverState}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Cost</p>
                      <p className="text-sm font-semibold text-green-600">₦{calculatedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-green-50 rounded-xl border border-green-200">
                <FontAwesomeIcon icon={faInfoCircle} className="text-green-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-800">Ready to book your shipment</p>
                  <p className="text-xs text-green-700">Please ensure all details are correct before submitting. You will be redirected to the payment page after booking.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (requestSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faPaperPlane} className="text-green-500 text-3xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Request Sent!</h1>
          <p className="text-gray-600 mb-6">Your shipment booking request has been successfully submitted.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-2">Shipment ID: <span className="font-semibold">EC{Math.floor(Math.random() * 100000)}</span></p>
            <p className="text-gray-700">Status: <span className="font-semibold">Pending</span></p>
            <p className="text-gray-700">Total Cost: <span className="font-semibold">₦{calculatedPrice}</span></p>
          </div>
          <p className="text-gray-600 mb-6">
            You will be redirected to the payment page shortly...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Shipment</h1>
              <p className="mt-1 text-sm text-gray-600">Fast and easy delivery booking for your ecommerce business</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => navigate('/dashboard/ecommerce')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Progress Steps */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[0, 1, 2].map((step) => (
                <div 
                  key={step} 
                  className={`flex-1 py-4 px-6 text-center relative ${step < activeStep ? 'text-green-600' : step === activeStep ? 'text-red-600' : 'text-gray-500'}`}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      step < activeStep ? 'bg-green-100' : step === activeStep ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {step < activeStep ? (
                        <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                      ) : (
                        <span className={`text-sm font-medium ${step === activeStep ? 'text-red-600' : 'text-gray-500'}`}>
                          {step + 1}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{getStepTitle(step)}</span>
                  </div>
                  {step < 2 && (
                    <div className={`absolute top-1/2 right-0 w-1/2 h-0.5 transform -translate-y-1/2 ${
                      step < activeStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">{getStepTitle(activeStep)}</h2>
            {renderStepContent()}
          </div>
          
          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between">
            <button
              type="button"
              onClick={activeStep === 0 ? () => navigate('/dashboard/ecommerce') : prevStep}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FontAwesomeIcon icon={activeStep === 0 ? faTimes : faChevronLeft} className="mr-2" />
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </button>
            
            {activeStep < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              >
                Next
                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Pay Now
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShipment;