// src/components/ui/Card.jsx
import React from 'react';

export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface rounded-xl shadow-card hover:shadow-high transition-shadow ${onClick ? 'cursor-pointer ripple' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

