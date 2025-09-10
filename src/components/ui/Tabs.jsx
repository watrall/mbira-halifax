// src/components/ui/Tabs.jsx
import React from 'react';

export default function Tabs({ tabs = [], activeId, onChange }) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              onClick={() => onChange?.(tab.id)}
              className={`relative py-3 px-5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? 'text-primary'
                  : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              <span className="ripple">{tab.label}</span>
              <span
                className={`absolute left-0 right-0 -bottom-px h-0.5 transition-all ${
                  active ? 'bg-primary' : 'bg-transparent'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

