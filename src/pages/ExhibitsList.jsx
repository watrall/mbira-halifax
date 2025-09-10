// src/pages/ExhibitsList.jsx
import { Link } from 'react-router-dom';

export default function ExhibitsList({ exhibits }) {
  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold heading-font text-textPrimary mb-2">Exhibits</h1>
      <p className="mb-4 text-textSecondary text-sm">Discover curated collections of heritage places.</p>
      <div className="space-y-4">
        {exhibits.map((exhibit) => (
          <Link
            key={exhibit.id}
            to={`/exhibits/${exhibit.id}`}
            className="block bg-surface rounded-2xl overflow-hidden shadow-card hover:shadow-high transition-shadow"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={exhibit.coverImage}
                alt={exhibit.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-textPrimary">{exhibit.title}</h2>
              <p className="text-sm text-textSecondary line-clamp-2 mt-1">{exhibit.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
