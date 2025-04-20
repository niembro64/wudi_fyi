import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { wudiInfo } from '../data/sampleData';

const MainLayout: React.FC = () => {
  const currentSeason = wudiInfo.current_season;
  
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            WUDI
          </Link>
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {currentSeason && (
                <li>
                  <Link to={`/seasons/${currentSeason.season.toLowerCase()}/${currentSeason.year}`}>
                    Schedule
                  </Link>
                </li>
              )}
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>WUDI</h3>
              <p>Westchester Ultimate Disc, Inc.</p>
            </div>
            
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: {wudiInfo.contact_email || 'theboard@wudi.org'}</p>
              <p>Emergency: {wudiInfo.emergency_number || '914.251.6900'}</p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                {currentSeason && (
                  <li>
                    <Link to={`/seasons/${currentSeason.season.toLowerCase()}/${currentSeason.year}`}>
                      Schedule
                    </Link>
                  </li>
                )}
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Westchester Ultimate Disc, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;