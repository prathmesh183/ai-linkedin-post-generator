import { Link, useLocation } from 'react-router-dom';
import { Zap, BookOpen } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <Zap size={16} strokeWidth={2.5} />
          </div>
          <span className="logo-text">PostCraft<span className="logo-ai">AI</span></span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            <Zap size={15} />
            Generate
          </Link>
          <Link to="/history" className={`nav-link ${pathname === '/history' ? 'active' : ''}`}>
            <BookOpen size={15} />
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
