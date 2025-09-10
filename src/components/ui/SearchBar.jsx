// src/components/ui/SearchBar.jsx
import React, { useMemo, useState } from 'react';

export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search places...',
  data = [],
  onSelect,
  error = false,
}) {
  const [open, setOpen] = useState(false);
  const suggestions = useMemo(() => {
    const term = value.trim().toLowerCase();
    if (!term) return [];
    return data
      .filter((item) => item?.name?.toLowerCase().includes(term))
      .slice(0, 8);
  }, [data, value]);

  return (
    <div className="relative">
      <div className="flex items-center rounded-full bg-surface border px-3 py-2 shadow-low focus-within:ring-2 focus-within:ring-primary">
        <span className="material-symbols-rounded text-gray-500 mr-2">search</span>
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent outline-none text-sm ${
            error ? 'border-b border-error' : ''
          }`}
          aria-label={placeholder}
        />
      </div>
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-surface rounded-lg border shadow-high overflow-hidden">
          {suggestions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-textSecondary">No places found</div>
          ) : (
            suggestions.map((item) => (
              <button
                key={item.id}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ripple"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect?.(item)}
              >
                {item.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

