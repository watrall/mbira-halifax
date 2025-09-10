// src/pages/ExhibitDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { findExhibitById, getPlacesForExhibit } from '../utils';
import MapView from '../components/MapView';

export default function ExhibitDetailPage({ exhibits, places, searchTerm }) {
  const { id } = useParams();
  const exhibit = findExhibitById(exhibits, id);
  const exhibitPlaces = getPlacesForExhibit(exhibit, places);

  if (!exhibit) {
    return <div className="container mx-auto p-4">Exhibit not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img
            src={exhibit.coverImage}
            alt={`Cover image for ${exhibit.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h1 className="text-white text-2xl font-bold heading-font">{exhibit.title}</h1>
        </div>
      </div>

      <div className="p-4 bg-surface shadow-low">
        <div className="prose max-w-none text-textPrimary">
          <p>{exhibit.description}</p>
        </div>
        <Link
          to="."
          className="mt-4 inline-block px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-fab hover:bg-[#005060] active:scale-95 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Explore on Map
        </Link>
      </div>

      <div className="flex-grow relative">
        <MapView
          places={places}
          exhibits={[exhibit]}
          activeExhibitId={exhibit.id}
          searchTerm={searchTerm}
        />
      </div>

      <div className="p-4 bg-surface border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-3 text-textPrimary">Places in this Exhibit</h2>
        {exhibitPlaces.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {exhibitPlaces.map((place) => (
              <Link
                key={place.id}
                to={`/places/${place.id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={place.media.heroImage}
                    alt={`Hero image for ${place.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-sm truncate text-textPrimary">{place.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No places are currently associated with this exhibit.</p>
        )}
      </div>
    </div>
  );
}