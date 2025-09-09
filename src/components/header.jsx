// src/components/Header.jsx
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function Header({ projectTitle }) {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Project Title linking to Home */}
        <Link to="/" className="text-xl font-bold">
          {projectTitle || "Halifax"}
        </Link>
        {/* Navigation Menu */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-4">
            <li><Link to="/places" className="hover:underline">Places</Link></li>
            <li><Link to="/explorations" className="hover:underline">Explorations</Link></li>
            <li><Link to="/exhibits" className="hover:underline">Exhibits</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}