import React, { useState } from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { BottomNav } from '../components/layout/BottomNav';
import { formatCurrency } from '../utils/formatCurrency';
import './ScanPage.css';

const RECENT_PAYMENTS = [
  { id: 1, merchant: 'Croma Electronics', location: 'Connaught Place, Delhi', amount: 99900, date: 'Sep 1, 2026', logo: '🔵' },
  { id: 2, merchant: 'Reliance Digital', location: 'Inorbit Mall, Mumbai', amount: 34990, date: 'Aug 22, 2026', logo: '🟣' },
  { id: 3, merchant: 'Vijay Sales', location: 'Linking Road, Bandra', amount: 194000, date: 'Jul 20, 2026', logo: '🟠' },
];

export const ScanPage: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [enterUpi, setEnterUpi] = useState(false);
  const [upiId, setUpiId] = useState('');

  return (
    <div className="scan-page">
      <AppHeader title="Scan & Pay" showBack />

      <div className="scan-page__scroll">
        {/* QR Scanner area */}
        <div className="scan-qr-area">
          <div className="scan-qr-frame" id="scan-qr-frame">
            {scanning ? (
              <div className="scan-qr-active">
                <div className="scan-qr-laser" />
                <p className="scan-qr-active__text">Scanning…</p>
              </div>
            ) : (
              <>
                {/* Fake QR code grid */}
                <div className="scan-qr-placeholder">
                  <div className="scan-qr-corner scan-qr-corner--tl" />
                  <div className="scan-qr-corner scan-qr-corner--tr" />
                  <div className="scan-qr-corner scan-qr-corner--bl" />
                  <div className="scan-qr-corner scan-qr-corner--br" />
                  <div className="scan-qr-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="3" height="3" rx="0.5"/>
                      <rect x="18" y="14" width="3" height="3" rx="0.5"/>
                      <rect x="14" y="18" width="3" height="3" rx="0.5"/>
                      <rect x="18" y="18" width="3" height="3" rx="0.5"/>
                    </svg>
                    <p>Point camera at QR code</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            id="scan-camera-btn"
            className="scan-camera-btn"
            onClick={() => { setScanning(true); setTimeout(() => setScanning(false), 2500); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            {scanning ? 'Scanning…' : 'Open Camera'}
          </button>
        </div>

        {/* Divider */}
        <div className="scan-divider">
          <div className="scan-divider__line" />
          <span className="scan-divider__text">or pay using</span>
          <div className="scan-divider__line" />
        </div>

        {/* Pay options */}
        <div className="scan-pay-options">
          <button
            id="scan-enter-upi-btn"
            className="scan-option-btn"
            onClick={() => setEnterUpi(!enterUpi)}
          >
            <div className="scan-option-btn__icon scan-option-btn__icon--purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 10h18"/>
              </svg>
            </div>
            <div className="scan-option-btn__text">
              <p>Enter UPI ID</p>
              <span>Pay any UPI address</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <button id="scan-phone-pay-btn" className="scan-option-btn">
            <div className="scan-option-btn__icon scan-option-btn__icon--green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.14 1.18 2 2 0 012.13 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
              </svg>
            </div>
            <div className="scan-option-btn__text">
              <p>Pay by Mobile Number</p>
              <span>Send to any phone number</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* UPI input */}
        {enterUpi && (
          <div className="scan-upi-input-wrap">
            <input
              id="scan-upi-input"
              className="scan-upi-input"
              type="text"
              placeholder="Enter UPI ID (e.g. name@upi)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <button
              id="scan-upi-verify-btn"
              className="scan-upi-verify-btn"
              disabled={upiId.length < 3}
            >
              Verify & Pay
            </button>
          </div>
        )}

        {/* How it works */}
        <div className="scan-how-it-works">
          <p className="scan-section-title">How 1Fi Scan & Pay Works</p>
          {[
            { icon: '📱', title: 'Scan QR at store', desc: 'Scan any Bharat QR or UPI QR code at partner stores.' },
            { icon: '🏦', title: 'Use your 1Fi credit', desc: 'Payment is made from your BNPL limit — no upfront cash.' },
            { icon: '📅', title: 'Repay in EMIs', desc: 'Split the amount into 3–24 month no-cost EMI automatically.' },
          ].map((step) => (
            <div key={step.title} className="scan-step">
              <span className="scan-step__icon">{step.icon}</span>
              <div>
                <p className="scan-step__title">{step.title}</p>
                <p className="scan-step__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent payments */}
        <div className="scan-recent">
          <p className="scan-section-title">Recent Payments</p>
          {RECENT_PAYMENTS.map((pay) => (
            <div key={pay.id} className="scan-recent-item">
              <div className="scan-recent-item__logo">{pay.logo}</div>
              <div className="scan-recent-item__info">
                <p className="scan-recent-item__merchant">{pay.merchant}</p>
                <p className="scan-recent-item__location">{pay.location} · {pay.date}</p>
              </div>
              <p className="scan-recent-item__amount">{formatCurrency(pay.amount)}</p>
            </div>
          ))}
        </div>

        <div style={{ height: '16px' }} />
      </div>

      <BottomNav />
    </div>
  );
};
