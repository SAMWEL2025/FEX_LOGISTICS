import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faCheckCircle,
  faExclamationTriangle,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-600">Reset your password in a few simple steps</p>
      </div>
      
      {isSubmitted ? (
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Email Sent!</h2>
          <p className="text-gray-700 mb-6">
            We've sent a password reset link to <span className="font-semibold">{email}</span>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
          <p className="text-gray-600 mb-6">
            If you don't receive the email within a few minutes, please check your spam folder.
          </p>
          <button 
            onClick={() => navigate('/auth/login')}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                isLoading 
                  ? 'bg-red-400 text-white cursor-not-allowed' 
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  Send Reset Link
                </span>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Remember your password? <Link to="/auth/login" className="text-red-600 hover:text-red-800 font-medium">Back to Login</Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;