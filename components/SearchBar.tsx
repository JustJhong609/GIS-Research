'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search topics, tools, datasets..."
        className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-text font-mono text-sm outline-none focus:border-accent transition-colors placeholder:text-muted"
      />
    </div>
  );
};

export default SearchBar;
