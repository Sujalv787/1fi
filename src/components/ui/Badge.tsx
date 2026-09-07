import React from 'react';
import './Badge.css';

type BadgeVariant = 'success' | 'brand' | 'neutral' | 'warning';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'sm',
}) => (
  <span className={`badge badge--${variant} badge--${size}`}>{children}</span>
);
