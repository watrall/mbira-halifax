// src/pages/ExplorationPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { findExplorationById, getPlacesForExploration, getCurrentStopIndex, findPlaceById } from '../utils';
import PlaceDetail from '../components/PlaceDetail';

// Fix for default marker icons not showing in React-Leaflet v4+
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Numbered Marker Icon
const createNumberedIcon = (number, color = '#3b82f6') => {
  return L.divIcon({
    className: 'custom-number-marker',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; font-weight: bold; border: 2px solid white;">${number}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function ExplorationPage({ explorations, places }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const exploration = findExplorationById(explorations, id);
  const explorationPlaces = getPlacesForExploration(exploration, places);
  const [currentPlace, setCurrentPlace] = useState(null);

  useEffect(() => {
    if (explorationPlaces.length > 0) {
      setCurrentPlace(explorationPlaces[0]); // Start with the first stop
    }
  }, [exploration, places]);

  const handleStopClick = (place) => {
    setCurrentPlace(place);
    // Scroll to the detail section if it exists on page
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
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === explorationPlaces.length - 1 || currentIndex === -1;

  if (!exploration) {
    return <div className="container mx-auto p-4">Exploration not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{exploration.name}</h1>
      <p className="text-gray-600 mb-6">{exploration.description}</p>

      {/* Map Section */}
      <div className="rounded-xl overflow-hidden shadow-card mb-6 h-96">
        <MapContainer
          center={explorationPlaces.length > 0 ? explorationPlaces[0].coordinates : [44.65, -63.57]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Polyline */}
          {exploration.polyline && (
            <Polyline positions={exploration.polyline} color="#00697A" weight={4} />
          )}
          {/* Numbered Markers for Stops */}
          {explorationPlaces.map((place, index) => (
            <Marker
              key={place.id}
              position={place.coordinates}
              icon={createNumberedIcon(index + 1)} // Number starts at 1
              eventHandlers={{
                click: () => handleStopClick(place),
              }}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Progress and Navigation */}
      <div className="bg-white rounded-xl shadow-card p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium text-gray-700">
          Stop {currentIndex + 1} of {explorationPlaces.length} in this exploration
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={isAtStart}
            className={`px-4 py-2 rounded-full ${isAtStart ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-[#005060]'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            className={`px-4 py-2 rounded-full ${isAtEnd ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-[#005060]'}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Current Stop Detail */}
      {currentPlace && (
        <div id="exploration-detail">
          <PlaceDetail place={currentPlace} allPlaces={places} />
        </div>
      )}
    </div>
  );
}