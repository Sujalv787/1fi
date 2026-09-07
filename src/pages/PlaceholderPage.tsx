import React from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { ShopTabs } from '../components/shop/ShopTabs';
import { BottomNav } from '../components/layout/BottomNav';
import './PlaceholderPage.css';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle,
  emoji,
  description,
}) => (
  <div className="placeholder-page">
    <AppHeader title="Shop" subtitle="Buy now, pay in easy EMIs" />
    <ShopTabs />
    <div className="placeholder-page__content">
      <div className="placeholder-page__inner">
        <div className="placeholder-page__emoji">{emoji}</div>
        <h2 className="placeholder-page__title">{title}</h2>
        <p className="placeholder-page__subtitle">{subtitle}</p>
        <p className="placeholder-page__description">{description}</p>
        <div className="placeholder-page__coming-soon">
          <div className="placeholder-page__dot" />
          Coming Soon
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
);

export const TopBrandsPage: React.FC = () => (
  <PlaceholderPage
    title="Top Brands"
    subtitle="Shop from India's most loved brands"
    emoji="🏆"
    description="Discover curated collections from Apple, Samsung, Sony, and more — all with no-cost EMI financing backed by your mutual funds."
  />
);

export const NearbyStoresPage: React.FC = () => (
  <PlaceholderPage
    title="Nearby Stores"
    subtitle="Shop at stores around you"
    emoji="📍"
    description="Find partner stores near you and shop in-person with 1Fi BNPL. Just show your 1Fi limit at checkout."
  />
);
