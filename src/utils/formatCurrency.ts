/**
 * Format a number as Indian Rupees (₹).
 * Uses Indian locale formatting: 1,00,000 etc.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Compact format for large amounts (e.g., ₹1.34L, ₹89.9K).
 */
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2).replace(/\.?0+$/, '')}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1).replace(/\.?0+$/, '')}K`;
  }
  return formatCurrency(amount);
}
