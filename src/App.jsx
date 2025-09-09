// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import routing components
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import PlacesList from './pages/PlacesList';
import PlaceDetailPage from './pages/PlaceDetailPage';
import ExplorationsList from './pages/ExplorationsList';
import ExplorationPage from './pages/ExplorationPage';
import ExhibitsList from './pages/ExhibitsList';
import ExhibitDetailPage from './pages/ExhibitDetailPage';
import AboutPage from './pages/AboutPage';
// Import dummy data
import projectData from './data/project.json';
import placesData from './data/places.json';
import explorationsData from './data/explorations.json';
import exhibitsData from './data/exhibits.json';
import './App.css'; // Optional for global styles

function App() {
  const [project, setProject] = useState({});
  const [places, setPlaces] = useState([]);
  const [explorations, setExplorations] = useState([]);
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    // Load data from JSON files
    setProject(projectData);
    // The PRD data has the array under a "places" key
    setPlaces(placesData.places || []);
    setExplorations(explorationsData.explorations || []);
    setExhibits(exhibitsData.exhibits || []);
  }, []);

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Header is always visible */}
      <Header projectTitle={project.title} />
      {/* Main content area where pages are rendered based on the route */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage project={project} places={places} />} />
          <Route path="/places" element={<PlacesList places={places} />} />
          <Route path="/places/:id" element={<PlaceDetailPage places={places} />} />
          <Route path="/explorations" element={<ExplorationsList explorations={explorations} />} />
          <Route path="/explorations/:id" element={<ExplorationPage explorations={explorations} places={places} />} />
          <Route path="/exhibits" element={<ExhibitsList exhibits={exhibits} />} />
          <Route path="/exhibits/:id" element={<ExhibitDetailPage exhibits={exhibits} places={places} />} />
          <Route path="/about" element={<AboutPage project={project} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;