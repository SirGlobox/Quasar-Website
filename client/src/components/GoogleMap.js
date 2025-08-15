import React from 'react';
import './GoogleMap.css';

const GoogleMap = () => {
  return (
    <div className="google-map-container">
      <iframe 
        src="https://storage.googleapis.com/maps-solutions-8re65ungul/locator-plus/c1m3/locator-plus.html"
        width="100%" 
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        title="Quasar Consultants Location Map"
      />
    </div>
  );
};

export default GoogleMap;
