import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faMapMarkerAlt, faCalendarAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import ShipmentStatusBadge from '../shipment/ShipmentStatusBadge.jsx';

const ShipmentCard = ({ shipment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Shipment #{shipment.id}</h3>
            <p className="text-sm text-gray-500">{shipment.date}</p>
          </div>
          <ShipmentStatusBadge status={shipment.status} />
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
            <span className="text-gray-600">From: </span>
            <span className="font-medium ml-1">{shipment.origin}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mr-2" />
            <span className="text-gray-600">To: </span>
            <span className="font-medium ml-1">{shipment.destination}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mr-2" />
            <span className="text-gray-600">Est. Delivery: </span>
            <span className="font-medium ml-1">{shipment.expectedDelivery}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBox} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">{shipment.packageType}</span>
          </div>
          
          <Link 
            to={`/dashboard/user/shipments/${shipment.id}`}
            className="flex items-center text-sm font-medium text-red-600 hover:text-red-800"
          >
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;