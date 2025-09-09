// src/pages/ExhibitDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { findExhibitById, getPlacesForExhibit, findExplorationById } from '../utils';

export default function ExhibitDetailPage({ exhibits, places }) {
  const { id } = useParams();
  const exhibit = findExhibitById(exhibits, id);
  const exhibitPlaces = getPlacesForExhibit(exhibit, places);

  // MVP: Simple check if an exploration exists with the same places (by ID)
  // In a real app, this logic would be more robust (e.g., comparing sorted arrays)
  // For this MVP, we'll just check if any exploration has the exact same place IDs in its stops.
  const relatedExploration = null; // Placeholder for MVP logic complexity

  if (!exhibit) {
    return <div className="container mx-auto p-4">Exhibit not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-6 h-64">
        <img
          src={exhibit.coverImage}
          alt={exhibit.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h1 className="text-white text-2xl font-bold">{exhibit.title}</h1>
        </div>
      </div>

      {/* Description */}
      <div className="prose max-w-none mb-6 p-4 bg-white rounded-xl shadow-card">
        <p className="text-gray-700">{exhibit.description}</p>
      </div>

      {/* Related Exploration (MVP Placeholder) */}
      {/* {relatedExploration && (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-card">
          <h2 className="text-xl font-semibold mb-2">Related Exploration</h2>
          <p className="text-gray-600 mb-2">This exhibit is featured in an exploration.</p>
          <Link to={`/explorations/${relatedExploration.id}`} className="inline-block bg-primary text-white px-4 py-2 rounded-full hover:bg-[#005060]">
            Start Exploration
          </Link>
        </div>
      )} */}

      {/* Places in this Exhibit */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Places in this Exhibit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exhibitPlaces.map((place) => (
            <Link
              key={place.id}
              to={`/places/${place.id}`}
              className="block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
            >
              <div className="h-32 overflow-hidden">
                <img
                  src={place.media.heroImage}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold">{place.name}</h3>
                <p className="text-xs text-gray-500">{place.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}