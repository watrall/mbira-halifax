// src/pages/ExplorationsList.jsx
import { Link } from 'react-router-dom';

export default function ExplorationsList({ explorations }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Explorations</h1>
      <p className="mb-6 text-gray-600">Follow guided paths through heritage sites.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {explorations.map((exploration) => (
          <Link
            key={exploration.id}
            to={`/explorations/${exploration.id}`}
            className="block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={exploration.coverImage}
                alt={exploration.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{exploration.name}</h2>
              <p className="text-gray-600">{exploration.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}