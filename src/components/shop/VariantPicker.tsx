import React from 'react';
import type { VariantGroup } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import './VariantPicker.css';

interface VariantPickerProps {
  variantGroups: VariantGroup[];
  selectedVariants: Record<string, string>;
  onVariantChange: (groupId: string, variantId: string) => void;
}

export const VariantPicker: React.FC<VariantPickerProps> = ({
  variantGroups,
  selectedVariants,
  onVariantChange,
}) => (
  <div className="variant-picker">
    {variantGroups.map((group) => {
      const selectedId = selectedVariants[group.groupId];
      const selectedVariant = group.variants.find((v) => v.id === selectedId);

      return (
        <div key={group.groupId} className="variant-group">
          <div className="variant-group__header">
            <span className="variant-group__label">{group.groupLabel}</span>
            {selectedVariant && (
              <span className="variant-group__selected-label">{selectedVariant.label}</span>
            )}
          </div>
          <div className="variant-group__options" role="group" aria-label={`Choose ${group.groupLabel}`}>
            {group.variants.map((variant) => {
              const isSelected = selectedId === variant.id;
              const isPrimaryGroup =
                group.groupId === 'storage' ||
                group.groupId === 'config' ||
                group.groupId === 'variant';

              return (
                <button
                  key={variant.id}
                  id={`variant-${variant.id}`}
                  className={`variant-option ${isSelected ? 'variant-option--selected' : ''} ${!variant.inStock ? 'variant-option--disabled' : ''}`}
                  onClick={() => variant.inStock && onVariantChange(group.groupId, variant.id)}
                  aria-pressed={isSelected}
                  aria-disabled={!variant.inStock}
                  type="button"
                >
                  {variant.label}
                  {isPrimaryGroup && (
                    <span className="variant-option__price">
                      {formatCurrency(variant.price)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
);
