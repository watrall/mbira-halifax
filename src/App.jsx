// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import LandingPage from './pages/LandingPage';
import PlacesList from './pages/PlacesList';
import PlaceDetailPage from './pages/PlaceDetailPage';
import ExplorationsList from './pages/ExplorationsList';
import ExplorationPage from './pages/ExplorationPage';
import ExhibitsList from './pages/ExhibitsList';
import ExhibitDetailPage from './pages/ExhibitDetailPage';
import AboutPage from './pages/AboutPage';
import projectData from './data/project.json';
import placesData from './data/places.json';
import explorationsData from './data/explorations.json';
import exhibitsData from './data/exhibits.json';
import './App.css';
import BottomNav from './components/BottomNav';

function AppContent() {
  const location = useLocation();
  const [project, setProject] = useState({});
  const [places, setPlaces] = useState([]);
  const [explorations, setExplorations] = useState([]);
  const [exhibits, setExhibits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProject(projectData);
    setPlaces(placesData.places || []);
    setExplorations(explorationsData.explorations || []);
    setExhibits(exhibitsData.exhibits || []);
  }, []);

  const showSearchBar = location.pathname === '/' || location.pathname.startsWith('/explorations/') || location.pathname.startsWith('/exhibits/');

  return (
    <div className="App flex flex-col min-h-screen bg-background">
      <Header
        projectTitle={project.title}
        showSearch={showSearchBar}
        onSearchChange={setSearchTerm}
      />
      <main className="flex-grow pb-16">
        <Routes>
          <Route path="/" element={<div className="mx-auto max-w-screen-sm"><LandingPage project={project} places={places} /></div>} />
          <Route path="/places" element={<div className="mx-auto max-w-screen-sm"><PlacesList places={places} searchTerm={searchTerm} /></div>} />
          <Route path="/places/:id" element={<PlaceDetailPage places={places} />} />
          <Route path="/explorations" element={<div className="mx-auto max-w-screen-sm"><ExplorationsList explorations={explorations} /></div>} />
          <Route path="/explorations/:id" element={<ExplorationPage explorations={explorations} places={places} searchTerm={searchTerm} />} />
          <Route path="/exhibits" element={<div className="mx-auto max-w-screen-sm"><ExhibitsList exhibits={exhibits} /></div>} />
          <Route path="/exhibits/:id" element={<ExhibitDetailPage exhibits={exhibits} places={places} searchTerm={searchTerm} />} />
          <Route path="/about" element={<div className="mx-auto max-w-screen-sm"><AboutPage project={project} /></div>} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
