import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye,
  faCheck,
  faTimes,
  faTruck,
  faCheckCircle,
  faMoneyBillWave,
  faCreditCard,
  faBox,
  faMapMarkerAlt,
  faUser,
  faCalendarAlt,
  faExclamationTriangle,
  faWeightHanging,
  faClock,
  faFilter,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const AgentShipments = ({ setActiveTab }) => {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Simulate fetching shipments data
  useEffect(() => {
    // In a real app, this would come from an API
    const mockShipments = [
      {
        id: 'SH12345',
        date: '2023-06-15',
        senderName: 'John Doe',
        receiverName: 'Jane Smith',
        pickupLocation: '123, Lagos Street, Ikeja',
        dropoffLocation: '456, Abuja Road, Garki',
        serviceType: 'interstate',
        paymentType: 'payNow',
        status: 'Pending Approval',
        weight: '5kg',
        numberOfItems: '2',
        amount: 5000
      },
      {
        id: 'SH67890',
        date: '2023-06-10',
        senderName: 'Mike Johnson',
        receiverName: 'Sarah Williams',
        pickupLocation: '789, Market Street, Surulere',
        dropoffLocation: '321, Port Harcourt Road',
        serviceType: 'interstate',
        paymentType: 'cashOnDelivery',
        status: 'In Transit',
        weight: '2kg',
        numberOfItems: '1',
        amount: 3500
      },
      {
        id: 'SH24680',
        date: '2023-06-05',
        senderName: 'David Brown',
        receiverName: 'Emily Davis',
        pickupLocation: '123, Lagos Street, Ikeja',
        dropoffLocation: 'London, UK',
        serviceType: 'international',
        paymentType: 'payNow',
        status: 'Delivered',
        weight: '10kg',
        numberOfItems: '3',
        amount: 25000
      },
      {
        id: 'SH13579',
        date: '2023-06-01',
        senderName: 'Robert Wilson',
        receiverName: 'Michael Johnson',
        pickupLocation: '456, Victoria Island',
        dropoffLocation: 'Port Harcourt, Rivers',
        serviceType: 'interstate',
        paymentType: 'cashOnDelivery',
        status: 'Pending Approval',
        weight: '3kg',
        numberOfItems: '1',
        amount: 4000
      }
    ];

    setShipments(mockShipments);
    setFilteredShipments(mockShipments);
    setLoading(false);
  }, []);

  // Filter shipments based on status
  useEffect(() => {
    let result = shipments;
    
    if (statusFilter !== 'all') {
      result = result.filter(shipment => shipment.status === statusFilter);
    }
    
    setFilteredShipments(result);
  }, [statusFilter, shipments]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending Approval': return faExclamationTriangle;
      case 'In Transit': return faTruck;
      case 'Delivered': return faCheckCircle;
      case 'Rejected': return faTimes;
      default: return faBox;
    }
  };

  const getPaymentTypeLabel = (paymentType) => {
    return paymentType === 'payNow' ? 'Paid' : 'COD';
  };

  const getPaymentTypeIcon = (paymentType) => {
    return paymentType === 'payNow' ? faCreditCard : faMoneyBillWave;
  };

  const getServiceTypeLabel = (serviceType) => {
    return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
  };

  const handleApproveShipment = (shipmentId) => {
    // Update shipment status to "In Transit"
    setShipments(prev => 
      prev.map(shipment => 
        shipment.id === shipmentId 
          ? { ...shipment, status: 'In Transit' }
          : shipment
      )
    );
    
    // In a real app, this would make an API call
    console.log(`Approved shipment ${shipmentId}`);
  };

  const handleRejectShipment = (shipmentId) => {
    // Update shipment status to "Rejected"
    setShipments(prev => 
      prev.map(shipment => 
        shipment.id === shipmentId 
          ? { ...shipment, status: 'Rejected' }
          : shipment
      )
    );
    
    // In a real app, this would make an API call
    console.log(`Rejected shipment ${shipmentId}`);
  };

  const handleViewDetails = (shipment) => {
    setSelectedShipment(shipment);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedShipment(null);
  };

  const pendingCount = shipments.filter(s => s.status === 'Pending Approval').length;
  const inTransitCount = shipments.filter(s => s.status === 'In Transit').length;
  const deliveredCount = shipments.filter(s => s.status === 'Delivered').length;
  const rejectedCount = shipments.filter(s => s.status === 'Rejected').length;

  return (
    <div>
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Shipments</h1>
            <p className="mt-1 text-sm text-gray-600">Approve bookings and manage shipments</p>
          </div>
          <button 
            onClick={() => setActiveTab('notifications')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            View Pending Approvals ({pendingCount})
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-gray-900">{pendingCount}</p>
                </div>
              </div>
              <div className="text-yellow-500">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <FontAwesomeIcon icon={faTruck} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">In Transit</p>
                  <p className="text-xl font-bold text-gray-900">{inTransitCount}</p>
                </div>
              </div>
              <div className="text-blue-500">
                <FontAwesomeIcon icon={faTruck} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivered</p>
                  <p className="text-xl font-bold text-gray-900">{deliveredCount}</p>
                </div>
              </div>
              <div className="text-green-500">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-3">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rejected</p>
                  <p className="text-xl font-bold text-gray-900">{rejectedCount}</p>
                </div>
              </div>
              <div className="text-red-500">
                <FontAwesomeIcon icon={faTimes} />
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {/* Shipments List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : filteredShipments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faBox} className="text-red-500 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No shipments found</h3>
          <p className="text-gray-500 mb-6">You don't have any shipments matching your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredShipments.map((shipment) => (
            <div 
              key={shipment.id} 
              className={`bg-white rounded-lg shadow overflow-hidden border-l-4 transition-all duration-300 hover:shadow-md ${
                shipment.status === 'Pending Approval' ? 'border-yellow-500' :
                shipment.status === 'In Transit' ? 'border-blue-500' :
                shipment.status === 'Delivered' ? 'border-green-500' :
                shipment.status === 'Rejected' ? 'border-red-500' :
                'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{shipment.id}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center mb-3">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                      {shipment.date}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Customer</p>
                          <p className="text-sm font-medium text-gray-900">{shipment.senderName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mr-2 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Destination</p>
                          <p className="text-sm font-medium text-gray-900">{shipment.dropoffLocation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faTruck} className="text-gray-400 mr-2 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Service</p>
                          <p className="text-sm font-medium text-gray-900">{getServiceTypeLabel(shipment.serviceType)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={getPaymentTypeIcon(shipment.paymentType)} className="text-gray-400 mr-2 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Payment</p>
                          <p className="text-sm font-medium text-gray-900">{getPaymentTypeLabel(shipment.paymentType)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faWeightHanging} className="text-gray-400 mr-2 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Weight</p>
                          <p className="text-sm font-medium text-gray-900">{shipment.weight}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faBox} className="text-gray-400 mr-2 w-4" />
                        <div>
                          <p className="text-xs text-gray-500">Items</p>
                          <p className="text-sm font-medium text-gray-900">{shipment.numberOfItems}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-lg font-bold text-gray-900">₦{shipment.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                  {shipment.status === 'Pending Approval' ? (
                    <>
                      <button 
                        onClick={() => handleApproveShipment(shipment.id)}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectShipment(shipment.id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 flex items-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Reject
                      </button>
                    </>
                  ) : null}
                  
                  <button 
                    onClick={() => handleViewDetails(shipment)}
                    className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 flex items-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    View Details
                  </button>
                  
                  {shipment.status === 'In Transit' && (
                    <button 
                      onClick={() => setActiveTab('tracking')}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center transition-colors"
                    >
                      <FontAwesomeIcon icon={faTruck} className="mr-2" />
                      Update Tracking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Shipment Details Modal */}
      {showDetailsModal && selectedShipment && (
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
                    Shipment Details - {selectedShipment.id}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedShipment.status)}`}>
                      {selectedShipment.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Modal Body */}
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">{selectedShipment.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sender</p>
                      <p className="font-medium text-gray-900">{selectedShipment.senderName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Receiver</p>
                      <p className="font-medium text-gray-900">{selectedShipment.receiverName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-medium text-gray-900">{selectedShipment.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Drop-off Location</p>
                      <p className="font-medium text-gray-900">{selectedShipment.dropoffLocation}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Service Type</p>
                      <p className="font-medium text-gray-900">{getServiceTypeLabel(selectedShipment.serviceType)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Type</p>
                      <p className="font-medium text-gray-900">{getPaymentTypeLabel(selectedShipment.paymentType)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium text-gray-900">{selectedShipment.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Number of Items</p>
                      <p className="font-medium text-gray-900">{selectedShipment.numberOfItems}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">₦{selectedShipment.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <div className="flex justify-end gap-3">
                  {selectedShipment.status === 'Pending Approval' ? (
                    <>
                      <button
                        onClick={() => {
                          handleApproveShipment(selectedShipment.id);
                          handleCloseModal();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleRejectShipment(selectedShipment.id);
                          handleCloseModal();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Reject
                      </button>
                    </>
                  ) : selectedShipment.status === 'In Transit' ? (
                    <button
                      onClick={() => {
                        setActiveTab('tracking');
                        handleCloseModal();
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTruck} className="mr-2" />
                      Update Tracking
                    </button>
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
    </div>
  );
};

export default AgentShipments;