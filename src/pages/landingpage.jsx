// src/pages/LandingPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { getRandomPlace } from '../utils';

export default function LandingPage({ project, places }) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleRandomPlace = () => {
    const randomPlace = getRandomPlace(places);
    if (randomPlace) {
      // Navigate to the Place Detail page for the random place
      navigate(`/places/${randomPlace.id}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-8 h-64 md:h-96">
        <img
          src={project.heroImage}
          alt="Project Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{project.title}</h1>
          <p className="text-white text-base md:text-lg">{project.shortDescription}</p>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link to="/exhibits" className="bg-white border rounded-xl p-4 shadow-card text-center hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Explore Exhibits</h3>
          <p className="text-gray-600 text-sm">Discover curated collections</p>
        </Link>
        <Link to="/explorations" className="bg-white border rounded-xl p-4 shadow-card text-center hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">View Explorations</h3>
          <p className="text-gray-600 text-sm">Follow guided paths</p>
        </Link>
        <Link to="/places" className="bg-white border rounded-xl p-4 shadow-card text-center hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">View Places</h3>
          <p className="text-gray-600 text-sm">Browse all locations</p>
        </Link>
        <button
          onClick={handleRandomPlace}
          className="bg-white border rounded-xl p-4 shadow-card text-center hover:shadow-lg transition-shadow sm:col-span-1 lg:col-span-1"
        >
          <h3 className="font-semibold text-lg mb-2">View Random Place</h3>
          <p className="text-gray-600 text-sm">Surprise me!</p>
        </button>
        <Link to="/about" className="bg-white border rounded-xl p-4 shadow-card text-center hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-2">Learn More About This Project</h3>
          <p className="text-gray-600 text-sm">Read about the Halifax template</p>
        </Link>
      </div>
    </div>
  );
}