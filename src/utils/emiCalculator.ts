/**
 * Compute no-cost EMI monthly installment.
 * Formula: monthly = ceil(price / tenureMonths)
 * There is no interest, no processing fee — pure price split.
 */
export function computeEmi(price: number, tenureMonths: number): number {
  if (tenureMonths <= 0) return price;
  return Math.round(price / tenureMonths);
}

/**
 * Compute total amount paid across all installments.
 */
export function computeEmiTotal(price: number, tenureMonths: number): number {
  return computeEmi(price, tenureMonths) * tenureMonths;
}

/**
 * Returns how much extra (if any) is paid due to rounding.
 * For no-cost EMI this is always ≤ tenureMonths - 1 rupees.
 */
export function computeEmiSurplus(price: number, tenureMonths: number): number {
  return computeEmiTotal(price, tenureMonths) - price;
}
