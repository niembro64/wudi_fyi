import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleTeams, wudiInfo } from '../../data/sampleData';
import { Team, LeagueType } from '../../types';

const TeamsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const currentSeason = wudiInfo.current_season;
  
  // Get all teams from the current season
  let allTeams: Team[] = [];
  if (currentSeason) {
    currentSeason.leagues.forEach(league => {
      if (league.teams) {
        allTeams = [...allTeams, ...league.teams];
      }
    });
  } else {
    // Use sample teams if no current season
    allTeams = sampleTeams;
  }
  
  // Filter teams based on league type
  const filteredTeams = filter === 'all' 
    ? allTeams 
    : allTeams.filter(team => {
        // Find which league this team belongs to
        let leagueType: LeagueType | null = null;
        if (currentSeason) {
          for (const league of currentSeason.leagues) {
            if (league.teams && league.teams.some(t => t.id === team.id)) {
              leagueType = league.type;
              break;
            }
          }
        }
        
        return leagueType?.toLowerCase() === filter;
      });
  
  // Sort teams by wins (descending)
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    if (!a.stats || !b.stats) return 0;
    return b.stats.wins - a.stats.wins;
  });
  
  return (
    <div className="teams-page">
      <h1>Teams</h1>
      
      {currentSeason && (
        <h2>{currentSeason.season} {currentSeason.year} Teams</h2>
      )}
      
      <div className="filter-controls">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Teams
        </button>
        <button 
          className={filter === 'co-ed' ? 'active' : ''} 
          onClick={() => setFilter('co-ed')}
        >
          Co-ed
        </button>
        <button 
          className={filter === 'women\'s' ? 'active' : ''} 
          onClick={() => setFilter('women\'s')}
        >
          Women's
        </button>
        <button 
          className={filter === 'recreational' ? 'active' : ''} 
          onClick={() => setFilter('recreational')}
        >
          Recreational
        </button>
      </div>
      
      {sortedTeams.length > 0 ? (
        <div className="teams-grid">
          {sortedTeams.map(team => (
            <div key={team.id} className="team-card">
              <div className="team-header" style={{ backgroundColor: team.color || '#333' }}>
                <h3>{team.name}</h3>
                {team.logo && <img src={team.logo} alt={`${team.name} logo`} />}
              </div>
              
              <div className="team-content">
                {team.captains.length > 0 && (
                  <div className="team-captains">
                    <h4>Captains</h4>
                    <ul>
                      {team.captains.map(captain => (
                        <li key={captain.id}>{captain.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {team.stats && (
                  <div className="team-stats">
                    <h4>Stats</h4>
                    <p><strong>Record:</strong> {team.stats.wins}-{team.stats.losses}</p>
                    <p><strong>Points For:</strong> {team.stats.points_for}</p>
                    <p><strong>Points Against:</strong> {team.stats.points_against}</p>
                    {team.stats.spirit_score !== null && (
                      <p><strong>Spirit Score:</strong> {team.stats.spirit_score}</p>
                    )}
                  </div>
                )}
                
                <div className="team-players">
                  <h4>Players: {team.players.length}</h4>
                </div>
                
                <Link to={`/teams/${team.id}`} className="view-team">
                  View Team Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No teams available for the selected filter.</p>
      )}
      
      <div className="league-links">
        <h3>View Teams by League</h3>
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

export default TeamsPage;