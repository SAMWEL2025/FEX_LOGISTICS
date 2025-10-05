import React, { useEffect, useRef } from 'react';

const TrackingMap = ({ shipment }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // In a real implementation, you would initialize a map library like Leaflet or Google Maps
    // For this example, we'll create a placeholder
    
    // This is where you would initialize your map
    // Example with Leaflet:
    // const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    
    // For this example, we'll just show a placeholder
    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <div class="text-center">
            <div class="text-gray-500 mb-2">Map View</div>
            <div class="text-sm text-gray-400">Tracking ID: ${shipment.id}</div>
            <div class="text-sm text-gray-400">Status: ${shipment.status}</div>
          </div>
        </div>
      `;
    }
    
    // Cleanup function
    return () => {
      if (mapElement) {
        mapElement.innerHTML = '';
      }
    };
  }, [shipment]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipment Route</h2>
      <div 
        ref={mapRef} 
        className="w-full h-64 rounded-lg bg-gray-100"
      >
        {/* Map will be rendered here */}
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div>
          <div className="text-gray-500">Origin</div>
          <div className="font-medium">{shipment.origin}</div>
        </div>
        <div>
          <div className="text-gray-500">Destination</div>
          <div className="font-medium">{shipment.destination}</div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;