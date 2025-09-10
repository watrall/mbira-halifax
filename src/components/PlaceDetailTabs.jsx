// src/components/PlaceDetailTabs.jsx
import { useState } from 'react';
import Gallery from './Gallery';
import ModelViewer from './ModelViewer';

export default function PlaceDetailTabs({ place }) {
  const [activeTab, setActiveTab] = useState('about');

  const mediaCount = (place.media.gallery?.length || 0) +
                     (place.media.video ? 1 : 0) +
                     (place.media.model3D ? 1 : 0);

  return (
    <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
      <div className="relative h-64">
        <img
          src={place.media.heroImage}
          alt={`Hero image for ${place.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h1 className="text-white text-2xl font-bold heading-font">{place.name}</h1>
          <p className="text-white text-sm">{place.category}</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('about')}
            className={`py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors duration-200 ease-in-out ${
              activeTab === 'about'
                ? 'border-primary text-primary'
                : 'border-transparent text-textSecondary hover:text-textPrimary hover:border-gray-300'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors duration-200 ease-in-out flex items-center gap-1 ${
              activeTab === 'media'
                ? 'border-primary text-primary'
                : 'border-transparent text-textSecondary hover:text-textPrimary hover:border-gray-300'
            }`}
          >
            Media
            {mediaCount > 0 && (
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-1.5 py-0.5 rounded-full">
                {mediaCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('digdeeper')}
            className={`py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors duration-200 ease-in-out ${
              activeTab === 'digdeeper'
                ? 'border-primary text-primary'
                : 'border-transparent text-textSecondary hover:text-textPrimary hover:border-gray-300'
            }`}
          >
            Dig Deeper
          </button>
          <button
            onClick={() => setActiveTab('conversations')}
            className={`py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors duration-200 ease-in-out ${
              activeTab === 'conversations'
                ? 'border-primary text-primary'
                : 'border-transparent text-textSecondary hover:text-textPrimary hover:border-gray-300'
            }`}
          >
            Conversations
          </button>
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'about' && (
          <div>
            {place.media.audio && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-semibold mb-2 text-textPrimary">Listen</h2>
                <audio controls className="w-full">
                  <source src={place.media.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            <div className="prose max-w-none text-textPrimary">
              <p>{place.description}</p>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            {place.media.model3D && <ModelViewer src={place.media.model3D} />}
            <Gallery media={place.media} />
          </div>
        )}

        {activeTab === 'digdeeper' && (
          <div className="text-textPrimary">
            <p>Content for "Dig Deeper" section would go here. This could link to external resources, documents, or related exhibits.</p>
          </div>
        )}

        {activeTab === 'conversations' && (
          <div className="text-textPrimary">
            <p>The "Conversations" section would display user comments and discussions related to this place.</p>
            <div className="mt-4 space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">U</span>
                  </div>
                  <span className="font-medium text-sm">User123</span>
                  <span className="text-xs text-gray-500">Public</span>
                </div>
                <p className="text-sm">This is a sample comment about the place.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-800">E</span>
                  </div>
                  <span className="font-medium text-sm">Expert456</span>
                  <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Expert</span>
                </div>
                <p className="text-sm">An expert's insight on the historical significance.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}