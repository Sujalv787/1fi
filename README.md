# 1Fi Shop Page — SDE Intern Assignment

A production-quality Vite + React + TypeScript simulation of the **1Fi Shop page**, with a fully implemented **1Fi Marketplace** section featuring BNPL product browsing and EMI plan selection.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The app renders inside a phone-frame container for browser preview. On mobile screens (≤ 500px), the frame disappears and the app goes full-screen.

---

## Project Structure

```
src/
├── types/          # Domain models: Product, Variant, EmiPlan, ApiResponse
├── services/
│   └── api.ts      # Mock API service (simulated network delay + error flag)
├── hooks/          # Custom React hooks with loading/error state
│   ├── useProducts.ts
│   ├── useProductDetail.ts
│   └── useEmiPlans.ts
├── utils/
│   ├── emiCalculator.ts    # Pure EMI math (no-cost = price / months)
│   └── formatCurrency.ts  # Indian rupee formatting (en-IN locale)
├── components/
│   ├── ui/         # Reusable primitives: Skeleton, ErrorState, Badge
│   ├── layout/     # PhoneFrame, AppHeader, BottomNav
│   └── shop/       # ShopTabs, ProductCard, CategoryChips, VariantPicker,
│                   # EmiPlanCard, StickyBottomBar
└── pages/
    ├── MarketplacePage.tsx    # Full implementation
    ├── ProductDetailPage.tsx  # Full implementation
    └── PlaceholderPage.tsx    # Top Brands + Nearby Stores stubs
```

---

## Architecture Decisions

### Mock API Layer (`src/services/api.ts`)
All data fetching goes through a service layer that mirrors a real REST API structure. Each function simulates realistic network latency (300–800ms) and returns typed `ApiResponse<T>` shapes. This is a drop-in replacement point — swap the implementations for real `fetch()` calls without touching any component.

**To simulate an error:** Set `SIMULATE_ERROR = true` in `src/services/api.ts`. The product list will fail, showing the error state with a retry button.

### EMI Calculation (`src/utils/emiCalculator.ts`)
Monthly EMI = `Math.round(price / tenureMonths)`. All no-cost EMI plans are computed at runtime from the selected variant's price. Monthly amounts are **never hardcoded**. Changing the selected storage variant immediately updates the EMI plans via the `useEmiPlans` hook.

### State Flow
```
selectedVariants (useState)
    → resolveVariantPrice() → effectivePrice
    → useEmiPlans(effectivePrice) → plans[]
    → selectedPlan
    → StickyBottomBar (CTA)
```

### Loading States
Every async operation (product list, product detail, EMI plans) has three states: `loading` → skeleton UI, `success` → data, `error` → `ErrorState` with retry. No raw spinners — all loading states use skeleton cards that match the final layout.

### Routing
```
/                        → redirect to /shop/marketplace
/shop/marketplace        → MarketplacePage
/shop/top-brands         → TopBrandsPage (placeholder)
/shop/nearby-stores      → NearbyStoresPage (placeholder)
/shop/product/:id        → ProductDetailPage
```

### Design System
- **Primary**: `#6C28D9` (1Fi brand violet, sourced from 1fi.in site metadata)
- **Success/Money**: `#16A34A` (green) — fintech convention: "brand" ≠ "money" signals
- **Surface**: `#F7F5FC` (off-white with purple tint)
- **Font**: Inter (Google Fonts, weight 400–800)
- All spacing/colors are CSS custom properties in `src/index.css`

### Phone Frame
`PhoneFrame` wraps the entire app in a 390×844px mobile chrome for browser preview. **This is not part of the production deliverable** — it exists solely for evaluating the app in a desktop browser. The component includes a code comment marking this clearly.

---

## Products in the Catalogue

| Product | Category | Price Range |
|---------|----------|-------------|
| Apple iPhone 17 | Smartphones | ₹89,900 – ₹1,19,900 |
| Apple iPhone 17 Pro Max | Smartphones | ₹1,34,900 – ₹1,74,900 |
| Samsung Galaxy S25 Ultra | Smartphones | ₹1,29,999 – ₹1,69,999 |
| OnePlus 13 | Smartphones | ₹69,999 – ₹79,999 |
| Apple MacBook Pro M4 | Laptops | ₹1,69,900 – ₹2,39,900 |
| Royal Enfield Classic 350 | Two-Wheelers | ₹1,94,000 – ₹2,19,000 |
| Sony WH-1000XM6 | Audio | ₹34,990 |

---

## EMI Terms

- **Tenures**: 3, 6, 9, 12, 18, 24 months
- **Interest**: 0% (no-cost EMI)
- **Processing fee**: ₹0
- **Foreclosure charge**: ₹0
- **CIBIL check**: Not required
- Monthly amount = `round(price / tenure)` — computed dynamically

---

## Disclaimer on Colors & Spacing

Colors (primary `#6C28D9`), typography (Inter), and spacing are best-effort approximations based on public brand research (1fi.in metadata, marketing materials, and the screenshots provided). They should be **fine-tuned against the actual 1Fi app** once installed, using the exact design tokens from the 1Fi design system.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
