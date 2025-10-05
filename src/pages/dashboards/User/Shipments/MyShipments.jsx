import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faSearch,
  faFilter,
  faEye,
  faTruck,
  faCheckCircle,
  faMoneyBillWave,
  faCreditCard,
  faBox,
  faMapMarkerAlt,
  faUser,
  faPhone,
  faCalendarAlt,
  faChevronRight,
  faArrowLeft,
  faExclamationTriangle,
  faClock,
  faUndo
} from '@fortawesome/free-solid-svg-icons';

const MyShipments = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

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
        status: 'In Transit',
        weight: '5kg',
        numberOfItems: '2'
      },
      {
        id: 'SH67890',
        date: '2023-06-10',
        senderName: 'John Doe',
        receiverName: 'Mike Johnson',
        pickupLocation: '123, Lagos Street, Ikeja',
        dropoffLocation: '789, Market Street, Surulere',
        serviceType: 'local',
        paymentType: 'cashOnDelivery',
        status: 'Delivered',
        weight: '2kg',
        numberOfItems: '1'
      },
      {
        id: 'SH24680',
        date: '2023-06-05',
        senderName: 'John Doe',
        receiverName: 'Sarah Williams',
        pickupLocation: '123, Lagos Street, Ikeja',
        dropoffLocation: 'London, UK',
        serviceType: 'international',
        paymentType: 'payNow',
        status: 'Out for Delivery',
        weight: '10kg',
        numberOfItems: '3'
      },
      {
        id: 'SH13579',
        date: '2023-06-01',
        senderName: 'John Doe',
        receiverName: 'David Brown',
        pickupLocation: '123, Lagos Street, Ikeja',
        dropoffLocation: 'Port Harcourt, Rivers',
        serviceType: 'interstate',
        paymentType: 'cashOnDelivery',
        status: 'Pending',
        weight: '3kg',
        numberOfItems: '1'
      },
      {
        id: 'SH11223',
        date: '2023-05-28',
        senderName: 'John Doe',
        receiverName: 'Robert Johnson',
        pickupLocation: '123, Lagos Street, Ikeja',
        dropoffLocation: 'Kaduna, Kaduna',
        serviceType: 'interstate',
        paymentType: 'cashOnDelivery',
        status: 'Returned',
        weight: '4kg',
        numberOfItems: '2'
      }
    ];

    setShipments(mockShipments);
    setFilteredShipments(mockShipments);
    setLoading(false);
  }, []);

  // Filter shipments based on search term and status
  useEffect(() => {
    let result = shipments;
    
    if (searchTerm) {
      result = result.filter(shipment => 
        shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(shipment => shipment.status === statusFilter);
    }
    
    setFilteredShipments(result);
  }, [searchTerm, statusFilter, shipments]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Returned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return faClock;
      case 'In Transit': return faTruck;
      case 'Out for Delivery': return faMapMarkerAlt;
      case 'Delivered': return faCheckCircle;
      case 'Returned': return faUndo;
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

  const handleViewTracking = (shipmentId) => {
    navigate(`/dashboard/user/shipments/tracking/${shipmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Shipments</h1>
              <p className="mt-1 text-sm text-gray-600">Track and manage all your shipments in one place</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => navigate('/dashboard/user')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Dashboard
              </button>
              <Link 
                to="/dashboard/user/shipments/new" 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                New Shipment
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by ID, receiver, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400 mr-2" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
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
            <p className="text-gray-500 mb-6">You don't have any shipments matching your search criteria.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => navigate('/dashboard/user')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Dashboard
              </button>
              <Link 
                to="/dashboard/user/shipments/new" 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Create New Shipment
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShipments.map((shipment) => (
              <div 
                key={shipment.id} 
                className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{shipment.id}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                        {shipment.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon 
                        icon={getStatusIcon(shipment.status)} 
                        className={`mr-2 ${
                          shipment.status === 'Pending' ? 'text-yellow-500' :
                          shipment.status === 'In Transit' ? 'text-blue-500' :
                          shipment.status === 'Out for Delivery' ? 'text-purple-500' :
                          shipment.status === 'Delivered' ? 'text-green-500' :
                          'text-red-500'
                        }`} 
                      />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Receiver</p>
                        <p className="font-medium text-gray-900">{shipment.receiverName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-medium text-gray-900">{shipment.dropoffLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <FontAwesomeIcon icon={faTruck} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Service Type</p>
                        <p className="font-medium text-gray-900">{getServiceTypeLabel(shipment.serviceType)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <FontAwesomeIcon icon={getPaymentTypeIcon(shipment.paymentType)} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment</p>
                        <p className="font-medium text-gray-900">{getPaymentTypeLabel(shipment.paymentType)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <FontAwesomeIcon icon={faBox} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Package Details</p>
                        <p className="font-medium text-gray-900">{shipment.weight}, {shipment.numberOfItems} item(s)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card Footer */}
                <div className="px-5 py-4 bg-gray-50 flex justify-between items-center">
                  {/* Payment Status */}
                  <div className="text-sm font-medium">
                    {shipment.status === 'Delivered' && shipment.paymentType === 'cashOnDelivery' ? (
                      <span className="text-green-600">Payment Confirmed</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleViewTracking(shipment.id)}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium transition-colors"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    Track Shipment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyShipments;