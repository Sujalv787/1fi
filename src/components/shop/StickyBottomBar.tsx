import React from 'react';
import type { EmiPlan } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import './StickyBottomBar.css';

interface StickyBottomBarProps {
  selectedPlan: EmiPlan | null;
  productName: string;
  onProceed: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  selectedPlan,
  productName,
  onProceed,
}) => {
  if (!selectedPlan) return null;

  return (
    <div className="sticky-bottom-bar">
      <div className="sticky-bottom-bar__plan-info">
        <p className="sticky-bottom-bar__product">{productName}</p>
        <div className="sticky-bottom-bar__emi">
          <span className="sticky-bottom-bar__amount">
            {formatCurrency(selectedPlan.monthlyAmount)}
          </span>
          <span className="sticky-bottom-bar__tenure">
            × {selectedPlan.tenureMonths} months
          </span>
        </div>
        <p className="sticky-bottom-bar__zero-interest">0% interest · No hidden charges</p>
      </div>
      <button
        id="proceed-btn"
        className="sticky-bottom-bar__proceed-btn"
        onClick={onProceed}
        type="button"
      >
        Proceed
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};
