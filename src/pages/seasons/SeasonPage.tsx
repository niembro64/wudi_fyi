import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleSeasons } from '../../data/sampleData';
import { Season, Game } from '../../types';

const SeasonPage: React.FC = () => {
  const { season, year } = useParams<{ season?: string; year?: string }>();
  const [activeLeagueId, setActiveLeagueId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  
  // Find the correct season from our data
  const formattedSeason = season ? (season.charAt(0).toUpperCase() + season.slice(1)) as Season : null;
  const formattedYear = year ? parseInt(year) : null;
  
  const seasonData = formattedSeason && formattedYear ? 
    sampleSeasons.find(s => s.season === formattedSeason && s.year === formattedYear) : null;
  
  if (!seasonData) {
    return (
      <div className="not-found">
        <h2>Season not found</h2>
        <p>The {season} {year} season could not be found.</p>
        <Link to="/">Return to home</Link>
      </div>
    );
  }
  
  // Get all games from all leagues in this season
  const allGames: Game[] = [];
  seasonData.leagues.forEach(league => {
    if (league.schedule && league.schedule.games) {
      if (!activeLeagueId || activeLeagueId === league.id) {
        allGames.push(...league.schedule.games);
      }
    }
  });
  
  // Sort games by date and time
  const sortedGames = [...allGames].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    
    // If dates are the same, sort by time
    return a.time.localeCompare(b.time);
  });
  
  // Group games by date for calendar view
  const gamesByDate: Record<string, Game[]> = {};
  sortedGames.forEach(game => {
    if (!gamesByDate[game.date]) {
      gamesByDate[game.date] = [];
    }
    gamesByDate[game.date].push(game);
  });
  
  // Group games by week for list view
  const gamesByWeek: Record<number, Record<string, Game[]>> = {};
  sortedGames.forEach(game => {
    const week = game.week || 0;
    if (!gamesByWeek[week]) {
      gamesByWeek[week] = {};
    }
    
    // Group by time slot within each week (for the 6:00 PM / 6:40 PM display)
    const timeSlot = game.time;
    if (!gamesByWeek[week][timeSlot]) {
      gamesByWeek[week][timeSlot] = [];
    }
    
    gamesByWeek[week][timeSlot].push(game);
  });
  
  // Get weeks in order
  const weeks = Object.keys(gamesByWeek).map(Number).sort((a, b) => a - b);
  
  return (
    <div className="season-page schedule-page">
      <div className="page-header">
        <h1>{seasonData.season} {seasonData.year} Schedule</h1>
        
        {seasonData.description && (
          <p className="season-description">{seasonData.description}</p>
        )}
      </div>
      
      <div className="schedule-controls">
        <div className="league-filters">
          <button 
            className={!activeLeagueId ? 'active' : ''} 
            onClick={() => setActiveLeagueId(null)}
          >
            All Leagues
          </button>
          
          {seasonData.leagues.map(league => (
            <button 
              key={league.id}
              className={activeLeagueId === league.id ? 'active' : ''}
              onClick={() => setActiveLeagueId(league.id)}
            >
              {league.name}
            </button>
          ))}
        </div>
        
        <div className="view-controls">
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          
          <button 
            className={viewMode === 'calendar' ? 'active' : ''}
            onClick={() => setViewMode('calendar')}
          >
            Calendar View
          </button>
        </div>
      </div>
      
      {/* Important game time notice */}
      <div className="schedule-notice">
        <strong>Game Times:</strong> Teams play two games each night - first game starts at 6:00 PM and second game starts at 6:40 PM.
      </div>
      
      {/* Important field information section */}
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
      
      {/* List View */}
      {viewMode === 'list' && (
        <div className="schedule-list-view">
          {sortedGames.length > 0 ? (
            weeks.map(week => (
              <div key={week} className="schedule-week">
                <h2>Week {week}</h2>
                
                {/* First Round - 6:00 PM Games */}
                {gamesByWeek[week]['18:00'] && gamesByWeek[week]['18:00'].length > 0 && (
                  <div className="time-slot">
                    <h3>6:00 PM Games</h3>
                    <div className="schedule-container">
                      <table className="schedule-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Field</th>
                            <th>League</th>
                            <th>Score</th>
                            {gamesByWeek[week]['18:00'].some(game => game.round) && <th>Round</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {gamesByWeek[week]['18:00'].map(game => {
                            // Find which league this game belongs to
                            const league = seasonData.leagues.find(l => 
                              l.schedule?.games.some(g => g.id === game.id)
                            );
                            
                            return (
                              <tr 
                                key={game.id} 
                                className={getGameRowClass(game)}
                              >
                                <td>{formatDate(game.date)}</td>
                                <td>{game.home_team.name}</td>
                                <td>{game.away_team.name}</td>
                                <td>{game.field.name}</td>
                                <td>{league?.type || 'Unknown'}</td>
                                <td>
                                  {game.home_score !== null && game.away_score !== null
                                    ? `${game.home_score} - ${game.away_score}`
                                    : 'TBD'}
                                </td>
                                {gamesByWeek[week]['18:00'].some(g => g.round) && (
                                  <td>{game.round || '-'}</td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {/* Second Round - 6:40 PM Games */}
                {gamesByWeek[week]['18:40'] && gamesByWeek[week]['18:40'].length > 0 && (
                  <div className="time-slot">
                    <h3>6:40 PM Games</h3>
                    <div className="schedule-container">
                      <table className="schedule-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Field</th>
                            <th>League</th>
                            <th>Score</th>
                            {gamesByWeek[week]['18:40'].some(game => game.round) && <th>Round</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {gamesByWeek[week]['18:40'].map(game => {
                            // Find which league this game belongs to
                            const league = seasonData.leagues.find(l => 
                              l.schedule?.games.some(g => g.id === game.id)
                            );
                            
                            return (
                              <tr 
                                key={game.id} 
                                className={getGameRowClass(game)}
                              >
                                <td>{formatDate(game.date)}</td>
                                <td>{game.home_team.name}</td>
                                <td>{game.away_team.name}</td>
                                <td>{game.field.name}</td>
                                <td>{league?.type || 'Unknown'}</td>
                                <td>
                                  {game.home_score !== null && game.away_score !== null
                                    ? `${game.home_score} - ${game.away_score}`
                                    : 'TBD'}
                                </td>
                                {gamesByWeek[week]['18:40'].some(g => g.round) && (
                                  <td>{game.round || '-'}</td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-games">No games found for the selected league.</p>
          )}
        </div>
      )}
      
      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="schedule-calendar-view">
          {sortedGames.length > 0 ? (
            Object.keys(gamesByDate).sort().map(date => (
              <div key={date} className="calendar-day">
                <h2>{formatDate(date, true)}</h2>
                
                {/* Group games by time */}
                <div className="time-blocks">
                  {/* 6:00 PM Games */}
                  <div className="time-block">
                    <h3>6:00 PM Games</h3>
                    <div className="day-games">
                      {gamesByDate[date]
                        .filter(game => game.time === '18:00')
                        .map(game => {
                          // Find which league this game belongs to
                          const league = seasonData.leagues.find(l => 
                            l.schedule?.games.some(g => g.id === game.id)
                          );
                          
                          return (
                            <div 
                              key={game.id} 
                              className={`game-card ${getGameCardClass(game)}`}
                            >
                              <div className="game-teams">
                                <span className="home-team">{game.home_team.name}</span>
                                <span className="vs">vs</span>
                                <span className="away-team">{game.away_team.name}</span>
                              </div>
                              <div className="game-details">
                                <span className="field">{game.field.name}</span>
                                <span className="league">{league?.type || 'Unknown'}</span>
                              </div>
                              {game.home_score !== null && game.away_score !== null && (
                                <div className="game-score">
                                  {game.home_score} - {game.away_score}
                                </div>
                              )}
                              {game.round && (
                                <div className="game-round">{game.round}</div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  
                  {/* 6:40 PM Games */}
                  <div className="time-block">
                    <h3>6:40 PM Games</h3>
                    <div className="day-games">
                      {gamesByDate[date]
                        .filter(game => game.time === '18:40')
                        .map(game => {
                          // Find which league this game belongs to
                          const league = seasonData.leagues.find(l => 
                            l.schedule?.games.some(g => g.id === game.id)
                          );
                          
                          return (
                            <div 
                              key={game.id} 
                              className={`game-card ${getGameCardClass(game)}`}
                            >
                              <div className="game-teams">
                                <span className="home-team">{game.home_team.name}</span>
                                <span className="vs">vs</span>
                                <span className="away-team">{game.away_team.name}</span>
                              </div>
                              <div className="game-details">
                                <span className="field">{game.field.name}</span>
                                <span className="league">{league?.type || 'Unknown'}</span>
                              </div>
                              {game.home_score !== null && game.away_score !== null && (
                                <div className="game-score">
                                  {game.home_score} - {game.away_score}
                                </div>
                              )}
                              {game.round && (
                                <div className="game-round">{game.round}</div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-games">No games found for the selected league.</p>
          )}
        </div>
      )}
      
      <section className="league-rules">
        <h2>League Rules and Information</h2>
        
        <div className="rules-grid">
          {seasonData.leagues.map(league => (
            <div key={league.id} className="league-rules-card">
              <h3>{league.name}</h3>
              
              {league.rules && (
                <div className="rules-list">
                  {league.rules.gender_ratio && (
                    <p><strong>Gender Ratio:</strong> {league.rules.gender_ratio}</p>
                  )}
                  
                  {league.rules.game_length && (
                    <p><strong>Game Length:</strong> {league.rules.game_length}</p>
                  )}
                  
                  {league.rules.timeouts && (
                    <p><strong>Timeouts:</strong> {league.rules.timeouts}</p>
                  )}
                  
                  {league.rules.field_size && (
                    <p><strong>Field Size:</strong> {league.rules.field_size}</p>
                  )}
                  
                  {league.rules.substitution_rules && (
                    <p><strong>Substitution Rules:</strong> {league.rules.substitution_rules}</p>
                  )}
                  
                  {league.rules.other_rules && (
                    <p><strong>Other Rules:</strong> {league.rules.other_rules}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <div className="schedule-legend">
        <h3>Schedule Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color upcoming"></div>
            <span>Upcoming Game</span>
          </div>
          <div className="legend-item">
            <div className="legend-color completed"></div>
            <span>Completed Game</span>
          </div>
          <div className="legend-item">
            <div className="legend-color today"></div>
            <span>Today's Game</span>
          </div>
          <div className="legend-item">
            <div className="legend-color cancelled"></div>
            <span>Cancelled Game</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatDate = (dateString: string, includeDay: boolean = false): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: includeDay ? 'long' : 'short',
    month: 'short',
    day: 'numeric',
    year: includeDay ? 'numeric' : undefined
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

const formatTime = (timeString: string): string => {
  // Assuming timeString is in 24-hour format (e.g., "18:00")
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const getGameRowClass = (game: Game): string => {
  if (game.status === 'Cancelled') {
    return 'cancelled';
  } else if (game.home_score !== null && game.away_score !== null) {
    return 'completed';
  } else {
    const gameDate = new Date(game.date);
    const today = new Date();
    if (gameDate.toDateString() === today.toDateString()) {
      return 'today';
    } else if (gameDate > today) {
      return 'upcoming';
    } else {
      return '';
    }
  }
};

const getGameCardClass = (game: Game): string => {
  if (game.status === 'Cancelled') {
    return 'cancelled';
  } else if (game.home_score !== null && game.away_score !== null) {
    return 'completed';
  } else {
    const gameDate = new Date(game.date);
    const today = new Date();
    if (gameDate.toDateString() === today.toDateString()) {
      return 'today';
    } else if (gameDate > today) {
      return 'upcoming';
    } else {
      return '';
    }
  }
};

export default SeasonPage;