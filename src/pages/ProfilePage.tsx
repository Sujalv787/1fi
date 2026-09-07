import React, { useState } from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { BottomNav } from '../components/layout/BottomNav';
import { Badge } from '../components/ui/Badge';
import './ProfilePage.css';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: 'profile-kyc', icon: '🛡️', label: 'KYC Status', value: 'Verified', valueType: 'success' as const },
      { id: 'profile-bank', icon: '🏦', label: 'Linked Bank Account', value: 'HDFC ••••4821', valueType: 'neutral' as const },
      { id: 'profile-nominees', icon: '👨‍👩‍👧', label: 'Nominees', value: '1 Added', valueType: 'neutral' as const },
    ],
  },
  {
    title: 'Investments',
    items: [
      { id: 'profile-portfolio', icon: '📊', label: 'My Portfolio', value: '₹7.5L pledged', valueType: 'brand' as const },
      { id: 'profile-statements', icon: '📄', label: 'Account Statements', value: null, valueType: 'neutral' as const },
      { id: 'profile-tax', icon: '🧾', label: 'Tax Documents', value: 'FY 2025-26', valueType: 'neutral' as const },
    ],
  },
  {
    title: 'Security',
    items: [
      { id: 'profile-mpin', icon: '🔐', label: 'Change MPIN', value: null, valueType: 'neutral' as const },
      { id: 'profile-biometric', icon: '👆', label: 'Biometric Login', value: 'Enabled', valueType: 'success' as const },
      { id: 'profile-devices', icon: '📱', label: 'Trusted Devices', value: '1 Device', valueType: 'neutral' as const },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'profile-help', icon: '💬', label: 'Help & Support', value: null, valueType: 'neutral' as const },
      { id: 'profile-faq', icon: '❓', label: 'FAQ', value: null, valueType: 'neutral' as const },
      { id: 'profile-about', icon: 'ℹ️', label: 'About 1Fi', value: 'v2.4.1', valueType: 'neutral' as const },
    ],
  },
];

export const ProfilePage: React.FC = () => {
  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <div className="profile-page">
      <AppHeader title="Profile" showBack />

      <div className="profile-page__scroll">
        {/* Avatar & Name */}
        <div className="profile-hero">
          <div className="profile-avatar">
            <span className="profile-avatar__initials">SJ</span>
            <div className="profile-avatar__verified">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none">
                <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          </div>
          <div className="profile-hero__info">
            <h2 className="profile-hero__name">Sujal Jarwal</h2>
            <p className="profile-hero__phone">+91 98765 43210</p>
            <p className="profile-hero__email">sujal.jarwal@email.com</p>
          </div>
          <button id="profile-edit-btn" className="profile-edit-btn">Edit</button>
        </div>

        {/* Credit Summary Card */}
        <div className="profile-credit-card">
          <div className="profile-credit-card__item">
            <p className="profile-credit-card__value">₹7,50,000</p>
            <p className="profile-credit-card__label">Credit Limit</p>
          </div>
          <div className="profile-credit-card__divider" />
          <div className="profile-credit-card__item">
            <p className="profile-credit-card__value">₹4,94,000</p>
            <p className="profile-credit-card__label">Available</p>
          </div>
          <div className="profile-credit-card__divider" />
          <div className="profile-credit-card__item">
            <div className="profile-credit-card__value profile-credit-card__value--badge">
              <Badge variant="success" size="sm">Active</Badge>
            </div>
            <p className="profile-credit-card__label">Status</p>
          </div>
        </div>

        {/* Notifications toggle */}
        <div className="profile-section">
          <div className="profile-menu-item">
            <span className="profile-menu-item__icon">🔔</span>
            <span className="profile-menu-item__label">Notifications</span>
            <button
              id="profile-notifications-toggle"
              className={`profile-toggle ${notificationsOn ? 'profile-toggle--on' : ''}`}
              onClick={() => setNotificationsOn((v) => !v)}
              role="switch"
              aria-checked={notificationsOn}
            >
              <div className="profile-toggle__thumb" />
            </button>
          </div>
        </div>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <div key={section.title} className="profile-section">
            <p className="profile-section__title">{section.title}</p>
            <div className="profile-menu">
              {section.items.map((item, idx) => (
                <button
                  key={item.id}
                  id={item.id}
                  className={`profile-menu-item ${idx < section.items.length - 1 ? 'profile-menu-item--bordered' : ''}`}
                >
                  <span className="profile-menu-item__icon">{item.icon}</span>
                  <span className="profile-menu-item__label">{item.label}</span>
                  <div className="profile-menu-item__right">
                    {item.value && item.valueType === 'success' && (
                      <Badge variant="success" size="sm">{item.value}</Badge>
                    )}
                    {item.value && item.valueType === 'brand' && (
                      <Badge variant="brand" size="sm">{item.value}</Badge>
                    )}
                    {item.value && item.valueType === 'neutral' && (
                      <span className="profile-menu-item__value">{item.value}</span>
                    )}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="profile-section">
          <button id="profile-logout-btn" className="profile-logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </button>
        </div>

        {/* Footer */}
        <p className="profile-footer">1Fi · Backed by mutual funds · RBI Regulated</p>

        <div style={{ height: '16px' }} />
      </div>

      <BottomNav />
    </div>
  );
};
