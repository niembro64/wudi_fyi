import React from 'react';
import { Link } from 'react-router-dom';
import { wudiInfo } from '../data/sampleData';

const HomePage: React.FC = () => {
  const currentSeason = wudiInfo.current_season;
  const announcements = wudiInfo.announcements || [];
  
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to WUDI</h1>
          <p>Westchester Ultimate Disc, Inc.</p>
          
          {currentSeason && (
            <div className="cta-buttons">
              {currentSeason.leagues.map(league => {
                const leagueType = league.type === 'Co-ed' ? 'coed' : 
                                   league.type === 'Women\'s' ? 'womens' :
                                   league.type === 'Recreational' ? 'recreational' : '';
                
                return (
                  <Link 
                    key={league.id}
                    to={`/leagues/${leagueType}`} 
                    className="cta-button"
                  >
                    View {league.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      <section className="emergency-info">
        <h2>Emergency Information</h2>
        <div className="emergency-content">
          <p>
            <strong>Emergency Number:</strong> {wudiInfo.emergency_number || '914.251.6900'}
          </p>
          <p>
            This number should be used for emergencies at our playing fields. It will connect
            you to security services at SUNY Purchase for a faster response than 911.
          </p>
          <p>
            <strong>Please save this number in your phone as "WUDI Emergency" or "Purchase Emergency".</strong>
          </p>
        </div>
      </section>
      
      {announcements.length > 0 && (
        <section className="announcements">
          <h2>Important Announcements</h2>
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-card">
                <h3>{announcement.title}</h3>
                <p className="announcement-date">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
                <div className="announcement-content">
                  {announcement.content}
                </div>
                {announcement.author && (
                  <p className="announcement-author">
                    Posted by: {announcement.author.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {currentSeason && (
        <section className="current-season-info">
          <h2>{currentSeason.season} {currentSeason.year} Season</h2>
          <p>{currentSeason.description}</p>
          
          <div className="leagues-grid">
            {currentSeason.leagues.map(league => {
              const leagueType = league.type === 'Co-ed' ? 'coed' : 
                                 league.type === 'Women\'s' ? 'womens' :
                                 league.type === 'Recreational' ? 'recreational' : '';
              
              return (
                <div key={league.id} className="league-card">
                  <h3>{league.name}</h3>
                  <p>{league.description}</p>
                  
                  {league.schedule && (
                    <div className="schedule-info">
                      <p><strong>Game Days:</strong> {getDayOfWeek(league.schedule.start_date)}s</p>
                    </div>
                  )}
                  
                  <Link 
                    to={`/leagues/${leagueType}`} 
                    className="view-schedule"
                  >
                    View Schedule
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
      
      <section className="field-info">
        <h2>Field Information</h2>
        <div className="field-details">
          <p>
            <strong>Location:</strong> SUNY Purchase, 735 Anderson Hill Rd, Purchase, NY 10577
          </p>
          <p>
            <strong>Parking:</strong> Available at the Performing Arts Center (PAC) and the Great Lawn
          </p>
          <p>
            <strong>Emergency Number:</strong> 914.251.6900
          </p>
        </div>
        
        <div className="field-map-links">
          <h3>Google Maps Links</h3>
          <div className="map-links-grid">
            <a 
              href="https://maps.google.com/?q=SUNY+Purchase+PAC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              PAC Parking
            </a>
            <a 
              href="https://maps.google.com/?q=SUNY+Purchase+Great+Lawn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              Great Lawn Parking
            </a>
            <a 
              href="https://maps.google.com/?q=SUNY+Purchase+Field+1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              Field 1, 2, 3, 4 Parking
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get day of week from date string
const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export default HomePage;