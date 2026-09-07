import React from 'react';
import './PhoneFrame.css';

interface PhoneFrameProps {
  children: React.ReactNode;
}

/**
 * DEMO ONLY — Phone frame container for browser preview.
 * This is NOT part of the production deliverable.
 * In a real React Native app, the OS provides this chrome.
 * Remove/ignore this wrapper when integrating into the actual 1Fi app.
 */
export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => (
  <div className="phone-frame-outer">
    <div className="phone-frame">
      {/* Status bar */}
      <div className="phone-frame__status-bar">
        <span className="phone-frame__time">9:41</span>
        <div className="phone-frame__status-icons">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4" />
            <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.6" />
            <rect x="9" y="0.5" width="3" height="11.5" rx="1" opacity="0.8" />
            <rect x="13.5" y="0" width="2.5" height="12" rx="1" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 24 18" fill="currentColor">
            <path d="M12 4.5C8.5 4.5 5.4 5.9 3.1 8.2L1 6.1C3.9 3.2 7.8 1.5 12 1.5s8.1 1.7 11 4.6l-2.1 2.1C18.6 5.9 15.5 4.5 12 4.5z" />
            <path d="M12 9c-2.2 0-4.2.9-5.6 2.4L4.3 9.3C6.3 7.3 8.9 6 12 6s5.7 1.3 7.7 3.3l-2.1 2.1C16.2 9.9 14.2 9 12 9z" />
            <circle cx="12" cy="16" r="2" />
          </svg>
          <div className="phone-frame__battery">
            <div className="phone-frame__battery-fill" />
          </div>
        </div>
      </div>
      {/* Content area */}
      <div className="phone-frame__content">{children}</div>
    </div>
  </div>
);
