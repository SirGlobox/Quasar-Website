import React from 'react';
import './LightweightBackground.css';

const LightweightBackground = ({ className = '', ...props }) => {
  return (
    <div className={`lightweight-background ${className}`} {...props}>
      {/* Static star field using CSS */}
      <div className="stars-layer stars-small"></div>
      <div className="stars-layer stars-medium"></div>
      <div className="stars-layer stars-large"></div>
      
      {/* Subtle gradient overlay */}
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default LightweightBackground;
