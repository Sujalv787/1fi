import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../ui/Badge';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = React.useState(false);

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/shop/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/shop/product/${product.id}`)}
      aria-label={`${product.name}, starting from ${formatCurrency(product.basePrice)}`}
      id={`product-card-${product.id}`}
    >
      <div className="product-card__image-wrap">
        {!imgError ? (
          <img
            className="product-card__image"
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="product-card__image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        <div className="product-card__badge-wrap">
          <Badge variant="success" size="sm">No Cost EMI</Badge>
        </div>
      </div>
      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price-row">
          <span className="product-card__price">{formatCurrency(product.basePrice)}</span>
          <span className="product-card__price-label">onwards</span>
        </div>
        <div className="product-card__emi-hint">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9h.01M12 17v-7" />
          </svg>
          EMI from {formatCurrency(Math.round(product.basePrice / 24))}/mo
        </div>
      </div>
    </article>
  );
};
