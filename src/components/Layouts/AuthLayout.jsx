import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Back to Home Button */}
      <div className="p-4">
        <Link 
          to="/"
          className="flex items-center text-red-600 hover:text-red-800 transition-colors"
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="md:flex">
              {/* Form Section */}
              <div className="md:w-2/3 p-8">
                {/* The Outlet will render the child component here */}
                <Outlet />
              </div>
              
              {/* Info Section */}
              <div className="md:w-1/3 bg-gradient-to-b from-red-600 to-red-700 p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                      <FontAwesomeIcon icon={['fas', 'check-circle']} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Fast & Reliable Delivery</h3>
                      <p className="text-sm text-red-100">
                        Experience swift and dependable logistics solutions tailored to your needs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                      <FontAwesomeIcon icon={['fas', 'check-circle']} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Real-time Tracking</h3>
                      <p className="text-sm text-red-100">
                        Track your shipments in real-time with our advanced tracking system.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                      <FontAwesomeIcon icon={['fas', 'check-circle']} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Competitive Pricing</h3>
                      <p className="text-sm text-red-100">
                        Get the best rates for all your logistics needs without compromising quality.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                      <FontAwesomeIcon icon={['fas', 'check-circle']} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">24/7 Customer Support</h3>
                      <p className="text-sm text-red-100">
                        Our dedicated team is always available to assist you with any queries.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                  <h3 className="font-bold text-lg mb-3">Need Help?</h3>
                  <p className="text-red-100 mb-4">
                    Our customer service team is available to assist you.
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <FontAwesomeIcon icon={['fas', 'phone']} className="mr-2" />
                      <span className="font-medium">09015179909</span>
                    </p>
                    <p className="flex items-center">
                      <FontAwesomeIcon icon={['fas', 'envelope']} className="mr-2" />
                      <span className="font-medium">support@fexlogistics.com.ng</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;