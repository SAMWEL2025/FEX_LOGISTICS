import React, { useState, useEffect } from 'react';
import { Link, useLocation, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faBox, 
  faPlus, 
  faUser,
  faBell,
  faBars,
  faTimes,
  faSignOutAlt,
  faWallet,
  faSearchLocation,
  faArrowLeft,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

// Updated imports to match new structure
import MyShipments from './Shipments/MyShipments';
import NewShipment from './Shipments/NewShipment';
import Tracking from './Shipments/Tracking';
import Profile from './Profile';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'New Feature Available', message: 'You can now track shipments in real-time', time: '2 hours ago' },
    { id: 2, type: 'success', title: 'Shipment Delivered', message: 'Your shipment SH12345 has been delivered', time: '1 day ago' },
    { id: 3, type: 'warning', title: 'Payment Pending', message: 'Payment for shipment SH67890 is pending', time: '2 days ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Check user session on component mount
  useEffect(() => {
    // In a real app, this would check for a valid session token
    // For demo purposes, we'll simulate a logged-in user
    const checkSession = () => {
      // Simulate API call to check session
      setTimeout(() => {
        setUser({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          type: 'Regular User'
          // Removed balance property
        });
        setSessionChecked(true);
      }, 500);
    };

    checkSession();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    // In a real app, this would clear the session token
    // For demo purposes, we'll just clear the user state and redirect
    setUser(null);
    // Clear any stored session data
    localStorage.removeItem('userToken');
    // Redirect to login page - updated path to match project structure
    navigate('/auth/login');
  };

  // Function to handle navigation to tracking page
  const handleTrackingClick = () => {
    navigate('/dashboard/user/shipments/tracking');
    setSidebarOpen(false);
  };

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/shipments') && !path.includes('/new') && !path.includes('/tracking')) {
      return 'shipments';
    }
    if (path.includes('/shipments/new')) return 'new-shipment';
    if (path.includes('/shipments/tracking')) return 'tracking';
    if (path.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  // Get tab title for navbar
  const getTabTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'shipments': return 'My Shipments';
      case 'new-shipment': return 'New Shipment';
      case 'tracking': return 'Track Shipment';
      case 'profile': return 'My Profile';
      default: return 'Dashboard';
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return faCheckCircle;
      case 'warning': return faExclamationTriangle;
      case 'info': return faInfoCircle;
      default: return faInfoCircle;
    }
  };

  // Get notification color based on type
  const getNotificationColor = (type) => {
    switch(type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-blue-500';
    }
  };

  // Simple Dashboard Home Component
  const DashboardHome = () => {
    // Mock data - in a real app, this would come from an API
    const stats = {
      totalShipments: 12,
      inTransit: 3,
      delivered: 8,
      pending: 1
    };

    const recentShipments = [
      { id: 'SH12345', origin: 'Lagos', destination: 'Abuja', status: 'In Transit', date: '2023-05-15' },
      { id: 'SH12346', origin: 'Port Harcourt', destination: 'Kano', status: 'Delivered', date: '2023-05-10' },
      { id: 'SH12347', origin: 'Abuja', destination: 'Enugu', status: 'Pending', date: '2023-05-18' }
    ];

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FontAwesomeIcon icon={faBox} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Total Shipments</h3>
                <p className="text-2xl font-bold">{stats.totalShipments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FontAwesomeIcon icon={faTachometerAlt} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">In Transit</h3>
                <p className="text-2xl font-bold">{stats.inTransit}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Delivered</h3>
                <p className="text-2xl font-bold">{stats.delivered}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Pending</h3>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/dashboard/user/shipments" 
            className="bg-white p-6 rounded-lg shadow flex items-center hover:shadow-md transition-shadow"
          >
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FontAwesomeIcon icon={faBox} className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">View Shipments</h3>
              <p className="text-gray-600">Manage your existing shipments</p>
            </div>
          </Link>
          
          <Link 
            to="/dashboard/user/shipments/new" 
            className="bg-white p-6 rounded-lg shadow flex items-center hover:shadow-md transition-shadow"
          >
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FontAwesomeIcon icon={faPlus} className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Create Shipment</h3>
              <p className="text-gray-600">Book a new shipment</p>
            </div>
          </Link>
          
          <button 
            onClick={handleTrackingClick}
            className="bg-white p-6 rounded-lg shadow flex items-center hover:shadow-md transition-shadow text-left"
          >
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FontAwesomeIcon icon={faSearchLocation} className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Track Shipment</h3>
              <p className="text-gray-600">Track your package in real-time</p>
            </div>
          </button>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <Link to="/dashboard/user/shipments" className="text-red-600 hover:text-red-800">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentShipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.origin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Show loading while checking session
  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-red-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Session Expired</h2>
            <p className="text-gray-600 mt-2">Please log in again to continue</p>
          </div>
          <Link
            to="/auth/login"  // Updated path to match project structure
            className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 inline-block text-center"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 focus:outline-none"
          >
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} className="text-xl" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">{getTabTitle()}</h1>
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Recent Updates</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No updates
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className="p-4 border-b border-gray-200 bg-white"
                      >
                        <div className="flex items-start">
                          <div className={`mr-3 mt-1 ${getNotificationColor(notification.type)}`}>
                            <FontAwesomeIcon icon={getNotificationIcon(notification.type)} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleSidebar}></div>
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-50">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faUser} className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.type}</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/dashboard/user"
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      activeTab === 'dashboard' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard/user/shipments"
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      activeTab === 'shipments' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon icon={faBox} className="mr-3" />
                    My Shipments
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard/user/shipments/new"
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      activeTab === 'new-shipment' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-3" />
                    New Shipment
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleTrackingClick}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      activeTab === 'tracking' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon icon={faSearchLocation} className="mr-3" />
                    Track Shipment
                  </button>
                </li>
                <li>
                  <Link 
                    to="/dashboard/user/profile"
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      activeTab === 'profile' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/auth/login"  // Updated path to match project structure
                    onClick={handleSignOut}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      activeTab === 'signout' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                    Sign Out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area - Added more padding-top for mobile */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-24 md:pt-6">
        <div className="flex flex-col md:flex-row">
          {/* Desktop Sidebar */}
          <div className="hidden md:block md:w-64 mb-6 md:mb-0 md:mr-6">
            <div className="bg-white rounded-lg shadow p-4 sticky top-6">
              <div className="mb-6 p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faUser} className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.type}</p>
                  </div>
                </div>
              </div>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/dashboard/user"
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        activeTab === 'dashboard' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/user/shipments"
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        activeTab === 'shipments' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={faBox} className="mr-3" />
                      My Shipments
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/user/shipments/new"
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        activeTab === 'new-shipment' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-3" />
                      New Shipment
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleTrackingClick}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        activeTab === 'tracking' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={faSearchLocation} className="mr-3" />
                      Track Shipment
                    </button>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/user/profile"
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        activeTab === 'profile' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-3" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/auth/login"  // Updated path to match project structure
                      onClick={handleSignOut}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                        activeTab === 'signout' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              {/* Most specific routes first */}
              <Route path="shipments/new" element={<NewShipment />} />
              <Route path="shipments/tracking/:id" element={<Tracking />} />
              <Route path="shipments/tracking" element={<Tracking />} />
              <Route path="shipments" element={<MyShipments />} />
              <Route path="profile" element={<Profile />} />
              {/* Default route last */}
              <Route path="*" element={<DashboardHome />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;