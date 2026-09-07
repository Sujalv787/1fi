import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TopBrandsPage, NearbyStoresPage } from './pages/PlaceholderPage';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav } from './components/layout/BottomNav';

function App() {
  return (
    <BrowserRouter>
      {/*
       * PhoneFrame is for BROWSER PREVIEW ONLY.
       * It wraps the app in a mobile phone UI chrome so it looks correct
       * when opened in a desktop browser during development/evaluation.
       * This is NOT part of the production deliverable and should be
       * removed or replaced with a full-screen layout when integrated
       * into the actual 1Fi React Native / mobile-first stack.
       */}
      <PhoneFrame>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/shop/marketplace" replace />} />
          <Route path="/shop" element={<Navigate to="/shop/marketplace" replace />} />

          {/* Shop tabs */}
          <Route path="/shop/marketplace" element={<MarketplacePage />} />
          <Route path="/shop/top-brands" element={<TopBrandsPage />} />
          <Route path="/shop/nearby-stores" element={<NearbyStoresPage />} />

          {/* Product detail */}
          <Route path="/shop/product/:id" element={<ProductDetailPage />} />

          {/* Stub routes for bottom nav items (not in scope of this assignment) */}
          <Route path="/wallet" element={<StubPage title="Wallet" emoji="💳" subtitle="View your credit limit and pledged mutual funds" />} />
          <Route path="/scan" element={<StubPage title="Scan & Pay" emoji="📷" subtitle="Scan a QR code to pay at partner stores" />} />
          <Route path="/profile" element={<StubPage title="Profile" emoji="👤" subtitle="Manage your account and KYC details" />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/shop/marketplace" replace />} />
        </Routes>
      </PhoneFrame>
    </BrowserRouter>
  );
}

/**
 * Stub page for nav tabs that are out of scope for this assignment.
 * Includes AppHeader (with back navigation) and BottomNav so users
 * can always navigate away without getting trapped.
 */
const StubPage: React.FC<{ title: string; emoji: string; subtitle: string }> = ({
  title,
  emoji,
  subtitle,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-surface)' }}>
    <AppHeader title={title} showBack />
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '32px 24px',
        textAlign: 'center',
        fontFamily: 'inherit',
      }}
    >
      <span style={{ fontSize: '56px', lineHeight: 1 }}>{emoji}</span>
      <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
        {title}
      </span>
      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '240px' }}>
        {subtitle}
      </span>
      <span
        style={{
          marginTop: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 16px',
          background: 'var(--color-brand-light)',
          color: 'var(--color-brand)',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        Out of scope for this demo
      </span>
    </div>
    <BottomNav />
  </div>
);

export default App;
