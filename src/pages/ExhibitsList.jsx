// src/pages/ExhibitsList.jsx
import { Link } from 'react-router-dom';

export default function ExhibitsList({ exhibits }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Exhibits</h1>
      <p className="mb-6 text-gray-600">Discover curated collections of heritage places.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exhibits.map((exhibit) => (
          <Link
            key={exhibit.id}
            to={`/exhibits/${exhibit.id}`}
            className="block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={exhibit.coverImage}
                alt={exhibit.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{exhibit.title}</h2>
              <p className="text-gray-600">{exhibit.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}