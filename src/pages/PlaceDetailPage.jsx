// src/pages/PlaceDetailPage.jsx
import { useParams } from 'react-router-dom';
import { findPlaceById } from '../utils';
import PlaceDetail from '../components/PlaceDetail'; // We'll create this next

export default function PlaceDetailPage({ places }) {
  const { id } = useParams(); // Get the place ID from the URL
  const place = findPlaceById(places, id);

  if (!place) {
    return <div className="container mx-auto p-4">Place not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <PlaceDetail place={place} allPlaces={places} />
    </div>
  );
}