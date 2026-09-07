import type { Category, EmiPlan, EmiPlansResponse, ProductDetailResponse, ProductListResponse, Variant, VariantGroup } from '../types';

// ─── Mock Data ────────────────────────────────────────────────────────────────

// Using placehold.co as a reliable fallback for product images in dev.
// In production, replace with actual product CDN URLs from the backend.
const PRODUCT_IMAGES: Record<string, string> = {
  'iphone-17': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg',
  'iphone-17-pro-max': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg',
  'galaxy-s25-ultra': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra.jpg',
  'oneplus-13': 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-13.jpg',
  'macbook-pro-m4': 'https://fdn2.gsmarena.com/vv/bigpic/apple-macbook-pro-16-2023.jpg',
  'royal-enfield-classic-350': 'https://imgd.aeplcdn.com/664x374/n/cw/ec/44686/royal-enfield-classic-350-right-side-view-3.jpeg',
  'sony-wh1000xm6': 'https://fdn2.gsmarena.com/vv/bigpic/sony-wh-1000xm5.jpg',
};

const fallbackImage = (id: string) =>
  `https://placehold.co/400x400/6C28D9/ffffff?text=${encodeURIComponent(id)}`;

const img = (id: string) => PRODUCT_IMAGES[id] ?? fallbackImage(id);

// ─── Variant Helpers ──────────────────────────────────────────────────────────

const storageVariants = (
  configs: { label: string; price: number }[]
): VariantGroup => ({
  groupId: 'storage',
  groupLabel: 'Storage',
  variants: configs.map(({ label, price }) => ({
    id: `storage-${label.replace(/\s/g, '').toLowerCase()}`,
    label,
    type: 'storage',
    price,
    inStock: true,
  })),
});

const colorVariants = (configs: { label: string; price?: number }[], basePrice: number): VariantGroup => ({
  groupId: 'color',
  groupLabel: 'Color',
  variants: configs.map(({ label, price }) => ({
    id: `color-${label.replace(/\s/g, '-').toLowerCase()}`,
    label,
    type: 'color',
    price: price ?? basePrice,
    inStock: true,
  })),
});

// ─── Product Catalogue ────────────────────────────────────────────────────────

import type { Product } from '../types';

const PRODUCTS: Product[] = [
  {
    id: 'iphone-17',
    name: 'Apple iPhone 17',
    brand: 'Apple',
    category: 'smartphones',
    imageUrl: img('iphone-17'),
    shortDescription: 'The most advanced iPhone ever — A19 chip, all-new camera system, thinnest design yet.',
    highlights: [
      'A19 Bionic chip — fastest smartphone processor',
      '48MP Fusion camera with 5x optical zoom',
      'Dynamic Island with action-aware notifications',
      'All-day battery life with USB-C fast charging',
      'Ceramic Shield front — toughest glass on any smartphone',
    ],
    variantGroups: [
      storageVariants([
        { label: '128 GB', price: 89900 },
        { label: '256 GB', price: 99900 },
        { label: '512 GB', price: 119900 },
      ]),
      colorVariants(
        [
          { label: 'Black Titanium' },
          { label: 'White Titanium' },
          { label: 'Desert Titanium' },
          { label: 'Natural Titanium' },
        ],
        89900
      ),
    ],
    basePrice: 89900,
    rating: 4.8,
    reviewCount: 2341,
  },
  {
    id: 'iphone-17-pro-max',
    name: 'Apple iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    imageUrl: img('iphone-17-pro-max'),
    shortDescription: 'Pro-grade photography, titanium build, A19 Pro chip. The ultimate iPhone.',
    highlights: [
      'A19 Pro chip with 6-core GPU',
      'Pro camera system — 48MP + 48MP + 12MP telephoto',
      '5x optical zoom, 4K 120fps ProRes video',
      'Up to 30 hrs battery life',
      'Premium titanium design with textured matte glass',
    ],
    variantGroups: [
      storageVariants([
        { label: '256 GB', price: 134900 },
        { label: '512 GB', price: 154900 },
        { label: '1 TB', price: 174900 },
      ]),
      colorVariants(
        [
          { label: 'Black Titanium' },
          { label: 'White Titanium' },
          { label: 'Desert Titanium' },
          { label: 'Natural Titanium' },
        ],
        134900
      ),
    ],
    basePrice: 134900,
    rating: 4.9,
    reviewCount: 1872,
  },
  {
    id: 'galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    imageUrl: img('galaxy-s25-ultra'),
    shortDescription: 'Galaxy AI meets pro hardware. Built-in S Pen, 200MP camera, titanium frame.',
    highlights: [
      '200MP quad rear camera system',
      'Snapdragon 8 Elite for Galaxy — fastest Android SoC',
      'Built-in S Pen with AI-powered features',
      '5000 mAh battery with 45W fast charging',
      'Titanium frame with Corning Gorilla Armor 2',
    ],
    variantGroups: [
      storageVariants([
        { label: '256 GB', price: 129999 },
        { label: '512 GB', price: 149999 },
        { label: '1 TB', price: 169999 },
      ]),
      colorVariants(
        [
          { label: 'Titanium Black' },
          { label: 'Titanium Gray' },
          { label: 'Titanium Whitesilver' },
          { label: 'Titanium Pinkgold' },
        ],
        129999
      ),
    ],
    basePrice: 129999,
    rating: 4.7,
    reviewCount: 3108,
  },
  {
    id: 'oneplus-13',
    name: 'OnePlus 13',
    brand: 'OnePlus',
    category: 'smartphones',
    imageUrl: img('oneplus-13'),
    shortDescription: 'Flagship performance meets all-day power. Snapdragon 8 Elite, 6000 mAh battery.',
    highlights: [
      'Snapdragon 8 Elite processor',
      'Hasselblad-tuned triple rear camera',
      '6000 mAh battery with 100W SUPERVOOC charging',
      '6.82" 120Hz AMOLED display with 4500 nits peak brightness',
      'IP65 water resistance',
    ],
    variantGroups: [
      storageVariants([
        { label: '256 GB', price: 69999 },
        { label: '512 GB', price: 79999 },
      ]),
      colorVariants(
        [
          { label: 'Midnight Ocean' },
          { label: 'Arctic Dawn' },
        ],
        69999
      ),
    ],
    basePrice: 69999,
    rating: 4.6,
    reviewCount: 4521,
  },
  {
    id: 'macbook-pro-m4',
    name: 'Apple MacBook Pro M4',
    brand: 'Apple',
    category: 'laptops',
    imageUrl: img('macbook-pro-m4'),
    shortDescription: 'The most powerful MacBook Pro ever. M4 chip, Liquid Retina XDR display, up to 22 hrs battery.',
    highlights: [
      'Apple M4 chip with 10-core CPU and 10-core GPU',
      '14.2" Liquid Retina XDR display, 1000 nits sustained brightness',
      'Up to 22 hours of battery life',
      '3× Thunderbolt 4 ports + HDMI + SD card slot + MagSafe 3',
      'Magic Keyboard with Touch ID, Force Touch trackpad',
    ],
    variantGroups: [
      {
        groupId: 'config',
        groupLabel: 'Configuration',
        variants: [
          { id: 'config-16gb-512gb', label: '16GB / 512GB SSD', type: 'model', price: 169900, inStock: true },
          { id: 'config-24gb-1tb', label: '24GB / 1TB SSD', type: 'model', price: 199900, inStock: true },
          { id: 'config-32gb-2tb', label: '32GB / 2TB SSD', type: 'model', price: 239900, inStock: true },
        ],
      },
      colorVariants(
        [
          { label: 'Space Black' },
          { label: 'Silver' },
        ],
        169900
      ),
    ],
    basePrice: 169900,
    rating: 4.9,
    reviewCount: 987,
  },
  {
    id: 'royal-enfield-classic-350',
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    category: 'two-wheelers',
    imageUrl: img('royal-enfield-classic-350'),
    shortDescription: 'The most iconic motorcycle in India. Timeless design, refined J-series engine.',
    highlights: [
      '349cc single-cylinder J-series engine, 20.2 bhp',
      'Dual-channel ABS for safer braking',
      'USB charging port, tripper navigation pod',
      'Classic retro silhouette with modern mechanicals',
      'Available in 7 colour options',
    ],
    variantGroups: [
      {
        groupId: 'variant',
        groupLabel: 'Variant',
        variants: [
          { id: 'variant-redditch', label: 'Redditch', type: 'model', price: 194000, inStock: true },
          { id: 'variant-halcyon', label: 'Halcyon', type: 'model', price: 198000, inStock: true },
          { id: 'variant-signals', label: 'Signals', type: 'model', price: 209000, inStock: true },
          { id: 'variant-chrome', label: 'Dark/Chrome', type: 'model', price: 219000, inStock: true },
        ],
      },
    ],
    basePrice: 194000,
    rating: 4.5,
    reviewCount: 6782,
  },
  {
    id: 'sony-wh1000xm6',
    name: 'Sony WH-1000XM6',
    brand: 'Sony',
    category: 'audio',
    imageUrl: img('sony-wh1000xm6'),
    shortDescription: 'Industry-leading noise cancellation, Hi-Res audio, 40-hour battery.',
    highlights: [
      'Industry-leading noise cancellation with Auto NC Optimizer',
      'Hi-Res Audio and Hi-Res Audio Wireless (LDAC)',
      '40-hour battery with 3-minute quick charge (3 hrs playback)',
      'Multipoint connection — connect two devices simultaneously',
      'Speak-to-Chat, Quick Attention for situational awareness',
    ],
    variantGroups: [
      colorVariants(
        [
          { label: 'Midnight Black', price: 34990 },
          { label: 'Platinum Silver', price: 34990 },
        ],
        34990
      ),
    ],
    basePrice: 34990,
    rating: 4.7,
    reviewCount: 8934,
  },
];

// ─── EMI Configuration ────────────────────────────────────────────────────────

const EMI_TENURES = [3, 6, 9, 12, 18, 24];

const POPULAR_BADGES: Record<number, string> = {
  6: 'Most Popular',
  12: 'Best Value',
};

// ─── Simulation Config ────────────────────────────────────────────────────────

/**
 * Set SIMULATE_ERROR to true to test error states.
 * Simulates a network failure on product list fetch.
 * Toggle this flag to verify the retry/error UI works correctly.
 */
export const SIMULATE_ERROR = false;

const SIMULATED_DELAY_MS = 800;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * Fetch the product catalogue, optionally filtered by category.
 * Simulates ~800ms network latency.
 */
export async function getProducts(
  category: Category = 'all'
): Promise<ProductListResponse> {
  await delay(SIMULATED_DELAY_MS);

  if (SIMULATE_ERROR) {
    throw new Error('Network error: Unable to fetch products. Please try again.');
  }

  const filtered =
    category === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  return {
    products: filtered,
    total: filtered.length,
    category,
  };
}

/**
 * Fetch a single product with full variant details.
 * Simulates ~600ms network latency.
 */
export async function getProductById(id: string): Promise<ProductDetailResponse> {
  await delay(600);

  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Product not found: ${id}`);
  }

  return { product };
}

/**
 * Compute EMI plans for a given price.
 * Always returns no-cost EMI (0% interest, monthly = price / tenure).
 * Simulates ~300ms network latency.
 */
export async function getEmiPlans(price: number): Promise<EmiPlansResponse> {
  await delay(300);

  const plans: EmiPlan[] = EMI_TENURES.map((tenure) => {
    const monthly = Math.round(price / tenure);
    return {
      tenureMonths: tenure,
      monthlyAmount: monthly,
      totalAmount: monthly * tenure,
      interestRate: 0,
      processingFee: 0,
      badge: POPULAR_BADGES[tenure],
    };
  });

  return { plans, price };
}

/**
 * Get the effective price from selected variants.
 * Returns the highest-priority group's selected variant price.
 */
export function resolveVariantPrice(
  variantGroups: VariantGroup[],
  selectedVariants: Record<string, string>
): number {
  // Priority: storage/model config > color (colors usually share the same price)
  const primaryGroup =
    variantGroups.find((g) => g.groupId === 'storage' || g.groupId === 'config' || g.groupId === 'variant') ??
    variantGroups[0];

  if (!primaryGroup) return 0;

  const selectedId = selectedVariants[primaryGroup.groupId];
  const variant = primaryGroup.variants.find((v) => v.id === selectedId);
  return variant?.price ?? primaryGroup.variants[0]?.price ?? 0;
}

/**
 * Get default selected variants (first variant in each group).
 */
export function getDefaultVariants(variantGroups: VariantGroup[]): Record<string, string> {
  return Object.fromEntries(
    variantGroups.map((g) => [g.groupId, g.variants[0]?.id ?? ''])
  );
}
