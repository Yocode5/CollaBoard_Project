import React from 'react';

export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #a0c4c9',
        borderTop: '4px solid #178a63',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}