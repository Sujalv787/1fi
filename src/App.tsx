import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TopBrandsPage, NearbyStoresPage } from './pages/PlaceholderPage';

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

          {/* Stub routes for bottom nav items (not in scope) */}
          <Route path="/wallet" element={<StubPage title="Wallet" emoji="💳" />} />
          <Route path="/scan" element={<StubPage title="Scan & Pay" emoji="📷" />} />
          <Route path="/profile" element={<StubPage title="Profile" emoji="👤" />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/shop/marketplace" replace />} />
        </Routes>
      </PhoneFrame>
    </BrowserRouter>
  );
}

// Minimal stub for non-implemented nav tabs
const StubPage: React.FC<{ title: string; emoji: string }> = ({ title, emoji }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '12px',
    background: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    fontFamily: 'inherit',
  }}>
    <span style={{ fontSize: '48px' }}>{emoji}</span>
    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</span>
    <span style={{ fontSize: '13px' }}>This section is outside the scope of this demo.</span>
  </div>
);

export default App;
