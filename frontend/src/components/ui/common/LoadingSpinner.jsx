// src/components/ui/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '', children }) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`spinner-border ${sizeClasses[size]}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default LoadingSpinner;
