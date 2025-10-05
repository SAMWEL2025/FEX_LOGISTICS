import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope,
  faClock,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap -mx-6">
          {/* Contact Information */}
          <div className="w-full md:w-1/2 px-6 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Get In Touch</h2>
            
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
            
            {/* Company Values */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Our Values</h3>
              <p className="text-gray-700 mb-4">
                At Fex Logistics, our value lies in delivering reliable, customer focus, and efficient logistics solutions. 
                We are committed to integrity, customer satisfaction, and innovative operations that ensure every shipment arrives safely and on time.
              </p>
              <div className="flex items-center text-green-600 mb-2">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                <span>All parcels are a priority.</span>
              </div>
              <div className="flex items-center text-green-600">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                <span>All customers are valued.</span>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full md:w-1/2 px-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="service" className="block text-gray-700 mb-2">Service Interested In</label>
                  <select 
                    id="service" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">Select a service</option>
                    <option value="express-international">Express International</option>
                    <option value="cargo-shipping">Cargo Shipping</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="local-delivery">Local Delivery</option>
                    <option value="interstate">Interstate</option>
                    <option value="b2b-logistics">B2B Logistics</option>
                    <option value="air-sea-freight">Air/Sea Freight</option>
                    <option value="relocation">Relocation</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300 font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Company Stats */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why Choose Fex Logistics</h2>
          
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full md:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">4000+</div>
                <div className="text-gray-700">Successful Deliveries</div>
              </div>
            </div>
            
            <div className="w-full md:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
                <div className="text-gray-700">Satisfied Customers</div>
              </div>
            </div>
            
            <div className="w-full md:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">2022</div>
                <div className="text-gray-700">Year of Operation</div>
              </div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mt-12 bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Our Key Features</h3>
            <div className="flex flex-wrap justify-center">
              <div className="flex items-center mx-4 mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
                <span className="font-semibold">Availability</span>
              </div>
              <div className="flex items-center mx-4 mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
                <span className="font-semibold">Accessibility</span>
              </div>
              <div className="flex items-center mx-4 mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
                <span className="font-semibold">Reliable</span>
              </div>
              <div className="flex items-center mx-4 mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
                <span className="font-semibold">Safe</span>
              </div>
              <div className="flex items-center mx-4 mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
                <span className="font-semibold">Efficiency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;