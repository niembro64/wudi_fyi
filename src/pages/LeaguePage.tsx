import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleSeasons, wudiInfo } from '../data/sampleData';
import { LeagueType, Game } from '../types';

const LeaguePage: React.FC = () => {
  const { leagueType } = useParams<{ leagueType: string }>();
  
  // Get current season from WUDI info
  const currentSeason = wudiInfo.current_season;
  
  if (!currentSeason) {
    return (
      <div className="not-found">
        <h2>No active season found</h2>
        <Link to="/">Return to home</Link>
      </div>
    );
  }
  
  // Find the league
  const formattedLeagueType = leagueType === 'womens' ? LeagueType.WOMENS :
                             leagueType === 'coed' ? LeagueType.COED :
                             leagueType === 'recreational' ? LeagueType.REC : null;
  
  const leagueData = currentSeason.leagues.find(l => l.type === formattedLeagueType);
  
  if (!leagueData) {
    return (
      <div className="not-found">
        <h2>League not found</h2>
        <p>The {leagueType} league could not be found.</p>
        <Link to="/">Return to home</Link>
      </div>
    );
  }
  
  // Group games by date
  const gamesByDate: Record<string, Game[]> = {};
  
  if (leagueData.schedule && leagueData.schedule.games) {
    // Sort games by date and time
    const sortedGames = [...leagueData.schedule.games].sort((a, b) => {
      // First sort by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
      
      // If same date, sort by time
      return a.time.localeCompare(b.time);
    });
    
    // Group by date
    sortedGames.forEach(game => {
      if (!gamesByDate[game.date]) {
        gamesByDate[game.date] = [];
      }
      gamesByDate[game.date].push(game);
    });
  }
  
  return (
    <div className="league-page">
      <h1>{leagueData.name}</h1>
      
      {leagueData.description && (
        <section className="league-description">
          <p>{leagueData.description}</p>
        </section>
      )}
      
      <section className="league-info">
        <h2>League Information</h2>
        
        <div className="info-grid">
          {leagueData.location && (
            <div className="info-item">
              <h3>Location</h3>
              <p>{leagueData.location.name}</p>
            </div>
          )}
          
          {leagueData.emergency_number && (
            <div className="info-item">
              <h3>Emergency Number</h3>
              <p>{leagueData.emergency_number}</p>
            </div>
          )}
          
          {leagueData.rules && leagueData.rules.gender_ratio && (
            <div className="info-item">
              <h3>Gender Ratio</h3>
              <p>{leagueData.rules.gender_ratio}</p>
            </div>
          )}
          
          {leagueData.rules && leagueData.rules.game_length && (
            <div className="info-item">
              <h3>Game Length</h3>
              <p>{leagueData.rules.game_length}</p>
            </div>
          )}
        </div>
      </section>
      
      {leagueType === 'coed' && (
        <section className="gender-ratios">
          <h2>Gender Ratios</h2>
          <div className="image-container">
            <img src="/gender_ratios.png" alt="Gender Ratios" className="info-image" />
          </div>
        </section>
      )}

      <section className="fields-map">
        <h2>Fields Map</h2>
        <div className="image-container">
          <img src="/fields_map.png" alt="Fields Map" className="info-image" />
        </div>
      </section>
      
      <section className="league-schedule">
        <h2>Schedule</h2>
        
        {Object.keys(gamesByDate).length > 0 ? (
          <div className="schedule-days">
            {Object.keys(gamesByDate).sort().map(date => {
              // Group games by time for this date
              const gamesByTime: Record<string, Game[]> = {};
              gamesByDate[date].forEach(game => {
                if (!gamesByTime[game.time]) {
                  gamesByTime[game.time] = [];
                }
                gamesByTime[game.time].push(game);
              });
              
              const gameDate = new Date(date);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              gameDate.setHours(0, 0, 0, 0);
              
              let dayClass = 'future';
              if (gameDate.getTime() < today.getTime()) {
                dayClass = 'past';
              } else if (gameDate.getTime() === today.getTime()) {
                dayClass = 'today';
              }
              
              return (
                <div key={date} className={`schedule-day ${dayClass}`}>
                  <h3>{formatShortDate(date)}</h3>
                  
                  {Object.keys(gamesByTime).sort().map(time => (
                    <div key={`${date}-${time}`} className="time-slot">
                      <h4>{formatTime(time)}</h4>
                      
                      <div className="games-table-container">
                        <table className="games-table">
                          <thead>
                            <tr>
                              <th>White</th>
                              <th>Dark</th>
                              <th>Field</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gamesByTime[time].map(game => (
                              <tr key={game.id} className="game-row">
                                <td>{getShortTeamName(game.home_team.name)}</td>
                                <td>{getShortTeamName(game.away_team.name)}</td>
                                <td>{getShortFieldName(game.field.name)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No schedule available yet.</p>
        )}
        
        <div className="schedule-legend">
          <h3>Legend</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color past"></div>
              <span>Past Day</span>
            </div>
            <div className="legend-item">
              <div className="legend-color today"></div>
              <span>Today</span>
            </div>
            <div className="legend-item">
              <div className="legend-color future"></div>
              <span>Future Day</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper functions
const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  
  return `${month} ${day}`;
};

const formatTime = (timeString: string): string => {
  // Assuming timeString is in 24-hour format (e.g., "18:00")
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const getShortTeamName = (fullName: string): string => {
  if (fullName.startsWith('Team ')) {
    return 'T' + fullName.substring(5); // "Team 1" -> "T1"
  }
  return fullName;
};

const getShortFieldName = (fullName: string): string => {
  if (fullName.startsWith('WUDI Field ')) {
    return 'F' + fullName.substring(11); // "WUDI Field 1" -> "F1"
  }
  return fullName;
};

export default LeaguePage;