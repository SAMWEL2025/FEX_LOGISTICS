import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">404 - Page Not Found</h2>
            <p className="mt-2 text-sm text-gray-600">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="mt-6">
            <div className="rounded-md shadow">
              <Link
                to="/"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Go to Homepage
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Or try one of these helpful links:
            </p>
            <div className="mt-4 space-y-2">
              <Link to="/services" className="block text-sm font-medium text-red-600 hover:text-red-500">
                Our Services
              </Link>
              <Link to="/quote" className="block text-sm font-medium text-red-600 hover:text-red-500">
                Get a Quote
              </Link>
              <Link to="/contact" className="block text-sm font-medium text-red-600 hover:text-red-500">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;