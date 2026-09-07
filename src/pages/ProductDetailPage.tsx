import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { useEmiPlans } from '../hooks/useEmiPlans';
import { getDefaultVariants, resolveVariantPrice } from '../services/api';
import type { SelectedVariants } from '../types';
import { AppHeader } from '../components/layout/AppHeader';
import { VariantPicker } from '../components/shop/VariantPicker';
import { EmiPlanCard } from '../components/shop/EmiPlanCard';
import { StickyBottomBar } from '../components/shop/StickyBottomBar';
import { Badge } from '../components/ui/Badge';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { formatCurrency } from '../utils/formatCurrency';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { product, loadingState, error, retry } = useProductDetail(id ?? '');

  // Initialize variants once product loads
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({});
  const [variantsInitialized, setVariantsInitialized] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [proceedSuccess, setProceedSuccess] = useState(false);

  // Set defaults once
  if (product && !variantsInitialized) {
    setSelectedVariants(getDefaultVariants(product.variantGroups));
    setVariantsInitialized(true);
  }

  const effectivePrice = useMemo(() => {
    if (!product) return 0;
    return resolveVariantPrice(product.variantGroups, selectedVariants);
  }, [product, selectedVariants]);

  const { plans, loadingState: emiLoadingState, selectedPlan, selectPlan, retry: retryEmi } = useEmiPlans(effectivePrice);

  const handleVariantChange = (groupId: string, variantId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [groupId]: variantId }));
  };

  const handleProceed = () => {
    setProceedSuccess(true);
    setTimeout(() => setProceedSuccess(false), 3000);
  };

  // ─── Loading ──────────────────────────────────────────────────────────────

  if (loadingState === 'loading') {
    return (
      <div className="product-detail-page">
        <AppHeader title="Product Details" showBack />
        <div className="product-detail-page__scroll">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  // ─── Error ────────────────────────────────────────────────────────────────

  if (loadingState === 'error') {
    return (
      <div className="product-detail-page">
        <AppHeader title="Product Details" showBack />
        <div className="product-detail-page__scroll">
          <ErrorState message={error ?? 'Product not found'} onRetry={retry} />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <AppHeader title={product.name} showBack />

      <div className="product-detail-page__scroll">
        {/* Product Image */}
        <div className="product-detail__image-wrap">
          {!imgError ? (
            <img
              className="product-detail__image"
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="product-detail__image-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
          <div className="product-detail__image-badges">
            <Badge variant="success">No Cost EMI</Badge>
            <Badge variant="brand">0% Interest</Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail__info">
          <p className="product-detail__brand">{product.brand}</p>
          <h1 className="product-detail__name">{product.name}</h1>
          <div className="product-detail__price-row">
            <span className="product-detail__price">{formatCurrency(effectivePrice)}</span>
            <div className="product-detail__rating">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{product.rating}</span>
              <span className="product-detail__review-count">({product.reviewCount.toLocaleString('en-IN')})</span>
            </div>
          </div>

          <p className="product-detail__description">{product.shortDescription}</p>

          {/* No-cost EMI callout */}
          <div className="product-detail__emi-callout">
            <div className="product-detail__emi-callout-icon">🎯</div>
            <div>
              <p className="product-detail__emi-callout-title">No-Cost EMI Available</p>
              <p className="product-detail__emi-callout-sub">
                Pay as low as {formatCurrency(Math.round(effectivePrice / 24))}/mo · 0% interest · No processing fee
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="product-detail__section">
            <h2 className="product-detail__section-title">Highlights</h2>
            <ul className="product-detail__highlights">
              {product.highlights.map((h, i) => (
                <li key={i} className="product-detail__highlight-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Variant Picker */}
          <div className="product-detail__section">
            <h2 className="product-detail__section-title">Choose Options</h2>
            <VariantPicker
              variantGroups={product.variantGroups}
              selectedVariants={selectedVariants}
              onVariantChange={handleVariantChange}
            />
          </div>

          {/* EMI Plans */}
          <div className="product-detail__section">
            <h2 className="product-detail__section-title">
              Choose EMI Plan
              <span className="product-detail__section-subtitle"> — All plans at 0% interest</span>
            </h2>

            {emiLoadingState === 'loading' && (
              <div className="emi-plans-skeleton">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="emi-plan-skeleton-item" />
                ))}
              </div>
            )}

            {emiLoadingState === 'error' && (
              <ErrorState message="Failed to load EMI plans" onRetry={retryEmi} />
            )}

            {emiLoadingState === 'success' && (
              <div className="emi-plans-list">
                {plans.map((plan) => (
                  <EmiPlanCard
                    key={plan.tenureMonths}
                    plan={plan}
                    isSelected={selectedPlan?.tenureMonths === plan.tenureMonths}
                    onSelect={selectPlan}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="product-detail__terms">
            <p>
              ✓ No CIBIL check &nbsp;·&nbsp; ✓ No processing fee &nbsp;·&nbsp; ✓ No foreclosure charge
            </p>
            <p>
              Your pledged mutual funds remain invested and continue to grow while you shop.
            </p>
          </div>
        </div>

        {/* Spacer so sticky bar doesn't overlap */}
        <div style={{ height: '90px' }} />
      </div>

      {/* Success toast */}
      {proceedSuccess && (
        <div className="product-detail__toast" role="status" aria-live="polite">
          ✅ Order placed! Your EMI plan has been confirmed.
        </div>
      )}

      <StickyBottomBar
        selectedPlan={selectedPlan}
        productName={product.name}
        onProceed={handleProceed}
      />
    </div>
  );
};
