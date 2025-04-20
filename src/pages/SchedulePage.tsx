import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleGames, wudiInfo } from '../data/sampleData';
import { Game } from '../types';

const SchedulePage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const currentSeason = wudiInfo.current_season;
  
  // Filter games according to the selected filter
  let filteredGames: Game[] = [];
  if (currentSeason) {
    const allGames: Game[] = [];
    currentSeason.leagues.forEach(league => {
      if (league.schedule && league.schedule.games) {
        allGames.push(...league.schedule.games);
      }
    });
    
    if (filter === 'all') {
      filteredGames = allGames;
    } else if (filter === 'upcoming') {
      const today = new Date();
      filteredGames = allGames.filter(game => {
        const gameDate = new Date(game.date);
        return gameDate >= today;
      });
    } else if (filter === 'completed') {
      filteredGames = allGames.filter(game => 
        game.home_score !== null && game.away_score !== null
      );
    }
    
    // Sort games by date
    filteredGames.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
      
      // If dates are the same, sort by time
      return a.time.localeCompare(b.time);
    });
  } else {
    // Use sample games if no current season
    filteredGames = sampleGames;
  }
  
  return (
    <div className="schedule-page">
      <h1>Schedule</h1>
      
      {currentSeason ? (
        <h2>{currentSeason.season} {currentSeason.year} Schedule</h2>
      ) : (
        <h2>League Schedule</h2>
      )}
      
      <div className="filter-controls">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Games
        </button>
        <button 
          className={filter === 'upcoming' ? 'active' : ''} 
          onClick={() => setFilter('upcoming')}
        >
          Upcoming Games
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed Games
        </button>
      </div>
      
      {filteredGames.length > 0 ? (
        <div className="schedule-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Home</th>
                <th>Away</th>
                <th>Field</th>
                <th>Score</th>
                <th>Week</th>
                {filteredGames.some(game => game.round) && <th>Round</th>}
              </tr>
            </thead>
            <tbody>
              {filteredGames.map(game => (
                <tr key={game.id} className={getGameRowClass(game)}>
                  <td>{formatDate(game.date)}</td>
                  <td>{formatTime(game.time)}</td>
                  <td>{game.home_team.name}</td>
                  <td>{game.away_team.name}</td>
                  <td>{game.field.name}</td>
                  <td>
                    {game.home_score !== null && game.away_score !== null
                      ? `${game.home_score} - ${game.away_score}`
                      : 'TBD'}
                  </td>
                  <td>{game.week || '-'}</td>
                  {filteredGames.some(g => g.round) && (
                    <td>{game.round || '-'}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No games available for the selected filter.</p>
      )}
      
      <section className="schedule-legend">
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
            <div className="legend-color cancelled"></div>
            <span>Cancelled Game</span>
          </div>
        </div>
      </section>
      
      <div className="league-links">
        <h3>View Schedules by League</h3>
        <div className="league-links-grid">
          {currentSeason && currentSeason.leagues.map(league => (
            <Link 
              key={league.id} 
              to={`/seasons/${currentSeason.season.toLowerCase()}/${currentSeason.year}/${league.type.toLowerCase().replace("'", "")}`}
            >
              {league.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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

export default SchedulePage;