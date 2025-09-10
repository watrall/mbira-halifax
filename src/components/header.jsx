// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import SearchBar from './ui/SearchBar';

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
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur shadow-low">
      <div className="mx-auto max-w-screen-sm px-4 py-3 flex flex-col">
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
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search heritage places..."
          />
        )}
      </div>
    </header>
  );
}
