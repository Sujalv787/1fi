import React from 'react';
import type { Category } from '../../types';
import './CategoryChips.css';

interface CategoryChipsProps {
  activeCategory: Category;
  onSelect: (cat: Category) => void;
}

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: 'all', label: 'All', emoji: '✦' },
  { id: 'smartphones', label: 'Phones', emoji: '📱' },
  { id: 'laptops', label: 'Laptops', emoji: '💻' },
  { id: 'two-wheelers', label: '2-Wheelers', emoji: '🏍️' },
  { id: 'audio', label: 'Audio', emoji: '🎧' },
];

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  activeCategory,
  onSelect,
}) => (
  <div className="category-chips" role="group" aria-label="Filter by category">
    {CATEGORIES.map((cat) => (
      <button
        key={cat.id}
        id={`category-chip-${cat.id}`}
        className={`category-chip ${activeCategory === cat.id ? 'category-chip--active' : ''}`}
        onClick={() => onSelect(cat.id)}
        type="button"
        aria-pressed={activeCategory === cat.id}
      >
        <span className="category-chip__emoji">{cat.emoji}</span>
        {cat.label}
      </button>
    ))}
  </div>
);
