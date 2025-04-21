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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-dark mb-6">No active season found</h2>
        <Link to="/" className="btn">Return to home</Link>
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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-dark mb-4">League not found</h2>
        <p className="mb-6">The {leagueType} league could not be found.</p>
        <Link to="/" className="btn">Return to home</Link>
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
    <div>
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">{leagueData.name}</h1>
        
        {leagueData.description && (
          <div className="mb-8 text-lg text-gray-700 leading-relaxed">
            <p>{leagueData.description}</p>
          </div>
        )}
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">League Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leagueData.location && (
            <div className="card hover:shadow-custom-lg bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-bold text-primary-dark">Location</h3>
              </div>
              <p className="ml-9">{leagueData.location.name}</p>
            </div>
          )}
          
          {leagueData.emergency_number && (
            <div className="card hover:shadow-custom-lg bg-gradient-to-br from-white to-red-50">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="text-lg font-bold text-red-600">Emergency</h3>
              </div>
              <a href={`tel:${leagueData.emergency_number}`} className="ml-9 text-red-600 font-bold hover:underline">
                {leagueData.emergency_number}
              </a>
            </div>
          )}
          
          {leagueData.rules && leagueData.rules.gender_ratio && (
            <div className="card hover:shadow-custom-lg bg-gradient-to-br from-white to-blue-50">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-lg font-bold text-primary-dark">Gender Ratio</h3>
              </div>
              <p className="ml-9">{leagueData.rules.gender_ratio}</p>
            </div>
          )}
          
          {leagueData.rules && leagueData.rules.game_length && (
            <div className="card hover:shadow-custom-lg bg-gradient-to-br from-white to-green-50">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-primary-dark">Game Length</h3>
              </div>
              <p className="ml-9">{leagueData.rules.game_length}</p>
            </div>
          )}
        </div>
      </section>
      
      {leagueType === 'coed' && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">Gender Ratios</h2>
          <div className="card overflow-hidden">
            <img src="/gender_ratios.png" alt="Gender Ratios" className="w-full max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300" />
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">Fields Map</h2>
        <div className="card overflow-hidden p-0">
          <img src="/fields_map.png" alt="Fields Map" className="w-full max-w-full h-auto" />
          <div className="p-6 bg-gray-50">
            <a 
              href="https://maps.google.com/?q=41.04561378382737,-73.6978115030064" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300 hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open SUNY Purchase Fields in Google Maps
            </a>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">Schedule</h2>
        
        {Object.keys(gamesByDate).length > 0 ? (
          <div className="space-y-8">
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
              
              let dayBgClass = 'bg-white';
              let dayBorderClass = 'border-gray-200';
              
              if (gameDate.getTime() < today.getTime()) {
                dayBgClass = 'bg-gray-100';
                dayBorderClass = 'border-gray-300';
              } else if (gameDate.getTime() === today.getTime()) {
                dayBgClass = 'bg-primary-light';
                dayBorderClass = 'border-primary';
              }
              
              return (
                <div key={date} className={`card ${dayBgClass} border-l-4 ${dayBorderClass} overflow-hidden`}>
                  <h3 className="text-xl font-bold text-gray-dark mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(date)}
                  </h3>
                  
                  <div className="space-y-6">
                    {Object.keys(gamesByTime).sort().map(time => (
                      <div key={`${date}-${time}`}>
                        <h4 className="text-lg font-semibold text-primary-dark mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatTime(time)}
                        </h4>
                        
                        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                          <table className="min-w-full">
                            <thead className="bg-gray-50 border-b">
                              <tr>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">White</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dark</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {gamesByTime[time].map(game => (
                                <tr key={game.id} className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{getShortTeamName(game.home_team.name)}</td>
                                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{getShortTeamName(game.away_team.name)}</td>
                                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{getShortFieldName(game.field.name)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-lg text-gray-600">No schedule available yet.</p>
          </div>
        )}
        
        <div className="mt-8 card">
          <h3 className="text-lg font-bold text-gray-dark mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-100 border-l-4 border-gray-300 rounded mr-3"></div>
              <span className="text-sm text-gray-600">Past Day</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary-light border-l-4 border-primary rounded mr-3"></div>
              <span className="text-sm text-gray-600">Today</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white border-l-4 border-gray-200 rounded mr-3"></div>
              <span className="text-sm text-gray-600">Future Day</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric'
  });
};

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