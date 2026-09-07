import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppHeader.css';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
  subtitle,
  rightSlot,
}) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="app-header__left">
        {showBack && (
          <button
            id="header-back-btn"
            className="app-header__back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div className="app-header__titles">
          <h1 className="app-header__title">{title}</h1>
          {subtitle && <p className="app-header__subtitle">{subtitle}</p>}
        </div>
      </div>
      {rightSlot && <div className="app-header__right">{rightSlot}</div>}
    </header>
  );
};
