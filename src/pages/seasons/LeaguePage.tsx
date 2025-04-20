import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleSeasons } from '../../data/sampleData';
import { Season, LeagueType } from '../../types';

const LeaguePage: React.FC = () => {
  const { season, year, leagueType } = useParams<{ season?: string; year?: string; leagueType?: string }>();
  
  // Find the correct season and league from our data
  const formattedSeason = season ? (season.charAt(0).toUpperCase() + season.slice(1)) as Season : null;
  const formattedYear = year ? parseInt(year) : null;
  
  const seasonData = formattedSeason && formattedYear ? 
    sampleSeasons.find(s => s.season === formattedSeason && s.year === formattedYear) : null;
  
  let leagueData = null;
  if (seasonData && leagueType) {
    // Convert leagueType param to match our enum
    const formattedLeagueType = leagueType === 'womens' ? LeagueType.WOMENS :
                               leagueType === 'coed' ? LeagueType.COED :
                               leagueType === 'recreational' ? LeagueType.REC : null;
    
    leagueData = formattedLeagueType ? 
      seasonData.leagues.find(l => l.type === formattedLeagueType) : null;
  }
  
  if (!seasonData || !leagueData) {
    return (
      <div className="not-found">
        <h2>League not found</h2>
        <p>The {leagueType} league for {season} {year} season could not be found.</p>
        <Link to="/">Return to home</Link>
      </div>
    );
  }
  
  return (
    <div className="league-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> &gt; 
        <Link to={`/seasons/${season}/${year}`}>{seasonData.season} {seasonData.year}</Link> &gt; 
        <span>{leagueData.name}</span>
      </div>
      
      <h1>{leagueData.name}</h1>
      
      {leagueData.description && (
        <section className="league-description">
          <p>{leagueData.description}</p>
        </section>
      )}
      
      <div className="league-details-grid">
        <section className="league-info">
          <h2>League Information</h2>
          
          <div className="info-grid">
            <div className="info-item">
              <h3>Type</h3>
              <p>{leagueData.type}</p>
            </div>
            
            <div className="info-item">
              <h3>Season</h3>
              <p>{seasonData.season} {seasonData.year}</p>
            </div>
            
            {leagueData.schedule && (
              <>
                <div className="info-item">
                  <h3>Start Date</h3>
                  <p>{new Date(leagueData.schedule.start_date).toLocaleDateString()}</p>
                </div>
                
                <div className="info-item">
                  <h3>End Date</h3>
                  <p>{new Date(leagueData.schedule.end_date).toLocaleDateString()}</p>
                </div>
                
                <div className="info-item">
                  <h3>Number of Weeks</h3>
                  <p>{leagueData.schedule.weeks}</p>
                </div>
              </>
            )}
            
            {leagueData.location && (
              <div className="info-item">
                <h3>Location</h3>
                <p>{leagueData.location.name}</p>
                {leagueData.location.address && <p>{leagueData.location.address}</p>}
                {leagueData.location.city && leagueData.location.state && (
                  <p>{leagueData.location.city}, {leagueData.location.state}</p>
                )}
              </div>
            )}
            
            {leagueData.emergency_number && (
              <div className="info-item">
                <h3>Emergency Number</h3>
                <p>{leagueData.emergency_number}</p>
              </div>
            )}
            
            {leagueData.coordinators.length > 0 && (
              <div className="info-item">
                <h3>Coordinators</h3>
                <ul>
                  {leagueData.coordinators.map(coordinator => (
                    <li key={coordinator.id}>{coordinator.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        
        <section className="league-rules">
          <h2>League Rules</h2>
          
          {leagueData.rules ? (
            <div className="rules-list">
              {leagueData.rules.gender_ratio && (
                <div className="rule-item">
                  <h3>Gender Ratio</h3>
                  <p>{leagueData.rules.gender_ratio}</p>
                </div>
              )}
              
              {leagueData.rules.game_length && (
                <div className="rule-item">
                  <h3>Game Length</h3>
                  <p>{leagueData.rules.game_length}</p>
                </div>
              )}
              
              {leagueData.rules.timeouts && (
                <div className="rule-item">
                  <h3>Timeouts</h3>
                  <p>{leagueData.rules.timeouts}</p>
                </div>
              )}
              
              {leagueData.rules.field_size && (
                <div className="rule-item">
                  <h3>Field Size</h3>
                  <p>{leagueData.rules.field_size}</p>
                </div>
              )}
              
              {leagueData.rules.substitution_rules && (
                <div className="rule-item">
                  <h3>Substitution Rules</h3>
                  <p>{leagueData.rules.substitution_rules}</p>
                </div>
              )}
              
              {leagueData.rules.other_rules && (
                <div className="rule-item">
                  <h3>Other Rules</h3>
                  <p>{leagueData.rules.other_rules}</p>
                </div>
              )}
            </div>
          ) : (
            <p>No specific rules have been set for this league yet.</p>
          )}
        </section>
      </div>
      
      <section className="league-schedule">
        <h2>Schedule</h2>
        
        {leagueData.schedule && leagueData.schedule.games.length > 0 ? (
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
                </tr>
              </thead>
              <tbody>
                {leagueData.schedule.games.map(game => (
                  <tr key={game.id}>
                    <td>{new Date(game.date).toLocaleDateString()}</td>
                    <td>{game.time}</td>
                    <td>{game.home_team.name}</td>
                    <td>{game.away_team.name}</td>
                    <td>{game.field.name}</td>
                    <td>
                      {game.home_score !== null && game.away_score !== null
                        ? `${game.home_score} - ${game.away_score}`
                        : 'TBD'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No schedule available yet.</p>
        )}
      </section>
      
      <section className="league-teams">
        <h2>Teams</h2>
        
        {leagueData.teams && leagueData.teams.length > 0 ? (
          <div className="teams-grid">
            {leagueData.teams.map(team => (
              <div key={team.id} className="team-card">
                <h3>{team.name}</h3>
                
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
                    <p><strong>Record:</strong> {team.stats.wins}-{team.stats.losses}</p>
                  </div>
                )}
                
                <Link to={`/teams/${team.id}`} className="view-team">
                  View Team Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No teams available yet.</p>
        )}
      </section>
      
      <section className="registration-info">
        <h2>Registration Information</h2>
        
        {leagueData.registration_info ? (
          <div className="registration-details">
            <p><strong>Status:</strong> {leagueData.registration_info.is_open ? 'Open' : 'Closed'}</p>
            
            {leagueData.registration_info.deadline && (
              <p><strong>Deadline:</strong> {new Date(leagueData.registration_info.deadline).toLocaleDateString()}</p>
            )}
            
            {leagueData.registration_info.player_fee && (
              <p><strong>Player Fee:</strong> ${leagueData.registration_info.player_fee}</p>
            )}
            
            {leagueData.registration_info.max_players && (
              <p><strong>Maximum Players:</strong> {leagueData.registration_info.max_players}</p>
            )}
          </div>
        ) : (
          <p>No registration information available yet.</p>
        )}
      </section>
    </div>
  );
};

export default LeaguePage;