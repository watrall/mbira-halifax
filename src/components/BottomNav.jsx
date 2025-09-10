// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/exhibits', label: 'Explore', icon: 'search' },
  { to: '/places', label: 'Map', icon: 'map' },
  { to: '/explorations', label: 'Saved', icon: 'bookmark' },
  { to: '/about', label: 'Profile', icon: 'person' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 shadow-low z-40">
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-xs ${
                  isActive ? 'text-primary' : 'text-textSecondary'
                }`
              }
            >
              <span className="material-symbols-rounded">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

