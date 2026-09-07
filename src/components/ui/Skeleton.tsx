import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = '6px',
  className = '',
}) => (
  <div
    className={`skeleton ${className}`}
    style={{ width, height, borderRadius }}
    role="status"
    aria-label="Loading…"
  />
);

export const ProductCardSkeleton: React.FC = () => (
  <div className="product-card-skeleton">
    <Skeleton height="180px" borderRadius="12px" />
    <div className="product-card-skeleton__body">
      <Skeleton height="12px" width="60%" />
      <Skeleton height="18px" width="90%" />
      <Skeleton height="14px" width="50%" />
      <Skeleton height="28px" borderRadius="6px" />
    </div>
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="detail-skeleton">
    <Skeleton height="320px" borderRadius="0" />
    <div className="detail-skeleton__body">
      <Skeleton height="14px" width="40%" />
      <Skeleton height="28px" width="85%" />
      <Skeleton height="28px" width="60%" />
      <Skeleton height="20px" width="35%" />
      <div style={{ marginTop: '24px' }}>
        <Skeleton height="14px" width="30%" />
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <Skeleton height="36px" width="80px" borderRadius="999px" />
          <Skeleton height="36px" width="80px" borderRadius="999px" />
          <Skeleton height="36px" width="80px" borderRadius="999px" />
        </div>
      </div>
    </div>
  </div>
);
