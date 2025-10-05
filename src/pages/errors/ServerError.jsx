import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faHome, faRedo } from '@fortawesome/free-solid-svg-icons';

const ServerError = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <FontAwesomeIcon icon={faServer} className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">500 - Server Error</h2>
            <p className="mt-2 text-sm text-gray-600">
              Something went wrong on our end. Our team has been notified and is working on the issue.
            </p>
          </div>
          
          <div className="mt-6 space-y-3">
            <div className="rounded-md shadow">
              <Link
                to="/"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Go to Homepage
              </Link>
            </div>
            
            <div className="rounded-md shadow">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FontAwesomeIcon icon={faRedo} className="mr-2" />
                Try Again
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              If the problem persists, please contact our support team:
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> support@fexlogistics.com.ng
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> 09015179909 / 07046674299
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;