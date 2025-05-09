import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  findGameById,
  formatGameDate,
  formatGameTime,
  getAttendanceKey,
  getStatsKey,
  calculateTeamScore,
  getDefaultStats
} from '../utils/gameUtils';
import { Game, Team } from '../types';

// Tab Options
type TabType = 'attendance' | 'stats';

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('attendance');
  
  // Stats and attendance storage
  const [attendanceData, setAttendanceData] = useLocalStorage<Record<string, boolean>>(
    getAttendanceKey(gameId || '', selectedTeam?.id || ''),
    {}
  );
  
  const [statsData, setStatsData] = useLocalStorage<Record<string, { assists: number, goals: number }>>(
    getStatsKey(gameId || '', selectedTeam?.id || ''),
    {}
  );

  // Load game data on component mount
  useEffect(() => {
    if (gameId) {
      const foundGame = findGameById(gameId);
      setGame(foundGame);
    }
  }, [gameId]);

  // Reset active tab when team changes
  useEffect(() => {
    if (selectedTeam) {
      setActiveTab('attendance');
    }
  }, [selectedTeam]);

  // Handle team selection
  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  // Handle attendance toggle
  const toggleAttendance = (playerId: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [playerId]: !prev[playerId]
    }));
  };

  // Increment/decrement stats
  const updateStat = (playerId: string, statType: 'assists' | 'goals', increment: boolean) => {
    setStatsData(prev => {
      const playerStats = prev[playerId] || getDefaultStats();
      const currentValue = playerStats[statType] || 0;
      const newValue = increment 
        ? currentValue + 1 
        : Math.max(0, currentValue - 1); // Ensure it doesn't go below 0
      
      return {
        ...prev,
        [playerId]: {
          ...playerStats,
          [statType]: newValue
        }
      };
    });
  };

  // Calculate scores based on goals
  const homeTeamScore = game
    ? calculateTeamScore(statsData)
    : 0;

  const awayTeamScore = game
    ? calculateTeamScore(
        JSON.parse(localStorage.getItem(getStatsKey(gameId || '', game.away_team.id)) || '{}')
      )
    : 0;

  if (!game) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-dark mb-4">
          Game not found
        </h2>
        <p className="mb-6">The game you're looking for could not be found.</p>
        <Link to="/" className="btn">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-100 text-gray-600 text-sm py-3 px-4 mb-6 rounded-lg">
        <p className="text-center">
          This is not the official WUDI website. This is a supplemental
          information site that may be useful to you. For official information,
          please visit{' '}
          <a
            href="https://wudi.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            wudi.org
          </a>
          .
        </p>
      </div>

      {/* Game Header */}
      <div className="mb-6">
        <div className="mb-4">
          {/* Back button - always visible */}
          <div className="mb-3">
            <button
              onClick={() => navigate(-1)}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Schedule
              </div>
            </button>
          </div>

          {/* Game info - stacked on mobile, horizontal on larger screens */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-700 text-sm sm:text-base">
                {formatGameDate(game.date)} • {formatGameTime(game.time)}
              </span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <a
                href={game.field.location?.google_maps_link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-dark transition-colors text-sm sm:text-base"
              >
                {game.field.name}
              </a>
            </div>
          </div>
        </div>

        {/* Teams and Scoreboard */}
        <div className="card bg-white shadow-custom mb-6">
          <div className="flex flex-col sm:flex-row">
            {/* Mobile Layout - Score at top on small screens */}
            <div className="flex items-center justify-center py-3 bg-gray-50 sm:hidden">
              <div className="text-center">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-primary-dark">
                    {homeTeamScore}
                  </span>
                  <span className="text-lg font-medium text-gray-400">-</span>
                  <span className="text-3xl font-bold text-primary-dark">
                    {awayTeamScore}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Final Score</div>
              </div>
            </div>

            <div className="flex justify-between items-center w-full">
              {/* Home Team Button */}
              <button
                onClick={() => handleTeamSelect(game.home_team)}
                className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-center sm:text-left text-base sm:text-lg font-bold rounded-l-lg transition-all ${
                  selectedTeam?.id === game.home_team.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {game.home_team.name}
              </button>

              {/* Score - Hide on mobile, show on larger screens */}
              <div className="hidden sm:flex items-center justify-center px-4 sm:px-8 py-4 bg-gray-50">
                <div className="text-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-primary-dark">
                      {homeTeamScore}
                    </span>
                    <span className="text-lg font-medium text-gray-400">-</span>
                    <span className="text-3xl font-bold text-primary-dark">
                      {awayTeamScore}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Final Score</div>
                </div>
              </div>

              {/* Away Team Button */}
              <button
                onClick={() => handleTeamSelect(game.away_team)}
                className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-center sm:text-right text-base sm:text-lg font-bold rounded-r-lg transition-all ${
                  selectedTeam?.id === game.away_team.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {game.away_team.name}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        {selectedTeam ? (
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-4">
              <button
                className={`py-3 px-6 font-medium transition-colors ${
                  activeTab === 'attendance'
                    ? 'border-b-2 border-primary text-primary-dark'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('attendance')}
              >
                Attendance
              </button>
              <button
                className={`py-3 px-6 font-medium transition-colors ${
                  activeTab === 'stats'
                    ? 'border-b-2 border-primary text-primary-dark'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('stats')}
              >
                Stats
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-gray-600 font-medium mb-2">Select a team above to start</p>
            <p className="text-gray-500 text-sm">Tap on either team name to manage attendance and stats</p>
          </div>
        )}

        {/* Tab Content */}
        {selectedTeam && (
          <div className="card bg-white">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedTeam.name} - {activeTab === 'attendance' ? 'Attendance' : 'Stats'}
            </h2>

            {activeTab === 'attendance' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/4">
                        Player
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Present
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedTeam.players.map((player) => {
                      const isPresent = attendanceData[player.id] || false;
                      return (
                        <tr key={player.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2">
                            <div className="text-sm font-medium text-gray-900 break-words">
                              {player.name}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right">
                            <div className="flex justify-end">
                              <button
                                onClick={() => toggleAttendance(player.id)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full shadow-sm ${
                                  isPresent
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-white border border-gray-300'
                                }`}
                                aria-label={isPresent ? "Mark as absent" : "Mark as present"}
                              >
                                {isPresent && (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        Player
                      </th>
                      <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        Assists
                      </th>
                      <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        Goals
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedTeam.players.map((player) => {
                      const playerStats = statsData[player.id] || getDefaultStats();
                      return (
                        <tr key={player.id} className="hover:bg-gray-50">
                          <td className="px-2 py-2">
                            <div className="text-sm font-medium text-gray-900 break-words">
                              {player.name}
                            </div>
                          </td>
                          <td className="px-2 py-2 relative">
                            <div className="flex items-center justify-center">
                              <div className="relative w-16 h-10">
                                {/* Value display */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                  <span className="text-lg font-medium">
                                    {playerStats.assists || 0}
                                  </span>
                                </div>

                                {/* Minus button (left) */}
                                <button
                                  onClick={() => updateStat(player.id, 'assists', false)}
                                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center shadow-sm z-20"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>

                                {/* Plus button (right) */}
                                <button
                                  onClick={() => updateStat(player.id, 'assists', true)}
                                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center shadow-sm z-20"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 relative">
                            <div className="flex items-center justify-center">
                              <div className="relative w-16 h-10">
                                {/* Value display */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                  <span className="text-lg font-medium">
                                    {playerStats.goals || 0}
                                  </span>
                                </div>

                                {/* Minus button (left) */}
                                <button
                                  onClick={() => updateStat(player.id, 'goals', false)}
                                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center shadow-sm z-20"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>

                                {/* Plus button (right) */}
                                <button
                                  onClick={() => updateStat(player.id, 'goals', true)}
                                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center shadow-sm z-20"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;