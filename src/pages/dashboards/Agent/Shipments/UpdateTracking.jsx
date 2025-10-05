import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox,
  faMapMarkerAlt,
  faTruck,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faCalendarAlt,
  faSave
} from '@fortawesome/free-solid-svg-icons';

const UpdateTracking = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNote, setUpdateNote] = useState('');
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState('');

  // Simulate fetching approved shipments data
  useEffect(() => {
    // In a real app, this would come from an API
    const mockShipments = [
      { id: 'SH12345', status: 'In Transit' },
      { id: 'SH67890', status: 'In Transit' },
      { id: 'SH24680', status: 'Delivered' },
      { id: 'SH13579', status: 'Out for Delivery' }
    ];

    setShipments(mockShipments);
  }, []);

  const handleViewShipment = () => {
    if (!selectedShipment) {
      setError('Please select a shipment');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call to track shipment
    setTimeout(() => {
      // Mock tracking data
      const mockTrackingData = {
        id: selectedShipment,
        status: shipments.find(s => s.id === selectedShipment)?.status || 'In Transit',
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

  const handleUpdateTracking = () => {
    if (!updateStatus) {
      setError('Please select a status update');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call to update tracking
    setTimeout(() => {
      // Update the timeline with the new status
      const newEvent = {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        location: 'Updated by Agent',
        status: updateStatus,
        note: updateNote,
        completed: true
      };

      setTrackingData(prev => ({
        ...prev,
        status: updateStatus,
        timeline: [...prev.timeline, newEvent]
      }));

      // Update the shipment status in the list
      setShipments(prev => 
        prev.map(shipment => 
          shipment.id === selectedShipment 
            ? { ...shipment, status: updateStatus }
            : shipment
        )
      );

      setLoading(false);
      setUpdateStatus('');
      setUpdateNote('');
      
      // Show success message
      setError('Tracking updated successfully');
      setTimeout(() => setError(''), 3000);
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
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Update Tracking</h1>
        <p className="mt-1 text-sm text-gray-600">Update tracking information for shipments</p>
      </div>

      {/* Shipment Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Shipment</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={selectedShipment}
            onChange={(e) => setSelectedShipment(e.target.value)}
          >
            <option value="">Select a shipment</option>
            {shipments.map(shipment => (
              <option key={shipment.id} value={shipment.id}>
                {shipment.id} - {shipment.status}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleViewShipment}
          disabled={loading || !selectedShipment}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              View Shipment Details
            </>
          )}
        </button>
        
        {error && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            error.includes('success') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
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

          {/* Update Tracking Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Tracking</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Package Received">Package Received</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  placeholder="Add any additional information about this status update"
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                ></textarea>
              </div>
              
              <button
                onClick={handleUpdateTracking}
                disabled={loading}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Update Tracking
                  </>
                )}
              </button>
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
                      {event.note && (
                        <p className="text-sm text-gray-700 mt-1 italic">{event.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTracking;