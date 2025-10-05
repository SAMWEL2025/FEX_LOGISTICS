import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faMapMarkerAlt, faBoxOpen, faTruck } from '@fortawesome/free-solid-svg-icons';

const TrackingTimeline = ({ trackingEvents }) => {
  const getEventIcon = (status, index, totalEvents) => {
    if (index === 0) {
      return <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600" />;
    } else if (index === totalEvents - 1) {
      return <FontAwesomeIcon icon={faBoxOpen} className="text-green-600" />;
    } else if (status === 'completed') {
      return <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />;
    } else if (status === 'in-transit') {
      return <FontAwesomeIcon icon={faTruck} className="text-blue-600" />;
    } else {
      return <FontAwesomeIcon icon={faCircle} className="text-gray-400" />;
    }
  };

  const getEventLineClass = (index, totalEvents) => {
    if (index === totalEvents - 1) return '';
    return index < totalEvents - 1 ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Tracking Timeline</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {trackingEvents.map((event, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full">
                {getEventIcon(event.status, index, trackingEvents.length)}
              </div>
              
              {/* Event content */}
              <div className="ml-6 pb-6">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{event.location}</h3>
                  <span className="text-sm text-gray-500">{event.timestamp}</span>
                </div>
                <p className="text-gray-600 mt-1">{event.description}</p>
                {event.notes && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    {event.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingTimeline;