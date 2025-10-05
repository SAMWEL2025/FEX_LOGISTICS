import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell,
  faCheck,
  faTimes,
  faExclamationTriangle,
  faBox,
  faUser,
  faCalendarAlt,
  faClock,
  faEnvelopeOpen,
  faEnvelope,
  faArrowRight,
  faMapMarkerAlt,
  faCreditCard,
  faWeightHanging,
  faTimesCircle,
  faFilter,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

const Notifications = ({ setActiveTab }) => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [rejectingNotification, setRejectingNotification] = useState(null);

  // Simulate fetching notifications data
  useEffect(() => {
    // In a real app, this would come from an API
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'John Doe has requested a shipment from Lagos to Abuja',
        shipmentId: 'SH12345',
        timestamp: '2023-06-15 09:30 AM',
        read: false,
        data: {
          senderName: 'John Doe',
          receiverName: 'Jane Smith',
          pickupLocation: '123, Lagos Street, Ikeja',
          dropoffLocation: '456, Abuja Road, Garki',
          serviceType: 'interstate',
          paymentType: 'payNow',
          weight: '5kg',
          numberOfItems: '2',
          amount: 5000
        }
      },
      {
        id: 2,
        type: 'booking',
        title: 'New Booking Request',
        message: 'Robert Wilson has requested a shipment from Victoria Island to Port Harcourt',
        shipmentId: 'SH13579',
        timestamp: '2023-06-15 11:45 AM',
        read: false,
        data: {
          senderName: 'Robert Wilson',
          receiverName: 'Michael Johnson',
          pickupLocation: '456, Victoria Island',
          dropoffLocation: 'Port Harcourt, Rivers',
          serviceType: 'interstate',
          paymentType: 'cashOnDelivery',
          weight: '3kg',
          numberOfItems: '1',
          amount: 4000
        }
      },
      {
        id: 3,
        type: 'system',
        title: 'Shipment Delivered',
        message: 'Shipment SH67890 has been successfully delivered',
        shipmentId: 'SH67890',
        timestamp: '2023-06-14 04:20 PM',
        read: true,
        data: null
      },
      {
        id: 4,
        type: 'system',
        title: 'Payment Received',
        message: 'Payment of ₦25,000 received for shipment SH24680',
        shipmentId: 'SH24680',
        timestamp: '2023-06-13 02:15 PM',
        read: true,
        data: null
      }
    ];

    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
    setLoading(false);
  }, []);

  // Filter notifications based on type
  useEffect(() => {
    let result = notifications;
    
    if (filter !== 'all') {
      result = result.filter(notification => notification.type === filter);
    }
    
    setFilteredNotifications(result);
  }, [filter, notifications]);

  const handleApproveBooking = (notificationId, shipmentId) => {
    // In a real app, this would make an API call to approve the booking
    console.log(`Approved booking ${shipmentId}`);
    
    // Mark notification as read and remove it from the list
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    
    // Navigate to shipments page
    setActiveTab('shipments');
  };

  const handleRejectBooking = (notificationId, shipmentId) => {
    // Set the notification being rejected and show confirmation dialog
    setRejectingNotification({ id: notificationId, shipmentId });
    setShowRejectConfirm(true);
  };

  const confirmRejectBooking = () => {
    if (rejectingNotification) {
      // In a real app, this would make an API call to reject the booking
      console.log(`Rejected booking ${rejectingNotification.shipmentId}`);
      
      // Mark notification as read and remove it from the list
      setNotifications(prev => 
        prev.filter(notification => notification.id !== rejectingNotification.id)
      );
      
      // Reset state
      setRejectingNotification(null);
      setShowRejectConfirm(false);
    }
  };

  const cancelRejectBooking = () => {
    setRejectingNotification(null);
    setShowRejectConfirm(false);
  };

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedNotification(null);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'booking': return faExclamationTriangle;
      case 'system': return faBell;
      default: return faBell;
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'booking': return 'text-yellow-500';
      case 'system': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)} hours ago`;
    } else {
      return timestamp;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="mt-1 text-sm text-gray-600">View and manage booking requests</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveTab('shipments')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              View All Shipments
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-gray-900">{notifications.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Unread</p>
                <p className="text-xl font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-xl font-bold text-gray-900">
                  {notifications.filter(n => n.type === 'booking' && n.read).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-3">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-bold text-gray-900">
                  {notifications.filter(n => n.type === 'booking' && !n.read).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Notifications</option>
            <option value="booking">Booking Requests</option>
            <option value="system">System Notifications</option>
          </select>
        </div>
      </div>
      
      {/* Notifications List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faBell} className="text-red-500 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500 mb-6">You don't have any notifications matching your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`bg-white rounded-lg shadow overflow-hidden transition-all duration-300 ${
                !notification.read ? 'border-l-4 border-yellow-500' : 'border-l-4 border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-3 rounded-full mr-4 ${
                    !notification.read ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <FontAwesomeIcon 
                      icon={getNotificationIcon(notification.type)} 
                      className={`${getNotificationColor(notification.type)} ${
                        !notification.read ? 'text-yellow-600' : ''
                      }`} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-medium text-gray-900">{notification.title}</h3>
                          {!notification.read && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <FontAwesomeIcon icon={faClock} className="mr-1" />
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        {notification.shipmentId && (
                          <span className="text-sm font-medium text-gray-500 mr-2">
                            ID: {notification.shipmentId}
                          </span>
                        )}
                        <button 
                          onClick={() => handleViewDetails(notification)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{notification.message}</p>
                    
                    {/* Show shipment details for booking requests */}
                    {notification.type === 'booking' && notification.data && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Shipment Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Sender</p>
                              <p className="text-sm font-medium text-gray-900">{notification.data.senderName}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Receiver</p>
                              <p className="text-sm font-medium text-gray-900">{notification.data.receiverName}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">From</p>
                              <p className="text-sm font-medium text-gray-900">{notification.data.pickupLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">To</p>
                              <p className="text-sm font-medium text-gray-900">{notification.data.dropoffLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faWeightHanging} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Weight</p>
                              <p className="text-sm font-medium text-gray-900">{notification.data.weight}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCreditCard} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Amount</p>
                              <p className="text-sm font-medium text-gray-900">₦{notification.data.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div className="mt-4 flex justify-end">
                      {notification.type === 'booking' ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleApproveBooking(notification.id, notification.shipmentId)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center transition-colors"
                          >
                            <FontAwesomeIcon icon={faCheck} className="mr-2" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectBooking(notification.id, notification.shipmentId)}
                            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 flex items-center transition-colors"
                          >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setActiveTab('shipments')}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center transition-colors"
                        >
                          <FontAwesomeIcon icon={faBox} className="mr-2" />
                          View Shipment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification Details Modal */}
      {showDetailsModal && selectedNotification && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Background overlay with blur effect */}
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity"></div>
          
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-2xl sm:w-full">
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="h-5 w-5" />
              </button>
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedNotification.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {!selectedNotification.read && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Modal Body */}
              <div className="px-6 py-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {selectedNotification.timestamp}
                  </p>
                  <p className="text-gray-700 mt-2">{selectedNotification.message}</p>
                </div>
                
                {/* Show shipment details for booking requests */}
                {selectedNotification.type === 'booking' && selectedNotification.data && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Shipment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Shipment ID</p>
                        <p className="font-medium text-gray-900">{selectedNotification.shipmentId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium text-gray-900">₦{selectedNotification.data.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Sender</p>
                        <p className="font-medium text-gray-900">{selectedNotification.data.senderName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Receiver</p>
                        <p className="font-medium text-gray-900">{selectedNotification.data.receiverName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pickup Location</p>
                        <p className="font-medium text-gray-900">{selectedNotification.data.pickupLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Drop-off Location</p>
                        <p className="font-medium text-gray-900">{selectedNotification.data.dropoffLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Service Type</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedNotification.data.serviceType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Type</p>
                        <p className="font-medium text-gray-900 capitalize">
                          {selectedNotification.data.paymentType === 'payNow' ? 'Paid' : 'Cash on Delivery'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium text-gray-900">{selectedNotification.data.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Number of Items</p>
                        <p className="font-medium text-gray-900">{selectedNotification.data.numberOfItems}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <div className="flex justify-end gap-3">
                  {selectedNotification.type === 'booking' ? (
                    <>
                      <button
                        onClick={() => {
                          handleApproveBooking(selectedNotification.id, selectedNotification.shipmentId);
                          handleCloseModal();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Approve Booking
                      </button>
                      <button
                        onClick={() => {
                          handleRejectBooking(selectedNotification.id, selectedNotification.shipmentId);
                          handleCloseModal();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Reject Booking
                      </button>
                    </>
                  ) : null}
                  
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Background overlay with blur effect */}
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity"></div>
          
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-md sm:w-full">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 rounded-full bg-red-100 mr-3">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Confirm Rejection</h3>
                </div>
              </div>
              
              {/* Modal Body */}
              <div className="px-6 py-4">
                <p className="text-gray-700">
                  Are you sure you want to reject this booking request? This action cannot be undone.
                </p>
                {rejectingNotification && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      Booking ID: {rejectingNotification.shipmentId}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelRejectBooking}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRejectBooking}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Reject Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;