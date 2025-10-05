import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faCheckCircle,
  faExclamationTriangle,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check if form is valid whenever formData changes
  useEffect(() => {
    const isEmailValid = formData.email.trim() !== '' && /\S+@\S+\.\S+/.test(formData.email);
    const isPasswordValid = formData.password.trim() !== '';
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    if (validateForm()) {
      // Simulate API call delay
      setTimeout(() => {
        // Check credentials and redirect accordingly
        if (formData.email === 'admin@fexlogistics.com' && formData.password === 'admin123') {
          console.log("Redirecting to admin dashboard");
          setIsSubmitted(true);
          setTimeout(() => {
            navigate('/dashboard/admin');
          }, 1500);
        } else if (formData.email === 'agent@fexlogistics.com' && formData.password === 'agent123') {
          console.log("Redirecting to agent dashboard");
          setIsSubmitted(true);
          setTimeout(() => {
            navigate('/dashboard/agent');
          }, 1500);
        } else if (formData.email === 'user@example.com' && formData.password === 'user123') {
          console.log("Redirecting to user dashboard");
          setIsSubmitted(true);
          setTimeout(() => {
            navigate('/dashboard/user');
          }, 1500);
        } else if (formData.email === 'ecommerce@example.com' && formData.password === 'ecommerce123') {
          console.log("Redirecting to ecommerce dashboard");
          setIsSubmitted(true);
          setTimeout(() => {
            navigate('/dashboard/ecommerce');
          }, 1500);
        } else {
          console.log("Invalid credentials");
          setLoginError('Invalid email or password. Please try again.');
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Fex Logistics</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-800">Sign in to your account</h2>
          <p className="mt-2 text-gray-600">Welcome back! Please enter your details.</p>
        </div>
        
        {isSubmitted ? (
          <div className="text-center">
            <div className="text-green-600 text-5xl mb-4 animate-pulse">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Login Successful!</h2>
            <p className="text-green-700 mb-4">
              You have successfully logged in to your Fex Logistics account.
            </p>
            <p className="text-green-600">
              Redirecting to your dashboard...
            </p>
            <div className="mt-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
            </div>
          </div>
        ) : (
          <>
            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mr-2" />
                  <span className="text-red-700">{loginError}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
                    placeholder="john.doe@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-10 px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon 
                      icon={showPassword ? faEyeSlash : faEye} 
                      className="text-gray-400 hover:text-gray-600" 
                    />
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input 
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/auth/forgot-password" className="text-red-600 hover:underline">
                    Forgot password?
                  </Link>
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
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>
            
            <div className="text-center">
              <p className="text-gray-700">
                Don't have an account? <Link to="/auth/signup" className="text-red-600 hover:underline font-medium">Sign up</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;