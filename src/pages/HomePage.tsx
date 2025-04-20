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
                    to={`/seasons/${currentSeason.season.toLowerCase()}/${leagueType}/${currentSeason.year}`} 
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
          
          {currentSeason.theme && (
            <div className="season-theme">
              <h3>Season Theme</h3>
              <p>{currentSeason.theme}</p>
            </div>
          )}
          
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
                      <p><strong>Start Date:</strong> {new Date(league.schedule.start_date).toLocaleDateString()}</p>
                      <p><strong>End Date:</strong> {new Date(league.schedule.end_date).toLocaleDateString()}</p>
                      <p><strong>Game Days:</strong> {getDayOfWeek(league.schedule.start_date)}s</p>
                    </div>
                  )}
                  
                  <Link 
                    to={`/seasons/${currentSeason.season.toLowerCase()}/${leagueType}/${currentSeason.year}`} 
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
      
      <section className="slack-community">
        <h2>Join Our Slack Community</h2>
        <p>
          All players are welcome and encouraged to join the WUDI League Slack channel 
          to help all of us in the community engage with each other!
        </p>
        
        <div className="slack-channels">
          <h3>Available Channels</h3>
          <ul>
            <li><strong>#ask-the-board</strong> - Ask your hard-hitting questions here</li>
            <li><strong>#general</strong> - General discussion</li>
            <li><strong>#weather-announcements</strong> - Stay up to date with weather cancellations</li>
            <li><strong>#where-to-play</strong> - Find playing opportunities, tryouts, tournaments</li>
            <li><strong>#wudi-ride-board</strong> - Coordinate rides to games</li>
            <li><strong>#wudi-social-club</strong> - Social events and announcements</li>
            <li><strong>#wudi-workouts</strong> - Find workout buddies and share fitness tips</li>
          </ul>
        </div>
        
        {wudiInfo.slack_invite_link ? (
          <a href={wudiInfo.slack_invite_link} className="slack-invite-button" target="_blank" rel="noopener noreferrer">
            Join WUDI Slack
          </a>
        ) : (
          <p>
            Ask your captain for the Slack invite link or email {wudiInfo.contact_email || 'theboard@wudi.org'}
          </p>
        )}
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