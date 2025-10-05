import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faSearch,
  faBox,
  faMapMarkerAlt,
  faTruck,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faCalendarAlt,
  faUser,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Tracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trackingNumber, setTrackingNumber] = useState(id || '');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If we have an ID parameter, fetch the tracking data
  useEffect(() => {
    if (id) {
      setTrackingNumber(id);
      handleTrackShipment();
    }
  }, [id]);

  const handleTrackShipment = () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call to track shipment
    setTimeout(() => {
      // Mock tracking data
      const mockTrackingData = {
        id: trackingNumber,
        status: 'In Transit',
        estimatedDelivery: '2023-06-20',
        origin: '123, Lagos Street, Ikeja, Lagos',
        destination: '456, Abuja Road, Garki, Abuja',
        sender: {
          name: 'John Doe',
          phone: '+234 801 234 5678',
          email: 'john.doe@example.com'
        },
        receiver: {
          name: 'Jane Smith',
          phone: '+234 802 345 6789',
          email: 'jane.smith@example.com'
        },
        package: {
          weight: '5kg',
          dimensions: '30x20x15 cm',
          description: 'Electronics'
        },
        timeline: [
          {
            date: '2023-06-15',
            time: '09:30 AM',
            location: 'Lagos Office',
            status: 'Package Received',
            completed: true
          },
          {
            date: '2023-06-15',
            time: '02:45 PM',
            location: 'Lagos Sorting Facility',
            status: 'In Transit',
            completed: true
          },
          {
            date: '2023-06-16',
            time: '11:20 AM',
            location: 'Abuja Distribution Center',
            status: 'Out for Delivery',
            completed: true
          },
          {
            date: '2023-06-17',
            time: '10:00 AM',
            location: 'Destination',
            status: 'Delivered',
            completed: false
          }
        ]
      };

      setTrackingData(mockTrackingData);
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Package Received': return 'bg-blue-100 text-blue-800';
      case 'In Transit': return 'bg-yellow-100 text-yellow-800';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Package Received': return faBox;
      case 'In Transit': return faTruck;
      case 'Out for Delivery': return faMapMarkerAlt;
      case 'Delivered': return faCheckCircle;
      default: return faClock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Shipment</h1>
              <p className="mt-1 text-sm text-gray-600">Enter your tracking number to get real-time updates</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard/user')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tracking Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter tracking number (e.g., SH12345)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <button
              onClick={handleTrackShipment}
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  Track Shipment
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Shipment Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Shipment Status</h2>
                <div className="flex items-center mt-2 md:mt-0">
                  <FontAwesomeIcon 
                    icon={getStatusIcon(trackingData.status)} 
                    className={`mr-2 ${
                      trackingData.status === 'Delivered' ? 'text-green-500' :
                      trackingData.status === 'Out for Delivery' ? 'text-purple-500' :
                      trackingData.status === 'In Transit' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} 
                  />
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(trackingData.status)}`}>
                    {trackingData.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                  <p className="font-medium text-gray-900">{trackingData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                  <p className="font-medium text-gray-900">{trackingData.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Origin</p>
                  <p className="font-medium text-gray-900">{trackingData.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Destination</p>
                  <p className="font-medium text-gray-900">{trackingData.destination}</p>
                </div>
              </div>
            </div>

            {/* Sender & Receiver Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sender Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{trackingData.sender.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-3 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{trackingData.sender.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-3 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{trackingData.sender.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Receiver Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{trackingData.receiver.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-3 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{trackingData.receiver.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-3 w-5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{trackingData.receiver.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Weight</p>
                  <p className="font-medium text-gray-900">{trackingData.package.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Dimensions</p>
                  <p className="font-medium text-gray-900">{trackingData.package.dimensions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="font-medium text-gray-900">{trackingData.package.description}</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {trackingData.timeline.map((event, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        event.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <FontAwesomeIcon icon={getStatusIcon(event.status)} className="text-sm" />
                      </div>
                      <div className="ml-6 min-w-0 flex-1">
                        <div className="flex items-center mb-1">
                          <p className="text-sm font-medium text-gray-900 mr-2">{event.status}</p>
                          {!event.completed && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                          {event.date} at {event.time}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Tracking;