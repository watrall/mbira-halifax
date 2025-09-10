// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoSearchOutline, IoMenuOutline } from 'react-icons/io5';

export default function Header({ projectTitle, onSearchChange, showSearch = false }) {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm('');
    if (onSearchChange) onSearchChange('');
  }, [location.pathname, onSearchChange]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface shadow-low">
      <div className="container mx-auto px-4 py-3 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <Link
            to="/"
            className="text-2xl font-bold heading-font text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded"
          >
            {projectTitle || "Halifax"}
          </Link>
          <button
            className="p-2 rounded-full text-textPrimary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
          >
            <IoMenuOutline size={24} />
          </button>
        </div>

        {showSearch && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearchOutline className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search places..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              aria-label="Search for places"
            />
          </div>
        )}
      </div>
    </header>
  );
}