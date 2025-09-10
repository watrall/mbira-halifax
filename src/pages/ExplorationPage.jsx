// src/pages/ExplorationPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findExplorationById, getPlacesForExploration, getCurrentStopIndex } from '../utils';
import MapView from '../components/MapView';
import Button from '../components/ui/Button';

export default function ExplorationPage({ explorations, places, searchTerm }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const exploration = findExplorationById(explorations, id);
  const explorationPlaces = getPlacesForExploration(exploration, places);
  const [currentPlace, setCurrentPlace] = useState(null);

  useEffect(() => {
    if (explorationPlaces.length > 0 && !currentPlace) {
      setCurrentPlace(explorationPlaces[0]);
    }
  }, [explorationPlaces, currentPlace]);

  const handleStopClick = (place) => {
    setCurrentPlace(place);
    setTimeout(() => {
      const element = document.getElementById('exploration-detail');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleNext = () => {
    const currentIndex = getCurrentStopIndex(exploration, currentPlace?.id);
    if (currentIndex < explorationPlaces.length - 1) {
      const nextPlace = explorationPlaces[currentIndex + 1];
      setCurrentPlace(nextPlace);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentStopIndex(exploration, currentPlace?.id);
    if (currentIndex > 0) {
      const prevPlace = explorationPlaces[currentIndex - 1];
      setCurrentPlace(prevPlace);
    }
  };

  const currentIndex = getCurrentStopIndex(exploration, currentPlace?.id);
  const isAtStart = currentIndex <= 0;
  const isAtEnd = currentIndex >= explorationPlaces.length - 1 || currentIndex === -1;

  if (!exploration) {
    return <div className="container mx-auto p-4">Exploration not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="p-4 bg-surface shadow-low z-10">
        <h1 className="text-2xl font-bold heading-font text-primary mb-1">{exploration.name}</h1>
        <p className="text-textSecondary text-sm mb-3">{exploration.description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <div className="font-medium text-textPrimary">
            Stop {Math.max(1, currentIndex + 1)} of {explorationPlaces.length}
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePrevious} disabled={isAtStart} size="sm">
              Previous
            </Button>
            <Button onClick={handleNext} disabled={isAtEnd} size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-grow relative">
        <MapView
          places={places}
          explorations={[exploration]}
          activeExplorationId={exploration.id}
          searchTerm={searchTerm}
          onPlaceSelect={handleStopClick}
        />
      </div>

      {currentPlace && (
        <div id="exploration-detail" className="p-4 bg-surface border-t border-gray-200">
          <div className="flex items-center gap-3">
            {currentPlace.media.heroImage && (
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={currentPlace.media.heroImage}
                  alt={`Thumbnail for ${currentPlace.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-textPrimary">{currentPlace.name}</h3>
              <p className="text-xs text-textSecondary truncate">{currentPlace.category}</p>
            </div>
            <Link
              to={`/places/${currentPlace.id}`}
              className="ml-auto px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg shadow-fab hover:bg-[#005060] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
