// ─── Domain Models ───────────────────────────────────────────────────────────

export type Category =
  | 'all'
  | 'smartphones'
  | 'laptops'
  | 'two-wheelers'
  | 'audio';

export interface Variant {
  id: string;
  label: string;       // e.g. "256GB", "Midnight Black"
  type: 'storage' | 'color' | 'model';
  price: number;       // variant-specific price in INR paise (for precision) — stored as rupees
  inStock: boolean;
}

export interface VariantGroup {
  groupId: string;
  groupLabel: string;  // e.g. "Storage", "Color"
  variants: Variant[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  imageUrl: string;
  shortDescription: string;
  highlights: string[];
  variantGroups: VariantGroup[];
  basePrice: number;    // lowest variant price shown in listing
  rating: number;
  reviewCount: number;
}

export interface EmiPlan {
  tenureMonths: number;
  monthlyAmount: number;    // computed: price / tenureMonths (no-cost EMI)
  totalAmount: number;      // computed: monthlyAmount * tenureMonths
  interestRate: 0;          // always 0 — no-cost EMI
  processingFee: 0;         // always 0
  badge?: string;           // e.g. "Most Popular", "Best Value"
}

// ─── API Response Shapes ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  category: Category;
}

export interface ProductDetailResponse {
  product: Product;
}

export interface EmiPlansResponse {
  plans: EmiPlan[];
  price: number;
}

// ─── UI State Types ───────────────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface SelectedVariants {
  [groupId: string]: string; // groupId → variantId
}

export interface CartSelection {
  productId: string;
  selectedVariants: SelectedVariants;
  selectedEmiPlan: EmiPlan | null;
  finalPrice: number;
}
