// src/components/ui/Snackbar.jsx
import React from 'react';

export default function Snackbar({ message, type = 'info', visible, onClose }) {
  if (!visible) return null;
  const palette = {
    info: 'bg-textPrimary text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-error text-white',
  }[type] || 'bg-textPrimary text-white';

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-high ${palette}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm">{message}</span>
        <button className="ml-2 text-sm underline" onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );
}

