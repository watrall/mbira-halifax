// src/pages/PlacesList.jsx
import { Link } from 'react-router-dom';

export default function PlacesList({ places }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Places</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <Link
            key={place.id}
            to={`/places/${place.id}`}
            className="block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={place.media.heroImage}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{place.description}</p>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                {place.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}