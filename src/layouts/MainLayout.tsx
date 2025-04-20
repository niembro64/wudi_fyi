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
                <li className="dropdown">
                  <span>Leagues</span>
                  <div className="dropdown-content">
                    {currentSeason.leagues.map(league => {
                      const leagueType = league.type === 'Co-ed' ? 'coed' : 
                                         league.type === 'Women\'s' ? 'womens' :
                                         league.type === 'Recreational' ? 'recreational' : '';
                      
                      return (
                        <Link 
                          key={league.id} 
                          to={`/seasons/${currentSeason.season.toLowerCase()}/${leagueType}/${currentSeason.year}`}
                        >
                          {league.name}
                        </Link>
                      );
                    })}
                  </div>
                </li>
              )}
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
              <h3>Leagues</h3>
              <ul>
                {currentSeason && currentSeason.leagues.map(league => {
                  const leagueType = league.type === 'Co-ed' ? 'coed' : 
                                     league.type === 'Women\'s' ? 'womens' :
                                     league.type === 'Recreational' ? 'recreational' : '';
                  
                  return (
                    <li key={league.id}>
                      <Link to={`/seasons/${currentSeason.season.toLowerCase()}/${leagueType}/${currentSeason.year}`}>
                        {league.name}
                      </Link>
                    </li>
                  );
                })}
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