import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TopBrandsPage, NearbyStoresPage } from './pages/PlaceholderPage';
import { WalletPage } from './pages/WalletPage';
import { ScanPage } from './pages/ScanPage';
import { ProfilePage } from './pages/ProfilePage';

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

          {/* Fully implemented bottom nav pages */}
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/shop/marketplace" replace />} />
        </Routes>
      </PhoneFrame>
    </BrowserRouter>
  );
}

export default App;
