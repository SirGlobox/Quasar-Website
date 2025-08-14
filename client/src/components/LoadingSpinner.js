import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(13, 7, 26, 0.9)',
      zIndex: 9999,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Animated spinner */}
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(162, 89, 247, 0.3)',
          borderTop: '3px solid #A259F7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        
        {/* Loading text */}
        <div style={{
          color: '#A259F7',
          fontSize: '16px',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          Loading...
        </div>
      </div>
      
      {/* CSS animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
