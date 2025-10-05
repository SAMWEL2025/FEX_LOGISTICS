import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartBar,
  faDownload,
  faCalendarAlt,
  faBox,
  faUsers,
  faMoneyBillWave,
  faTruck,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [loading, setLoading] = useState(false);

  const reportsData = {
    month: {
      totalShipments: 1247,
      delivered: 987,
      pending: 156,
      revenue: 2450000,
      activeUsers: 89,
      newUsers: 23
    },
    week: {
      totalShipments: 312,
      delivered: 245,
      pending: 67,
      revenue: 612500,
      activeUsers: 89,
      newUsers: 5
    },
    year: {
      totalShipments: 14964,
      delivered: 11844,
      pending: 3120,
      revenue: 29400000,
      activeUsers: 89,
      newUsers: 156
    }
  };

  const currentData = reportsData[selectedPeriod];

  const handleExport = () => {
    setLoading(true);
    // Simulate export
    setTimeout(() => {
      setLoading(false);
      alert('Report exported successfully!');
    }, 1500);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Reports</h2>
        <div className="flex items-center space-x-4">
          
          <button
            onClick={handleExport}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            ) : (
              <>
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Export
              </>
            )}
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
              <FontAwesomeIcon icon={faBox} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Shipments</p>
              <p className="text-2xl font-bold">{currentData.totalShipments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold">{currentData.delivered}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold">{currentData.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-3">
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold">₦{(currentData.revenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Shipment Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Delivered</span>
              <span className="text-sm font-medium">{currentData.delivered}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(currentData.delivered / currentData.totalShipments) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="text-sm font-medium">{currentData.pending}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${(currentData.pending / currentData.totalShipments) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="text-sm font-medium">{currentData.activeUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Users</span>
              <span className="text-sm font-medium">{currentData.newUsers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;