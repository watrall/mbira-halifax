// src/components/ui/Fab.jsx
import React from 'react';

export default function Fab({ label, icon = null, className = '', ...props }) {
  return (
    <button
      className={`ripple inline-flex items-center gap-2 px-4 h-12 rounded-lg bg-primary text-white shadow-fab hover:brightness-95 active:brightness-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-rounded" aria-hidden>{icon}</span>}
      <span className="font-medium">{label}</span>
    </button>
  );
}

