import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope,
  faClock,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const Location = () => {
  // State for expanded location boxes
  const [expandedLocation, setExpandedLocation] = useState(null);
  
  // Toggle location box expansion
  const toggleLocation = (index) => {
    if (expandedLocation === index) {
      setExpandedLocation(null);
    } else {
      setExpandedLocation(index);
    }
  };

  // Interstate locations data
  const interstateLocations = [
    {
      city: "Abuja",
      addresses: [
        "Block 22 Store 13 Dutse-Pe Model Army Estate Kubwa. Abuja",
        "Sahara 4 Estate Lokogoma Abuja",
        "Jabi First Gate Abuja"
      ]
    },
    {
      city: "Asaba",
      addresses: [
        "Okpanam road by kingdom hall junction No 12 isidore olele street beside dexmian medical laboratory off Kingdom Hall Asaba"
      ]
    },
    {
      city: "Ibadan",
      addresses: [
        "Inside Mobil filling station opposite challenge terminal Falana challenge Ibadan"
      ]
    },
    {
      city: "Uyo",
      addresses: [
        "No.23 monsignor akpan road, opposite slaughter (central abbatoir & livestock) itam. uyo"
      ]
    },
    {
      city: "Aba",
      addresses: [
        "Shop 75 Laurel plaza by osisioma ABA"
      ]
    },
    {
      city: "Bayelsa",
      addresses: [
        "Shop 65 ekeki park, Mbiama-Yenagoa Road, okaka bayelsa."
      ]
    },
    {
      city: "Port Harcourt",
      addresses: [
        "NO.19 EKERE STREET RUMUBIAKANI BRIDGE BUSTOP Port Harcourt ABA EXPRESS WAY."
      ]
    },
    {
      city: "Warri",
      addresses: [
        "PMB 1221 FUPRE road, Effurun, Warri 330102, Delta"
      ]
    },
    {
      city: "Ugheli",
      addresses: [
        "13 Uduere Agbarha Road, opp Otovwodo Secondary School"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Locations</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Visit us at any of our offices or get in touch with our team for any inquiries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap -mx-6">
          {/* Contact Information */}
          <div className="w-full md:w-1/2 px-6 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Visit Our Headquarters</h2>
            
            <div className="mb-8">
              <div className="flex items-start mb-6">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 mt-1 mr-4 text-xl" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Address</h3>
                  <p className="text-gray-600">No.25 Osolo way Ajao. Off Airport Rd Lagos. Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faPhone} className="text-red-600 mr-4 text-xl" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">09015179909 / 07046674299</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faEnvelope} className="text-red-600 mr-4 text-xl" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-600">support@fexlogistics.com.ng</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FontAwesomeIcon icon={faClock} className="text-red-600 mt-1 mr-4 text-xl" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Opening Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 8.00 AM - 5.00 PM</p>
                  <p className="text-gray-600">Saturday: 9.00 AM - 3.00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            {/* Directions */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Getting Here</h3>
              <p className="text-gray-700 mb-4">
                Our office is conveniently located on Osolo way, just off Airport Road in Ajao, Lagos. 
                We are easily accessible by both public and private transportation.
              </p>
              <p className="text-gray-700">
                For those driving, there is ample parking space available at our premises. 
                If you're using public transport, several bus routes serve the area with stops nearby.
              </p>
            </div>
          </div>
          
          {/* Map */}
          <div className="w-full md:w-1/2 px-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Find Us on the Map</h2>
              
              {/* Map Embed */}
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-lg" style={{ height: '400px' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5279035090225!2d3.319914314768462!3d6.565766995266533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9229d5a6b4b9%3A0x8b3b1e4a3b3b1e4a!2sOsolo%20Way%2C%20Ajao%20Estate%2C%20Lagos!5e0!3m2!1sen!2sng!4v1629234567890!5m2!1sen!2sng" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Fex Logistics Location Map"
                  ></iframe>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-bold text-lg mb-2 text-red-800">Need Directions?</h3>
                <p className="text-gray-700">
                  Call us at <span className="font-semibold">09015179909</span> and our team will be happy to provide you with detailed directions to our office.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interstate Locations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Interstate Locations</h2>
          
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interstateLocations.map((location, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div 
                    className="bg-red-600 text-white p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleLocation(index)}
                  >
                    <h3 className="text-xl font-bold">{location.city}</h3>
                    <FontAwesomeIcon 
                      icon={expandedLocation === index ? faChevronUp : faChevronDown} 
                      className="text-white"
                    />
                  </div>
                  
                  <div className={`p-4 bg-white ${expandedLocation === index ? 'block' : 'hidden'}`}>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Address(es):</h4>
                      {location.addresses.map((address, addrIndex) => (
                        <div key={addrIndex} className="flex items-start mb-3">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 mt-1 mr-2" />
                          <p className="text-gray-700">{address}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-1">Contact Information:</h4>
                      <p className="text-gray-700 text-sm">Phone: 09015179909 / 07046674299</p>
                      <p className="text-gray-700 text-sm">Email: support@fexlogistics.com.ng</p>
                    </div>
                  </div>
                  
                  {expandedLocation !== index && (
                    <div className="p-4 bg-gray-50">
                      <p className="text-gray-600 text-sm">Click to view address details</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Can't find your location? Contact us at <span className="font-semibold">support@fexlogistics.com.ng</span> 
                or call <span className="font-semibold">09015179909</span> for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;