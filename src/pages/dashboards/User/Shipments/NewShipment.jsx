import React, { useState, useEffect } from 'react';
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
  faMoneyBillWave,
  faGlobe,
  faTruck,
  faBox,
  faEnvelope,
  faArrowRight,
  faPaperPlane,
  faNairaSign
} from '@fortawesome/free-solid-svg-icons';

const NewShipment = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Sender Information (pre-filled from user profile)
    senderName: '',
    senderNumber: '',
    senderAlternativeNumber: '',
    senderAddress: '',
    senderState: '',
    senderDescription: '',
    
    // Receiver Information (to be filled)
    receiverName: '',
    receiverNumber: '',
    receiverAlternativeNumber: '',
    receiverAddress: '',
    receiverState: '',
    receiverNote: '',
    
    // Package Information
    weight: '',
    packageType: 'package',
    
    // New fields
    serviceType: '', // local, interstate, international - initially empty
    pickupLocation: '',
    email: '',
    numberOfItems: '1',
    country: '', // for international
    paymentType: '', // onDelivery, online - initially empty
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Nigerian states for address dropdowns
  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 
    'Taraba', 'Yobe', 'Zamfara'
  ];

  // Lagos cities for local delivery
  const lagosCities = [
    'Ikeja', 'Lagos Island', 'Victoria Island', 'Lekki', 'Ikoyi', 'Apapa', 
    'Surulere', 'Yaba', 'Mushin', 'Agege', 'Ikeja', 'Oshodi', 'Ikorodu', 
    'Badagry', 'Epe', 'Ajah', 'Ikoyi', 'Maryland', 'Ojota', 'Ogba', 'Magodo'
  ];

  // Popular countries for international shipping (countries Nigerian logistics companies ship to)
  const internationalCountries = [
    'United States', 'United Kingdom', 'Canada', 'China', 'Germany', 'France', 
    'Italy', 'Spain', 'Netherlands', 'India', 'South Africa', 'United Arab Emirates', 
    'Saudi Arabia', 'Malaysia', 'Singapore', 'Australia', 'Brazil', 'Ghana', 
    'Kenya', 'Egypt', 'Turkey', 'Japan', 'South Korea', 'Mexico', 'Others'
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

  // Inter-state zones and states
  const interStateZones = {
    1: ['Ibadan', 'Ekiti', 'Ilorin', 'Osogbo', 'Akure', 'Abeokuta'],
    2: ['Enugu', 'Owerri', 'Aba', 'Abakaliki', 'Awka', 'Nnewi', 'Onitsha'],
    3: ['Bayelsa', 'Port-harcourt', 'Calabar', 'Uyo', 'Warri', 'Asaba', 'Benin'],
    4: ['Bauchi', 'Yola', 'Makurdi', 'Jos', 'Lafia', 'Minna', 'Kano', 'Kaduna', 'Sokoto'],
    5: ['Taraba', 'Gusau', 'Maiduguri']
  };

  // Inter-state base rates per zone
  const interStateBaseRates = {
    1: 6500,
    2: 7500,
    3: 7500,
    4: 8000,
    5: 8500
  };

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

  const packageTypes = [
    { value: 'document', label: 'Document', icon: faNoteSticky, description: 'Papers and documents' },
    { value: 'small', label: 'Small Package', icon: faBox, description: 'Under 5kg' },
    { value: 'medium', label: 'Medium Package', icon: faBox, description: '5-20kg' },
    { value: 'large', label: 'Large Package', icon: faBox, description: 'Over 20kg' }
  ];

  const serviceTypes = [
    { value: 'local', label: 'Local', icon: faTruck, description: 'Within Lagos' },
    { value: 'interstate', label: 'Interstate', icon: faTruck, description: 'Between different states in Nigeria' },
    { value: 'international', label: 'International', icon: faGlobe, description: 'Outside Nigeria' }
  ];

  // Function to validate phone number (Nigerian format)
  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check for Nigerian phone number formats
    // Nigerian numbers are typically 11 digits (with leading 0) or 10 digits (without leading 0)
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return true;
    }
    
    if (cleaned.length === 10) {
      return true;
    }
    
    // Check for international format (+234 followed by 10 digits)
    if (phone.startsWith('+234') && cleaned.length === 13) {
      return true;
    }
    
    return false;
  };

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

  // Calculate shipping price based on form data
  const calculateShippingPrice = () => {
    if (!formData.serviceType) return 0;
    
    let price = 0;
    const weight = parseFloat(formData.weight) || 0;
    
    if (formData.serviceType === 'local') {
      // Local (within Lagos) pricing
      const areaRate = getLagosAreaRate(formData.receiverState);
      if (areaRate) {
        price = areaRate.baseRate + areaRate.additionalFee + 500; // 500 for normal user
      }
    } else if (formData.serviceType === 'interstate') {
      // Inter-state pricing
      const zone = getZoneByState(formData.receiverState);
      if (zone) {
        price = interStateBaseRates[zone];
        // Add extra weight cost if above 1kg
        if (weight > 1) {
          price += (weight - 1) * 1000;
        }
      }
    } else if (formData.serviceType === 'international') {
      // International pricing
      const zone = getZoneByCountry(formData.country);
      if (zone) {
        // Base rates for 0.5-2kg by zone
        const baseRates = {
          1: 65000,
          2: 75000,
          3: 85000,
          4: 92500
        };

        if (zone <= 4) {
          price = baseRates[zone];
        } else {
          price = baseRates[4] + 5000; // 97500 for zones 5-8
        }

        // Adjust for weight
        if (weight > 2.0 && weight <= 5.0) {
          price += 5000;
        } else if (weight > 5.0 && weight <= 10.0) {
          price += 15000; // 5000 for above 2kg + 10000 for above 5kg
        } else if (weight > 10.0) {
          price += 15000 + 12000 * (weight - 10);
        }
      }
    }
    
    // Add 25 Naira to all shipments
    price += 25;
    
    return Math.round(price);
  };

  // Update calculated price when relevant form data changes
  useEffect(() => {
    if (activeStep === 3) {
      setCalculatedPrice(calculateShippingPrice());
    }
  }, [formData, activeStep]);

  // Get payment options based on service type
  const getPaymentTypes = () => {
    if (formData.serviceType === 'international') {
      // International shipping only supports online payment
      return [
        { value: 'online', label: 'Pay Online', icon: faCreditCard, description: 'Pay online now for product and delivery' }
      ];
    } else {
      // Local and interstate support both payment options
      return [
        { value: 'onDelivery', label: 'Pay on Delivery', icon: faMoneyBillWave, description: 'Pay when package is delivered' },
        { value: 'online', label: 'Pay Online', icon: faCreditCard, description: 'Pay online now for product and delivery' }
      ];
    }
  };

  // Simulate getting user data from profile
  useEffect(() => {
    // In a real app, this would come from the user's profile
    const userProfile = {
      name: 'John Doe',
      phone: '+234 801 234 5678',
      address: '123, Lagos Street, Ikeja',
      state: 'Lagos',
      alternativePhone: '+234 802 345 6789',
      description: 'Regular customer',
      email: 'john.doe@example.com'
    };
    
    setFormData(prev => ({
      ...prev,
      senderName: userProfile.name,
      senderNumber: userProfile.phone,
      senderAlternativeNumber: userProfile.alternativePhone || '',
      senderAddress: userProfile.address,
      senderState: userProfile.state,
      senderDescription: userProfile.description || '',
      email: userProfile.email || '',
      pickupLocation: userProfile.address
    }));
  }, []);

  // Reset payment type when service type changes
  useEffect(() => {
    if (formData.serviceType) {
      // If international, automatically set payment to online
      if (formData.serviceType === 'international') {
        setFormData(prev => ({ ...prev, paymentType: 'online' }));
      } else {
        // For local and interstate, keep current payment type or reset if it doesn't match available options
        if (formData.paymentType && !getPaymentTypes().find(type => type.value === formData.paymentType)) {
          setFormData(prev => ({ ...prev, paymentType: '' }));
        }
      }
    }
  }, [formData.serviceType]);

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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      // Validate service type selection
      if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    }
    
    if (step === 1) {
      // Sender validation (should be pre-filled, but just in case)
      if (!formData.senderName || formData.senderName.trim() === '') newErrors.senderName = 'Sender name is required';
      if (!formData.senderNumber || formData.senderNumber.trim() === '') newErrors.senderNumber = 'Sender number is required';
      if (!formData.senderAddress || formData.senderAddress.trim() === '') newErrors.senderAddress = 'Sender address is required';
      if (!formData.senderState || formData.senderState.trim() === '') newErrors.senderState = 'Sender state is required';
      
      // Receiver validation
      if (!formData.receiverName || formData.receiverName.trim() === '') newErrors.receiverName = 'Receiver name is required';
      if (!formData.receiverNumber || formData.receiverNumber.trim() === '') newErrors.receiverNumber = 'Receiver number is required';
      if (!validatePhoneNumber(formData.receiverNumber)) newErrors.receiverNumber = 'Please enter a valid phone number';
      if (formData.receiverAlternativeNumber && !validatePhoneNumber(formData.receiverAlternativeNumber)) {
        newErrors.receiverAlternativeNumber = 'Please enter a valid phone number';
      }
      if (!formData.receiverAddress || formData.receiverAddress.trim() === '') newErrors.receiverAddress = 'Receiver address is required';
      
      // Validation based on service type
      if (formData.serviceType === 'local') {
        if (!formData.receiverState || formData.receiverState.trim() === '') {
          newErrors.receiverState = 'Receiver city is required';
        }
      } else if (formData.serviceType === 'interstate') {
        if (!formData.receiverState || formData.receiverState.trim() === '') {
          newErrors.receiverState = 'Receiver state is required';
        }
      } else if (formData.serviceType === 'international') {
        if (!formData.country || formData.country.trim() === '') {
          newErrors.country = 'Country is required for international shipping';
        }
      }
    }
    
    if (step === 2) {
      if (!formData.weight || formData.weight.trim() === '') newErrors.weight = 'Weight is required';
      if (!formData.pickupLocation || formData.pickupLocation.trim() === '') newErrors.pickupLocation = 'Pickup location is required';
      if (!formData.email || formData.email.trim() === '') newErrors.email = 'Email is required';
      if (!formData.numberOfItems || formData.numberOfItems.trim() === '') newErrors.numberOfItems = 'Number of items is required';
    }
    
    if (step === 3) {
      // Validate payment type selection
      if (!formData.paymentType) newErrors.paymentType = 'Payment type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 3));
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
          id: `SH${Math.floor(Math.random() * 100000)}`,
          ...formData,
          price: calculatedPrice,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0]
        };
        
        console.log('New shipment created:', newShipment);
        
        setLoading(false);
        setRequestSent(true);
        
        // After showing success message, redirect based on payment type
        setTimeout(() => {
          if (formData.paymentType === 'online') {
            navigate('/dashboard/user/payments', { state: { shipment: newShipment } });
          } else {
            navigate('/dashboard/user/shipments');
          }
        }, 2000);
      }, 1500);
    }
  };

  const getStepTitle = (step) => {
    switch(step) {
      case 0: return 'Select Service Type';
      case 1: return 'Sender & Receiver Details';
      case 2: return 'Package Information';
      case 3: return 'Payment & Review';
      default: return '';
    }
  };

  const renderStepContent = () => {
    switch(activeStep) {
      case 0:
        return (
          <div className="space-y-8">
            {/* Service Type Selection */}
            <div className="bg-purple-50 p-8 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Select Service Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceTypes.map((type) => (
                  <div 
                    key={type.value}
                    className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      formData.serviceType === type.value ? 'border-purple-500 bg-purple-100 shadow-md' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, serviceType: type.value }))}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        formData.serviceType === type.value ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <FontAwesomeIcon icon={type.icon} className="text-2xl" />
                      </div>
                      <h3 className="text-lg font-medium">{type.label}</h3>
                      <p className="text-sm text-gray-600 mt-2">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {errors.serviceType && <p className="mt-4 text-sm text-red-600 text-center">{errors.serviceType}</p>}
            </div>
            
            {/* Help Text */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mt-1 mr-4 text-xl" />
                <div>
                  <p className="text-lg font-medium text-blue-800">Next Steps</p>
                  <p className="text-blue-700 mt-2">After selecting your service type, you'll be able to fill in the shipment details and choose your payment method.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-8">
            {/* Sender Information (Pre-filled) */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                  Sender Information (From Your Profile)
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Pre-filled</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                  <input
                    type="tel"
                    name="senderNumber"
                    value={formData.senderNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternative number (optional)</label>
                  <input
                    type="tel"
                    name="senderAlternativeNumber"
                    value={formData.senderAlternativeNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                    </div>
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="senderAddress"
                    value={formData.senderAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                    placeholder="Enter street address"
                  />
                  {errors.senderAddress && <p className="mt-1 text-sm text-red-600">{errors.senderAddress}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <select
                    name="senderState"
                    value={formData.senderState}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-gray-50 ${errors.senderState ? 'border-red-500' : 'border-gray-300'}`}
                    disabled
                  >
                    <option value={formData.senderState}>{formData.senderState}</option>
                  </select>
                  {errors.senderState && <p className="mt-1 text-sm text-red-600">{errors.senderState}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="senderDescription"
                    value={formData.senderDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    rows="2"
                    readOnly
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Receiver Information */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-red-500 mr-2" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="receiverNumber"
                      value={formData.receiverNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.receiverNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter receiver's phone number"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                    </div>
                  </div>
                  {errors.receiverNumber && <p className="mt-1 text-sm text-red-600">{errors.receiverNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternative number (optional)</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="receiverAlternativeNumber"
                      value={formData.receiverAlternativeNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.receiverAlternativeNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter alternative contact number"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                    </div>
                  </div>
                  {errors.receiverAlternativeNumber && <p className="mt-1 text-sm text-red-600">{errors.receiverAlternativeNumber}</p>}
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
                
                {/* Dynamic location field based on service type */}
                {formData.serviceType === 'local' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City in Lagos *</label>
                    <select
                      name="receiverState"
                      value={formData.receiverState}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.receiverState ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">-- Select city in Lagos --</option>
                      {lagosCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.receiverState && <p className="mt-1 text-sm text-red-600">{errors.receiverState}</p>}
                  </div>
                )}
                
                {formData.serviceType === 'interstate' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select
                      name="receiverState"
                      value={formData.receiverState}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.receiverState ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">-- Select receiver's state --</option>
                      {nigerianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.receiverState && <p className="mt-1 text-sm text-red-600">{errors.receiverState}</p>}
                  </div>
                )}
                
                {/* Country field for international shipping */}
                {formData.serviceType === 'international' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">-- Select country --</option>
                      {internationalCountries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                  </div>
                )}
                
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
            
            {/* Help Text */}
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <div className="flex">
                <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Sender Information</p>
                  <p className="text-xs text-yellow-700">Your information is automatically filled from your profile. If you need to update it, please visit your profile page.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
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
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <FontAwesomeIcon icon={faBox} className="mr-1 text-red-500" /> Package Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            
            {/* Shipment Summary */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-medium text-gray-800 mb-3">Shipment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{formData.pickupLocation}, {formData.senderState}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{formData.receiverState || formData.country || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-medium">{serviceTypes.find(t => t.value === formData.serviceType)?.label || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Package Type</p>
                  <p className="font-medium">{packageTypes.find(t => t.value === formData.packageType)?.label || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            {/* Payment Type Selection */}
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Type</h3>
              
              {formData.serviceType === 'international' && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">International Shipping Payment</p>
                      <p className="text-xs text-blue-700 mt-1">For international shipments, payment must be made online before shipping.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getPaymentTypes().map((type) => (
                  <div 
                    key={type.value}
                    className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      formData.paymentType === type.value ? 'border-green-500 bg-green-100 shadow-md' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentType: type.value }))}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        formData.paymentType === type.value ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <FontAwesomeIcon icon={type.icon} className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{type.label}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.paymentType && <p className="mt-4 text-sm text-red-600 text-center">{errors.paymentType}</p>}
            </div>
            
            {/* Price Calculation Display */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Cost Calculation</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Service Type:</span>
                  <span className="font-medium">{serviceTypes.find(t => t.value === formData.serviceType)?.label || 'Not selected'}</span>
                </div>
                
                {formData.serviceType === 'local' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Base Rate:</span>
                      <span className="font-medium">
                        {getLagosAreaRate(formData.receiverState) ? 
                          `₦${getLagosAreaRate(formData.receiverState).baseRate}` : 
                          'Not calculated'}
                      </span>
                    </div>
                    {getLagosAreaRate(formData.receiverState) && getLagosAreaRate(formData.receiverState).additionalFee > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Additional Fee:</span>
                        <span className="font-medium">₦{getLagosAreaRate(formData.receiverState).additionalFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Service Fee:</span>
                      <span className="font-medium">₦500</span>
                    </div>
                  </div>
                )}
                
                {formData.serviceType === 'interstate' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Base Rate:</span>
                      <span className="font-medium">
                        {getZoneByState(formData.receiverState) ? 
                          `₦${interStateBaseRates[getZoneByState(formData.receiverState)]}` : 
                          'Not calculated'}
                      </span>
                    </div>
                    {parseFloat(formData.weight) > 1 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Extra Weight Fee:</span>
                        <span className="font-medium">₦{(parseFloat(formData.weight) - 1) * 1000}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {formData.serviceType === 'international' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Base Rate:</span>
                      <span className="font-medium">
                        {getZoneByCountry(formData.country) ? 
                          `₦${getZoneByCountry(formData.country) <= 4 ? 
                            [65000, 75000, 85000, 92500][getZoneByCountry(formData.country)-1] : 
                            97500}` : 
                          'Not calculated'}
                      </span>
                    </div>
                    {parseFloat(formData.weight) > 2 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Weight Surcharge:</span>
                        <span className="font-medium">
                          {parseFloat(formData.weight) > 10 ? 
                            `₦${15000 + 12000 * (parseFloat(formData.weight) - 10)}` : 
                            parseFloat(formData.weight) > 5 ? 
                            '₦15000' : 
                            '₦5000'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Processing Fee:</span>
                  <span className="font-medium">₦25</span>
                </div>
                
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Delivery Cost:</span>
                    <span className="text-xl font-bold text-green-600">
                      <FontAwesomeIcon icon={faNairaSign} className="mr-1" />
                      {calculatedPrice.toLocaleString()}
                    </span>
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
                      <p className="text-xs text-gray-500">Number</p>
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
                      <p className="text-xs text-gray-500">Number</p>
                      <p className="text-sm">{formData.receiverNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm">{formData.receiverAddress}</p>
                    </div>
                    {formData.serviceType === 'local' && (
                      <div>
                        <p className="text-xs text-gray-500">City in Lagos</p>
                        <p className="text-sm">{formData.receiverState}</p>
                      </div>
                    )}
                    {formData.serviceType === 'interstate' && (
                      <div>
                        <p className="text-xs text-gray-500">State</p>
                        <p className="text-sm">{formData.receiverState}</p>
                      </div>
                    )}
                    {formData.serviceType === 'international' && (
                      <div>
                        <p className="text-xs text-gray-500">Country</p>
                        <p className="text-sm">{formData.country}</p>
                      </div>
                    )}
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
                      <p className="text-sm">{packageTypes.find(t => t.value === formData.packageType)?.label || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Number of Items</p>
                      <p className="text-sm">{formData.numberOfItems || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3">Service & Payment</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Service Type</p>
                      <p className="text-sm">{serviceTypes.find(t => t.value === formData.serviceType)?.label || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Type</p>
                      <p className="text-sm">{getPaymentTypes().find(t => t.value === formData.paymentType)?.label || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Shipping Cost</p>
                      <p className="text-sm font-semibold text-green-600">
                        <FontAwesomeIcon icon={faNairaSign} className="mr-1" />
                        {calculatedPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-green-50 rounded-xl border border-green-200">
                <FontAwesomeIcon icon={faInfoCircle} className="text-green-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-800">Ready to book your shipment</p>
                  <p className="text-xs text-green-700">Please ensure all details are correct before submitting.</p>
                  {formData.paymentType === 'online' && (
                    <p className="text-xs text-green-700 mt-1">You will be redirected to the payment page after booking.</p>
                  )}
                  {formData.paymentType === 'onDelivery' && (
                    <p className="text-xs text-green-700 mt-1">Your shipment will be marked as pending until payment is collected upon delivery.</p>
                  )}
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
            <p className="text-gray-700 mb-2">Shipment ID: <span className="font-semibold">SH{Math.floor(Math.random() * 100000)}</span></p>
            <p className="text-gray-700">Status: <span className="font-semibold">Pending</span></p>
            <p className="text-gray-700">Shipping Cost: <span className="font-semibold">
              <FontAwesomeIcon icon={faNairaSign} className="mr-1" />
              {calculatedPrice.toLocaleString()}
            </span></p>
          </div>
          <p className="text-gray-600 mb-6">
            {formData.paymentType === 'online' 
              ? 'You will be redirected to the payment page shortly...' 
              : 'Your shipment will appear in your shipments page with pending status.'}
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
              <p className="mt-1 text-sm text-gray-600">Create a new shipment in a few simple steps</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => navigate('/dashboard/user')}
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
              {[0, 1, 2, 3].map((step) => (
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
                  {step < 3 && (
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
              onClick={activeStep === 0 ? () => navigate('/dashboard/user') : prevStep}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FontAwesomeIcon icon={activeStep === 0 ? faTimes : faChevronLeft} className="mr-2" />
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </button>
            
            {activeStep < 3 ? (
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
                    Book Shipment
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

export default NewShipment;