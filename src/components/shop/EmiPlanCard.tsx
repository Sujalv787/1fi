import React from 'react';
import type { EmiPlan } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { Badge } from '../ui/Badge';
import './EmiPlanCard.css';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

export const EmiPlanCard: React.FC<EmiPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => (
  <button
    id={`emi-plan-${plan.tenureMonths}`}
    className={`emi-plan-card ${isSelected ? 'emi-plan-card--selected' : ''}`}
    onClick={() => onSelect(plan)}
    type="button"
    aria-pressed={isSelected}
    aria-label={`${plan.tenureMonths} months EMI, ${formatCurrency(plan.monthlyAmount)} per month`}
  >
    {/* Selection indicator */}
    <div className="emi-plan-card__check">
      {isSelected ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="9" fill="var(--color-brand)" />
          <path d="M5 9l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <div className="emi-plan-card__check-empty" />
      )}
    </div>

    {/* Tenure */}
    <div className="emi-plan-card__tenure">
      <span className="emi-plan-card__months">{plan.tenureMonths}</span>
      <span className="emi-plan-card__months-label">months</span>
    </div>

    {/* Divider */}
    <div className="emi-plan-card__divider" />

    {/* Amount info */}
    <div className="emi-plan-card__amounts">
      <div className="emi-plan-card__monthly">
        <span className="emi-plan-card__monthly-amount">{formatCurrency(plan.monthlyAmount)}</span>
        <span className="emi-plan-card__monthly-label">/month</span>
      </div>
      <div className="emi-plan-card__total">
        Total {formatCurrency(plan.totalAmount)}
      </div>
    </div>

    {/* Badges */}
    <div className="emi-plan-card__badges">
      <Badge variant="success" size="sm">0% Interest</Badge>
      {plan.badge && <Badge variant="brand" size="sm">{plan.badge}</Badge>}
    </div>
  </button>
);
