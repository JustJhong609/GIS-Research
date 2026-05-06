'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/types';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'environment', label: 'Environment' },
  { id: 'urban', label: 'Urban' },
  { id: 'disaster', label: 'Disaster' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'social', label: 'Social' },
  { id: 'water', label: 'Water' },
  { id: 'health', label: 'Health & Safety' },
  { id: 'remote', label: 'Remote Sensing' },
];

const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onFilterChange(cat.id)}
          className={`relative px-4 py-2 rounded-full border text-xs font-mono transition-colors duration-200 whitespace-nowrap ${
            activeFilter === cat.id
              ? 'text-accent border-accent'
              : 'text-muted border-border hover:border-accent/50 hover:text-accent/50'
          }`}
        >
          {activeFilter === cat.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-accent/10 rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
