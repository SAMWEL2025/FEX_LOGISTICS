// src/components/shipment/ShipmentStatusBadge.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTruck, faBoxOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ShipmentStatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          icon: faCheckCircle,
          color: 'bg-green-100 text-green-800',
          text: 'Delivered'
        };
      case 'in transit':
        return {
          icon: faTruck,
          color: 'bg-blue-100 text-blue-800',
          text: 'In Transit'
        };
      case 'processing':
        return {
          icon: faClock,
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Processing'
        };
      case 'shipped':
        return {
          icon: faBoxOpen,
          color: 'bg-purple-100 text-purple-800',
          text: 'Shipped'
        };
      case 'cancelled':
        return {
          icon: faTimesCircle,
          color: 'bg-red-100 text-red-800',
          text: 'Cancelled'
        };
      default:
        return {
          icon: faClock,
          color: 'bg-gray-100 text-gray-800',
          text: 'Unknown'
        };
    }
  };

  const { icon, color, text } = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {text}
    </span>
  );
};

export default ShipmentStatusBadge;