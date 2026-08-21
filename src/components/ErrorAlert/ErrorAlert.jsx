import React from 'react';

export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null;

  return (
    <div style={{
      maxWidth: '560px',
      margin: '24px auto',
      padding: '16px 20px',
      borderRadius: '12px',
      backgroundColor: '#fff5f5',
      border: '1px solid #fed7d7',
      borderLeft: '5px solid #e53e3e',
      boxShadow: '0 10px 15px -3px rgba(229, 62, 62, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '14px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'all 0.2s ease-in-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#fee2e2',
          flexShrink: 0
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <div>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: '#9b2c2c', lineHeight: 1.3 }}>
            Action Failed
          </h4>
          <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#c53030', lineHeight: 1.4 }}>
            {message}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '6px 12px',
            backgroundColor: '#ffffff',
            border: '1px solid #feb2b2',
            borderRadius: '6px',
            color: '#c53030',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Try Again
        </button>
      )}
    </div>
  );
}