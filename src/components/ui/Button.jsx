// src/components/ui/Button.jsx
import React from 'react';

const base =
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ripple';

const variants = {
  primary:
    'bg-primary text-white shadow-[var(--elev-med)] hover:brightness-95 active:brightness-90 focus:ring-primary',
  secondary:
    'bg-secondary text-white shadow-[var(--elev-med)] hover:brightness-95 active:brightness-90 focus:ring-secondary',
  outline:
    'bg-transparent text-primary border border-primary hover:bg-primary/10 active:bg-primary/20 focus:ring-primary',
  flat: 'bg-surface text-textPrimary border border-gray-200 hover:bg-gray-50 active:bg-gray-100 focus:ring-primary',
  danger:
    'bg-error text-white shadow-[var(--elev-med)] hover:brightness-95 active:brightness-90 focus:ring-error',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ...props
}) {
  const cn = [base, variants[variant] || variants.primary, sizes[size] || sizes.md, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cn} disabled={disabled || loading} {...props}>
      {loading && (
        <span className="material-symbols-rounded animate-spin mr-2 text-white">progress_activity</span>
      )}
      {children}
    </button>
  );
}

