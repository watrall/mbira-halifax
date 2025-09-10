// src/pages/LandingPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import Fab from '../components/ui/Fab';

export default function LandingPage({ project, places }) {
  const navigate = useNavigate();

  const handleRandomPlace = () => {
    if (!places?.length) return;
    const idx = Math.floor(Math.random() * places.length);
    const p = places[idx];
    navigate(`/places/${p.id}`);
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <div className="relative rounded-[2rem] overflow-hidden mb-8 h-80 md:h-[28rem] shadow-high bg-gray-200">
        {project?.heroImage && (
          <img src={project.heroImage} alt="Project Hero" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="max-w-[90%]">
            <h1 className="heading-font text-white text-3xl md:text-4xl font-extrabold leading-tight drop-shadow">
              {project?.title || 'Halifax'}
            </h1>
            {project?.shortDescription && (
              <p className="text-white/90 text-base md:text-lg mt-2">
                {project.shortDescription}
              </p>
            )}
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            <Fab label="Exhibits" icon="collections_bookmark" onClick={() => navigate('/exhibits')} />
            <Fab label="Explorations" icon="route" onClick={() => navigate('/explorations')} />
            <Fab label="All Places" icon="location_on" onClick={() => navigate('/places')} />
            <Fab label="Random" icon="shuffle" onClick={handleRandomPlace} />
            <Fab label="Learn More" icon="info" onClick={() => navigate('/about')} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link to="/exhibits" className="bg-white border rounded-xl p-4 shadow-card text-left hover:shadow-high transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Explore Exhibits</h3>
          <p className="text-gray-600 text-sm">Discover curated collections</p>
        </Link>
        <Link to="/explorations" className="bg-white border rounded-xl p-4 shadow-card text-left hover:shadow-high transition-shadow">
          <h3 className="font-semibold text-lg mb-2">View Explorations</h3>
          <p className="text-gray-600 text-sm">Follow guided paths</p>
        </Link>
        <Link to="/places" className="bg-white border rounded-xl p-4 shadow-card text-left hover:shadow-high transition-shadow">
          <h3 className="font-semibold text-lg mb-2">View Places</h3>
          <p className="text-gray-600 text-sm">Browse all locations</p>
        </Link>
      </div>
    </div>
  );
}

