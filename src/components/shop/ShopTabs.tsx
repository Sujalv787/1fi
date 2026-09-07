import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ShopTabs.css';

type ShopTab = {
  id: string;
  label: string;
  path: string;
};

const SHOP_TABS: ShopTab[] = [
  { id: 'top-brands', label: 'Top Brands', path: '/shop/top-brands' },
  { id: 'nearby-stores', label: 'Nearby Stores', path: '/shop/nearby-stores' },
  { id: 'marketplace', label: '1Fi Marketplace', path: '/shop/marketplace' },
];

export const ShopTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeId =
    SHOP_TABS.find((t) => location.pathname.startsWith(t.path))?.id ??
    'marketplace';

  return (
    <div className="shop-tabs" role="tablist" aria-label="Shop sections">
      {SHOP_TABS.map((tab) => (
        <button
          key={tab.id}
          id={`shop-tab-${tab.id}`}
          role="tab"
          aria-selected={activeId === tab.id}
          className={`shop-tabs__tab ${activeId === tab.id ? 'shop-tabs__tab--active' : ''}`}
          onClick={() => navigate(tab.path)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
