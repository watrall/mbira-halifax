// src/pages/PlacesList.jsx
import { Link } from 'react-router-dom';

export default function PlacesList({ places }) {
  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold heading-font text-textPrimary mb-4">Places</h1>
      <div className="space-y-4">
        {places.map((place) => (
          <Link
            key={place.id}
            to={`/places/${place.id}`}
            className="flex gap-3 bg-surface rounded-2xl p-3 shadow-card hover:shadow-high transition-shadow"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img src={place.media.heroImage} alt={place.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-textPrimary truncate">{place.name}</h2>
                <span className="ml-2 inline-flex items-center text-xs text-textSecondary">
                  <span className="material-symbols-rounded text-accent mr-1">place</span>
                  {place.category}
                </span>
              </div>
              <p className="text-sm text-textSecondary line-clamp-2">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
