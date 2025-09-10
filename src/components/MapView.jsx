// src/components/MapView.jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { findPlaceById } from '../utils';
import categories from '../data/categories.json';
import SearchBar from './ui/SearchBar';
import BottomSheet from './BottomSheet';
import Fab from './ui/Fab';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color = '#0094BC') => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const createNumberedIcon = (number, color = '#0094BC') => {
  return L.divIcon({
    className: 'custom-number-marker',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; font-weight: bold; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">${number}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function MapView({
  places,
  explorations,
  exhibits,
  activeExplorationId,
  activeExhibitId,
  searchTerm = '',
  onPlaceSelect,
}) {
  const navigate = useNavigate();
  const [mapInstance, setMapInstance] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation] = useState([44.65, -63.57]);
  const [localQuery, setLocalQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let result = places;

    if (activeExplorationId) {
      const exploration = explorations.find(e => e.id === activeExplorationId);
      if (exploration) {
        const explorationPlaceIds = exploration.stops.map(stop => stop.placeId);
        result = result.filter(place => explorationPlaceIds.includes(place.id));
      }
    }
    else if (activeExhibitId) {
      const exhibit = exhibits.find(e => e.id === activeExhibitId);
      if (exhibit) {
        result = result.filter(place => exhibit.places.includes(place.id));
      }
    }

    const combinedTerm = (localQuery || searchTerm || '').toLowerCase();

    if (combinedTerm) {
      result = result.filter(place =>
        place.name.toLowerCase().includes(combinedTerm) ||
        place.description.toLowerCase().includes(combinedTerm) ||
        place.category.toLowerCase().includes(combinedTerm)
      );
    }

    if (activeCategory && activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    setFilteredPlaces(result);
  }, [places, explorations, exhibits, activeExplorationId, activeExhibitId, searchTerm, localQuery, activeCategory]);

  useEffect(() => {
    if (mapInstance && filteredPlaces.length > 0) {
      const bounds = L.latLngBounds(filteredPlaces.map(p => p.coordinates));
      bounds.pad(0.1);
      mapInstance.fitBounds(bounds);
    }
  }, [mapInstance, filteredPlaces]);

  const handleMarkerClick = useCallback((place) => {
    setSelectedPlace(place);
    if (mapInstance) {
      mapInstance.setView(place.coordinates, 16);
    }
  }, [mapInstance]);

  const activeExploration = activeExplorationId
    ? explorations.find(e => e.id === activeExplorationId)
    : null;

  return (
    <div className="relative h-full w-full">
      {/* Search overlay */}
      <div className="absolute z-[1000] left-0 right-0 top-3 px-3">
        <div className="mx-auto max-w-screen-sm">
          <SearchBar
            value={localQuery}
            onChange={setLocalQuery}
            placeholder="Search heritage places..."
            data={places}
            onSelect={(p) => {
              setLocalQuery(p.name);
              handleMarkerClick(p);
            }}
          />
          <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm shadow-low whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-textPrimary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        whenCreated={setMapInstance}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={userLocation}>
          <Popup>You are here (simulated)</Popup>
        </Marker>

        {activeExploration && activeExploration.polyline && (
          <Polygon
            positions={activeExploration.polyline}
            color="#0094BC"
            weight={4}
            opacity={0.7}
            fillColor="rgba(0,148,188,0.3)"
            fillOpacity={0.3}
          />
        )}

        {filteredPlaces.map((place) => {
          const icon = activeExploration
            ? createNumberedIcon(
                activeExploration.stops.find(s => s.placeId === place.id)?.order || '?',
                '#0094BC'
              )
            : createCustomIcon('#0094BC');

          return (
            <Marker
              key={place.id}
              position={place.coordinates}
              icon={icon}
              eventHandlers={{
                click: () => handleMarkerClick(place),
              }}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="absolute bottom-4 right-4 z-[1000]">
        <Fab
          label="My Location"
          icon="my_location"
          onClick={() => {
            if (mapInstance && userLocation) {
              mapInstance.setView(userLocation, 15);
            }
          }}
        />
      </div>

      {selectedPlace && (
        <BottomSheet
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onExplore={() => {
            setSelectedPlace(null);
            navigate(`/places/${selectedPlace.id}`);
            if (onPlaceSelect) onPlaceSelect(selectedPlace);
          }}
        />
      )}
    </div>
  );
}
