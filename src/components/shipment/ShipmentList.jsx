import React from 'react';
import { Link } from 'react-router-dom';
import ShipmentStatusBadge from './ShipmentStatusBadge.jsx';

const ShipmentList = ({ shipments, title, showActions = true, emptyMessage = "No shipments found" }) => {
  if (!shipments || shipments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
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
              {showActions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.origin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ShipmentStatusBadge status={shipment.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.date}</td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/dashboard/user/shipments/${shipment.id}`} className="text-red-600 hover:text-red-900 mr-3">
                      View
                    </Link>
                    <Link to={`/dashboard/user/tracking/${shipment.id}`} className="text-blue-600 hover:text-blue-900">
                      Track
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentList;