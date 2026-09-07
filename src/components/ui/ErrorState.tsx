import React from 'react';
import './ErrorState.css';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="error-state" role="alert">
    <div className="error-state__icon" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#E53E3E" strokeWidth="2" fill="#FFF5F5" />
        <path d="M24 14v14" stroke="#E53E3E" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="33" r="1.5" fill="#E53E3E" />
      </svg>
    </div>
    <p className="error-state__message">{message}</p>
    {onRetry && (
      <button
        id="error-retry-btn"
        className="error-state__retry-btn"
        onClick={onRetry}
        type="button"
      >
        Try again
      </button>
    )}
  </div>
);
