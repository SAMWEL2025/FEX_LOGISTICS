import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUsers,
  faChartBar,
  faSignOutAlt,
  faUser,
  faCog,
  faEye,
  faEdit,
  faTrash,
  faCheck,
  faTimes,
  faToggleOn,
  faToggleOff,
  faDownload,
  faRefresh,
  faSearch,
  faFilter,
  faBox,
  faTruck,
  faMoneyBillWave,
  faExclamationTriangle,
  faArrowUp,
  faArrowDown,
  faClock,
  faCalendarAlt,
  faChartLine,
  faBell,
  faChartPie
} from '@fortawesome/free-solid-svg-icons';

import ManageUsers from './ManageUsers';
import Reports from './Reports';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('month');
  
  const [stats, setStats] = useState({
    totalUsers: 42,
    activeUsers: 28,
    totalShipments: 87,
    revenue: 125000,
    pendingApprovals: 3,
    todayShipments: 12,
    weeklyGrowth: 8.2,
    systemHealth: 98.2
  });

  useEffect(() => {
    const checkSession = () => {
      setTimeout(() => {
        setUser({
          id: 1,
          name: 'Admin',
          email: 'admin@swiftlogickets.com',
          role: 'Administrator',
        });
        setSessionChecked(true);
      }, 500);
    };

    checkSession();
  }, []);

  const handleRefresh = () => {
    // Simulate data refresh
    setStats(prev => ({
      ...prev,
      totalShipments: prev.totalShipments + Math.floor(Math.random() * 3),
      revenue: prev.revenue + Math.floor(Math.random() * 5000)
    }));
  };

  const handleExport = () => {
    // Simulate export
    const dataStr = JSON.stringify(stats, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleLogout = () => {
    // Clear user session
    setUser(null);
    setSessionChecked(false);
    
    // In a real app, you would also clear any stored tokens
    // and redirect to login page
    console.log('User logged out');
  };

  const renderDashboard = () => (
    <>
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FontAwesomeIcon icon={faUsers} className="text-xl" />
            </div>
            <div className="flex items-center">
              <span className="text-xs text-green-500 flex items-center">
                <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                5.2%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">{stats.activeUsers} active</span>
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FontAwesomeIcon icon={faBox} className="text-xl" />
            </div>
            <div className="flex items-center">
              <span className="text-xs text-green-500 flex items-center">
                <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                8.7%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Shipments</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalShipments}</p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-blue-600">{stats.todayShipments} today</span>
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
            </div>
            <div className="flex items-center">
              <span className="text-xs text-yellow-500 flex items-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                {stats.pendingApprovals}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Pending Actions</p>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingApprovals}</p>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl" />
            </div>
            <div className="flex items-center">
              <span className="text-xs text-green-500 flex items-center">
                <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                15.3%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Revenue</p>
            <p className="text-3xl font-bold text-gray-900">₦{(stats.revenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Shipment Status Chart */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Status</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium">Delivered</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{Math.round(stats.totalShipments * 0.79)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '79%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm font-medium">In Transit</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{Math.round(stats.totalShipments * 0.15)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm font-medium">Pending</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{Math.round(stats.totalShipments * 0.06)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '6%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <button 
          onClick={() => setActiveTab('users')}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left group"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors mr-4">
              <FontAwesomeIcon icon={faUsers} className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage all users</p>
            </div>
          </div>
        </button>
        
        <button 
          onClick={() => setActiveTab('reports')}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left group"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors mr-4">
              <FontAwesomeIcon icon={faChartBar} className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
              <p className="text-sm text-gray-600">View system reports</p>
            </div>
          </div>
        </button>
        
        <button 
          onClick={handleExport}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left group"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors mr-4">
              <FontAwesomeIcon icon={faDownload} className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-600">Download reports</p>
            </div>
          </div>
        </button>
      </div>
    </>
  );

  const renderUsers = () => <ManageUsers />;
  const renderReports = () => <Reports />;

  const renderContent = () => {
    switch(activeTab) {
      case 'users':
        return renderUsers();
      case 'reports':
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'dashboard' 
                      ? 'bg-red-100 text-red-700 shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow'
                  }`}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'users' 
                      ? 'bg-red-100 text-red-700 shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow'
                  }`}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-3" />
                  <span>Users</span>
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                    activeTab === 'reports' 
                      ? 'bg-red-100 text-red-700 shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow'
                  }`}
                >
                  <FontAwesomeIcon icon={faChartBar} className="mr-3" />
                  <span>Reports</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default AdminDashboard;