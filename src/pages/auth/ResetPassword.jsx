import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock, 
  faCheckCircle,
  faExclamationTriangle,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetError, setResetError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Check if form is valid whenever formData changes
  useEffect(() => {
    const isNewPasswordValid = formData.newPassword.trim() !== '' && formData.newPassword.length >= 8;
    const isConfirmPasswordValid = formData.confirmPassword.trim() !== '' && 
                                  formData.confirmPassword === formData.newPassword;
    setIsFormValid(isNewPasswordValid && isConfirmPasswordValid);
  }, [formData]);

  // Calculate password strength
  useEffect(() => {
    const password = formData.newPassword;
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [formData.newPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResetError('');
    setIsLoading(true);
    
    if (validateForm()) {
      // Simulate API call delay
      setTimeout(() => {
        // Simulate successful password reset
        setIsSubmitted(true);
        setIsLoading(false);
        
        // Redirect to login after success
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <div className="p-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <FontAwesomeIcon icon={['fas', 'arrow-left']} className="mr-2" />
            Back to Home
          </button>
        </div>
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-xl shadow-xl p-8 text-center">
              <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="text-red-500 text-5xl mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Reset Link</h2>
              <p className="text-gray-600 mb-6">
                The password reset link is invalid or has expired. Please request a new password reset.
              </p>
              <div className="space-y-3">
                <Link
                  to="/forgot-password"
                  className="block w-full py-3 px-6 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Request New Reset Link
                </Link>
                <Link
                  to="/auth/login"
                  className="block w-full py-3 px-6 bg-white text-red-600 border border-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Back to Home Button */}
      <div className="p-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-red-600 hover:text-red-800 transition-colors"
        >
          <FontAwesomeIcon icon={['fas', 'arrow-left']} className="mr-2" />
          Back to Home
        </button>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center shadow-lg">
              <div className="text-green-600 text-5xl mb-4 animate-pulse">
                <FontAwesomeIcon icon={['fas', 'check-circle']} />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Password Reset Successful!</h2>
              <p className="text-green-700 mb-4">
                Your password has been successfully updated. You can now log in with your new password.
              </p>
              <p className="text-green-600">
                Redirecting to login page...
              </p>
              <div className="mt-4">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <FontAwesomeIcon icon={['fas', 'lock']} className="text-red-600 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
                <p className="text-gray-600 mt-2">
                  Create a new password for your account
                </p>
              </div>
              
              {resetError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="text-red-500 mr-2" />
                    <span className="text-red-700">{resetError}</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="newPassword" className="block text-gray-700 mb-2 font-medium">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={['fas', 'lock']} className="text-gray-400" />
                    </div>
                    <input 
                      type={showNewPassword ? "text" : "password"} 
                      id="newPassword" 
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 px-4 py-3 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <FontAwesomeIcon 
                        icon={showNewPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']} 
                        className="text-gray-400 hover:text-gray-600" 
                      />
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {formData.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password strength</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength <= 25 ? 'text-red-600' : 
                          passwordStrength <= 50 ? 'text-orange-600' : 
                          passwordStrength <= 75 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {errors.newPassword && <p className="mt-1 text-red-500 text-sm">{errors.newPassword}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={['fas', 'lock']} className="text-gray-400" />
                    </div>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      id="confirmPassword" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <FontAwesomeIcon 
                        icon={showConfirmPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']} 
                        className="text-gray-400 hover:text-gray-600" 
                      />
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={['fas', 'shield-alt']} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-800">Password Requirements</h3>
                      <ul className="mt-1 text-sm text-blue-700 list-disc pl-5 space-y-1">
                        <li>At least 8 characters long</li>
                        <li>Include uppercase letters</li>
                        <li>Include numbers</li>
                        <li>Include special characters</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isFormValid 
                      ? 'bg-red-700 text-white hover:bg-red-800 transform hover:-translate-y-0.5 shadow-md' 
                      : 'bg-red-300 text-white cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting Password...
                    </span>
                  ) : 'Reset Password'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  Remember your password? <Link to="/auth/login" className="text-red-600 hover:underline font-medium">Back to Login</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;