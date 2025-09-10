// src/pages/PlaceDetailPage.jsx
import { useParams } from 'react-router-dom';
import { findPlaceById } from '../utils';
import PlaceDetailTabs from '../components/PlaceDetailTabs';

export default function PlaceDetailPage({ places }) {
  const { id } = useParams();
  const place = findPlaceById(places, id);

  if (!place) {
    return <div className="container mx-auto p-4">Place not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-background min-h-screen">
      <PlaceDetailTabs place={place} />
    </div>
  );
}