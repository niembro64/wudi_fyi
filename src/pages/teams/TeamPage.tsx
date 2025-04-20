import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleTeams, sampleGames } from '../../data/sampleData';
import { Game } from '../../types';

const TeamPage: React.FC = () => {
  const { teamId } = useParams<{ teamId?: string }>();
  
  // Find the team data
  const team = sampleTeams.find(t => t.id === teamId);
  
  if (!team) {
    return (
      <div className="not-found">
        <h2>Team not found</h2>
        <p>The requested team could not be found.</p>
        <Link to="/teams">Back to Teams</Link>
      </div>
    );
  }
  
  // Find games for this team
  const teamGames = sampleGames.filter(
    game => game.home_team.id === team.id || game.away_team.id === team.id
  );
  
  // Sort games by date
  const sortedGames = [...teamGames].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    
    // If dates are the same, sort by time
    return a.time.localeCompare(b.time);
  });
  
  // Split games into past and upcoming
  const today = new Date();
  const pastGames = sortedGames.filter(game => {
    const gameDate = new Date(game.date);
    return gameDate < today || game.home_score !== null;
  });
  
  const upcomingGames = sortedGames.filter(game => {
    const gameDate = new Date(game.date);
    return gameDate >= today && game.home_score === null;
  });
  
  return (
    <div className="team-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> &gt; 
        <Link to="/teams">Teams</Link> &gt; 
        <span>{team.name}</span>
      </div>
      
      <div className="team-header" style={{ backgroundColor: team.color || '#333' }}>
        <h1>{team.name}</h1>
        {team.logo && <img src={team.logo} alt={`${team.name} logo`} />}
      </div>
      
      <div className="team-details-grid">
        <section className="team-info">
          <h2>Team Information</h2>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>Team Color</h3>
              <div 
                className="color-box" 
                style={{ backgroundColor: team.color || '#333' }}
              ></div>
              <p>{team.color || 'Not specified'}</p>
            </div>
            
            {team.stats && (
              <>
                <div className="info-item">
                  <h3>Record</h3>
                  <p>{team.stats.wins}-{team.stats.losses}</p>
                </div>
                
                <div className="info-item">
                  <h3>Points For</h3>
                  <p>{team.stats.points_for}</p>
                </div>
                
                <div className="info-item">
                  <h3>Points Against</h3>
                  <p>{team.stats.points_against}</p>
                </div>
                
                {team.stats.spirit_score !== null && (
                  <div className="info-item">
                    <h3>Spirit Score</h3>
                    <p>{team.stats.spirit_score}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        
        <section className="captains-section">
          <h2>Captains</h2>
          
          {team.captains.length > 0 ? (
            <div className="captains-list">
              {team.captains.map(captain => (
                <div key={captain.id} className="captain-card">
                  <h3>{captain.name}</h3>
                  {captain.email && <p><strong>Email:</strong> {captain.email}</p>}
                  {captain.phone && <p><strong>Phone:</strong> {captain.phone}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p>No captains assigned yet.</p>
          )}
        </section>
      </div>
      
      <section className="team-players">
        <h2>Players</h2>
        
        {team.players.length > 0 ? (
          <div className="players-list">
            <table className="players-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {team.players.map(player => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.email || '-'}</td>
                    <td>{player.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No players assigned to this team yet.</p>
        )}
      </section>
      
      <section className="team-schedule">
        <h2>Team Schedule</h2>
        
        {sortedGames.length > 0 ? (
          <>
            {upcomingGames.length > 0 && (
              <div className="schedule-section">
                <h3>Upcoming Games</h3>
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Opponent</th>
                      <th>Home/Away</th>
                      <th>Field</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingGames.map(game => {
                      const isHomeTeam = game.home_team.id === team.id;
                      const opponent = isHomeTeam ? game.away_team : game.home_team;
                      
                      return (
                        <tr key={game.id}>
                          <td>{formatDate(game.date)}</td>
                          <td>{formatTime(game.time)}</td>
                          <td>{opponent.name}</td>
                          <td>{isHomeTeam ? 'Home' : 'Away'}</td>
                          <td>{game.field.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            
            {pastGames.length > 0 && (
              <div className="schedule-section">
                <h3>Past Games</h3>
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Opponent</th>
                      <th>Home/Away</th>
                      <th>Field</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastGames.map(game => {
                      const isHomeTeam = game.home_team.id === team.id;
                      const opponent = isHomeTeam ? game.away_team : game.home_team;
                      
                      let result = 'TBD';
                      if (game.home_score !== null && game.away_score !== null) {
                        const teamScore = isHomeTeam ? game.home_score : game.away_score;
                        const opponentScore = isHomeTeam ? game.away_score : game.home_score;
                        result = teamScore > opponentScore 
                          ? `W ${teamScore}-${opponentScore}` 
                          : teamScore < opponentScore 
                            ? `L ${teamScore}-${opponentScore}`
                            : `T ${teamScore}-${opponentScore}`;
                      }
                      
                      return (
                        <tr key={game.id}>
                          <td>{formatDate(game.date)}</td>
                          <td>{formatTime(game.time)}</td>
                          <td>{opponent.name}</td>
                          <td>{isHomeTeam ? 'Home' : 'Away'}</td>
                          <td>{game.field.name}</td>
                          <td>{result}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <p>No games scheduled for this team yet.</p>
        )}
      </section>
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

export default TeamPage;