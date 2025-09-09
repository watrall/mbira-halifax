// src/components/PlaceDetail.jsx
import { Link } from 'react-router-dom';
import Gallery from './Gallery';
import ModelViewer from './ModelViewer';

export default function PlaceDetail({ place, allPlaces }) {
  // This component can be used on the PlaceDetailPage or within the Map View context
  // For simplicity in this MVP, we won't implement the "Jump to Exploration" link here,
  // but it could be added by passing explorations as a prop and checking place membership.

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden mb-6 h-64">
        <img
          src={place.media.heroImage}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h1 className="text-white text-2xl font-bold">{place.name.trim()}</h1>
          <p className="text-white text-sm">{place.category}</p>
        </div>
        {/* Optional Back Button - adjust based on context if needed */}
        {/* <Link to="/places" className="absolute top-4 left-4 bg-white/80 text-black px-3 py-1 rounded-full text-sm">← Back to Places</Link> */}
      </div>

      {/* Description */}
      <div className="prose max-w-none mb-6 p-4 bg-white rounded-xl shadow-card">
        <p className="text-gray-700">{place.description.trim()}</p>
      </div>

      {/* Audio Player (if available) */}
      {place.media.audio && (
        <div className="mb-6 p-4 bg-white rounded-xl shadow-card">
          <h2 className="text-xl font-semibold mb-2">Listen</h2>
          <audio controls className="w-full">
            <source src={place.media.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* 3D Model Viewer (if available) */}
      {place.media.model3D && <ModelViewer src={place.media.model3D} />}

      {/* Gallery */}
      <Gallery media={place.media} />

      {/* Exploration Tag - Placeholder for MVP */}
      {/* In a full implementation, you'd check if this place is part of any exploration
          and render a link/button accordingly. */}
      {/* <div className="mt-6 p-4 bg-white rounded-xl shadow-card">
        <p className="text-gray-600">This place is part of an exploration.</p>
        <Link to="/explorations/some-id" className="text-primary hover:underline">Start/Continue Exploration</Link>
      </div> */}
    </div>
  );
}