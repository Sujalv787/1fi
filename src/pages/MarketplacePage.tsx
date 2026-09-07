import React, { useState } from 'react';
import type { Category } from '../types';
import { useProducts } from '../hooks/useProducts';
import { AppHeader } from '../components/layout/AppHeader';
import { ShopTabs } from '../components/shop/ShopTabs';
import { CategoryChips } from '../components/shop/CategoryChips';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { BottomNav } from '../components/layout/BottomNav';
import './MarketplacePage.css';

export const MarketplacePage: React.FC = () => {
  const [category, setCategory] = useState<Category>('all');
  const { products, loadingState, error, retry } = useProducts(category);

  return (
    <div className="marketplace-page">
      <AppHeader title="Shop" subtitle="Buy now, pay in easy EMIs" />
      <ShopTabs />

      <div className="marketplace-page__scroll">
        {/* Hero Banner */}
        <div className="marketplace-hero">
          <div className="marketplace-hero__content">
            <div className="marketplace-hero__badge">No-Cost EMI</div>
            <h2 className="marketplace-hero__heading">
              Shop with your<br />Mutual Funds
            </h2>
            <p className="marketplace-hero__sub">
              0% interest · No CIBIL check · No processing fee
            </p>
          </div>
          <div className="marketplace-hero__visual" aria-hidden="true">
            <div className="marketplace-hero__orb marketplace-hero__orb--1" />
            <div className="marketplace-hero__orb marketplace-hero__orb--2" />
            <span className="marketplace-hero__emoji">🛍️</span>
          </div>
        </div>

        {/* Categories */}
        <CategoryChips activeCategory={category} onSelect={setCategory} />

        {/* Products */}
        <main className="marketplace-page__products" aria-label="Products">
          {loadingState === 'loading' && (
            <div className="products-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {loadingState === 'error' && (
            <ErrorState message={error ?? 'Something went wrong'} onRetry={retry} />
          )}

          {loadingState === 'success' && products.length === 0 && (
            <div className="marketplace-empty">
              <p>No products found in this category yet.</p>
            </div>
          )}

          {loadingState === 'success' && products.length > 0 && (
            <>
              <p className="marketplace-page__count">
                {products.length} product{products.length !== 1 ? 's' : ''} available
              </p>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </main>

        {/* Trust indicators */}
        <div className="trust-strip">
          {[
            { icon: '🔒', label: 'Secure Checkout' },
            { icon: '📄', label: 'No Hidden Fees' },
            { icon: '⚡', label: 'Instant Approval' },
            { icon: '📊', label: 'No CIBIL Check' },
          ].map((item) => (
            <div key={item.label} className="trust-strip__item">
              <span className="trust-strip__icon">{item.icon}</span>
              <span className="trust-strip__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
