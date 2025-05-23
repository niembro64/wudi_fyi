import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  findGameById,
  getAttendanceKey,
  getStatsKey,
  calculateTeamScore,
  getDefaultStats,
} from '../utils/gameUtils';
import { Game, Team } from '../types';

// Components
import GameInfo from '../components/GameInfo';
import TeamScoreHeader from '../components/TeamScoreHeader';
import TabSelector, { TabOption } from '../components/TabSelector';
import TeamSelector from '../components/TeamSelector';
import StatCounter from '../components/StatCounter';
import AttendanceCheckbox from '../components/AttendanceCheckbox';

// Tab Types
type TabType = 'attendance' | 'stats';

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('attendance');

  // State for storing the game's teams
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);

  // Use these keys for localStorage (they won't change during component lifecycle)
  const homeAttendanceKey = homeTeam ? getAttendanceKey(gameId || '', homeTeam.id) : '';
  const awayAttendanceKey = awayTeam ? getAttendanceKey(gameId || '', awayTeam.id) : '';
  const homeStatsKey = homeTeam ? getStatsKey(gameId || '', homeTeam.id) : '';
  const awayStatsKey = awayTeam ? getStatsKey(gameId || '', awayTeam.id) : '';

  // Create separate hooks for home and away team data
  const [homeTeamAttendance, setHomeTeamAttendance] = useLocalStorage<
    Record<string, boolean>
  >(homeAttendanceKey, {});

  const [awayTeamAttendance, setAwayTeamAttendance] = useLocalStorage<
    Record<string, boolean>
  >(awayAttendanceKey, {});

  const [homeTeamStats, setHomeTeamStats] = useLocalStorage<
    Record<string, { assists: number; goals: number }>
  >(homeStatsKey, {});

  const [awayTeamStats, setAwayTeamStats] = useLocalStorage<
    Record<string, { assists: number; goals: number }>
  >(awayStatsKey, {});

  // Load game data on component mount
  useEffect(() => {
    if (gameId) {
      const foundGame = findGameById(gameId);
      setGame(foundGame);

      // Set team references when game is found
      if (foundGame) {
        setHomeTeam(foundGame.home_team);
        setAwayTeam(foundGame.away_team);

        // Initialize localStorage for both teams if needed
        const homeAttKey = getAttendanceKey(gameId, foundGame.home_team.id);
        const awayAttKey = getAttendanceKey(gameId, foundGame.away_team.id);
        const homeStatsKey = getStatsKey(gameId, foundGame.home_team.id);
        const awayStatsKey = getStatsKey(gameId, foundGame.away_team.id);

        // Check if keys exist in localStorage and initialize if they don't
        if (!localStorage.getItem(homeAttKey)) {
          localStorage.setItem(homeAttKey, JSON.stringify({}));
        }

        if (!localStorage.getItem(awayAttKey)) {
          localStorage.setItem(awayAttKey, JSON.stringify({}));
        }

        if (!localStorage.getItem(homeStatsKey)) {
          localStorage.setItem(homeStatsKey, JSON.stringify({}));
        }

        if (!localStorage.getItem(awayStatsKey)) {
          localStorage.setItem(awayStatsKey, JSON.stringify({}));
        }
      }
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
    if (selectedTeam?.id === game?.home_team.id) {
      setHomeTeamAttendance((prev) => ({
        ...prev,
        [playerId]: !prev[playerId],
      }));
    } else if (selectedTeam?.id === game?.away_team.id) {
      setAwayTeamAttendance((prev) => ({
        ...prev,
        [playerId]: !prev[playerId],
      }));
    }
  };

  // Update stats (increment/decrement)
  const updateStat = (
    playerId: string,
    statType: 'assists' | 'goals',
    increment: boolean
  ) => {
    // Get the right setter based on selected team
    const setStats = selectedTeam?.id === game?.home_team.id
      ? setHomeTeamStats
      : setAwayTeamStats;

    setStats((prev) => {
      const playerStats = prev[playerId] || getDefaultStats();
      const currentValue = playerStats[statType] || 0;
      const newValue = increment
        ? currentValue + 1
        : Math.max(0, currentValue - 1); // Ensure it doesn't go below 0

      return {
        ...prev,
        [playerId]: {
          ...playerStats,
          [statType]: newValue,
        },
      };
    });
  };

  // Calculate scores based on goals
  const homeTeamScore = game
    ? calculateTeamScore(homeTeamStats)
    : 0;

  const awayTeamScore = game
    ? calculateTeamScore(awayTeamStats)
    : 0;

  // Define tabs for the tab selector
  const tabs: TabOption[] = [
    { id: 'attendance', label: 'Attendance' },
    { id: 'stats', label: 'Stats' },
  ];

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
      <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* Game Info Component */}
        <GameInfo
          date={game.date}
          time={game.time}
          fieldName={game.field.name}
          fieldLocationLink={game.field.location?.google_maps_link}
        />

        {/* Teams and Scoreboard */}
        <div className="bg-white shadow-md mb-6">
          <TeamScoreHeader
            homeTeam={game.home_team}
            awayTeam={game.away_team}
            homeTeamScore={homeTeamScore}
            awayTeamScore={awayTeamScore}
            selectedTeam={selectedTeam}
            onTeamSelect={handleTeamSelect}
          />
        </div>

        {/* Tab Navigation */}
        {selectedTeam ? (
          <TabSelector
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as TabType)}
          />
        ) : (
          <TeamSelector />
        )}

        {/* Tab Content */}
        {selectedTeam && (
          <div className="w-full">

            {activeTab === 'attendance' && (
              <div className="overflow-x-auto -mx-4 w-screen px-2 sm:px-4">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/5">
                        Player
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                        Present
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedTeam.players.map((player) => {
                      const isPresent =
                        selectedTeam?.id === game?.home_team.id
                          ? homeTeamAttendance[player.id] || false
                          : awayTeamAttendance[player.id] || false;
                      return (
                        <tr key={player.id} className="hover:bg-gray-50 border-b border-gray-100">
                          <td className="px-3 py-2 pr-3">
                            <div className="text-sm font-medium text-gray-900 break-words">
                              {player.name}
                            </div>
                          </td>
                          <td className="px-0 py-2 text-center">
                            <div className="flex justify-center">
                              <AttendanceCheckbox
                                isPresent={isPresent}
                                onToggle={() => toggleAttendance(player.id)}
                                playerName={player.name}
                              />
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
              <div className="overflow-x-auto -mx-4 w-screen px-2 sm:px-4">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/5">
                        Player
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                        Assists
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                        Goals
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedTeam.players.map((player) => {
                      const playerStats =
                        selectedTeam?.id === game?.home_team.id
                          ? homeTeamStats[player.id] || getDefaultStats()
                          : awayTeamStats[player.id] || getDefaultStats();
                      return (
                        <tr key={player.id} className="hover:bg-gray-50 border-b border-gray-100">
                          <td className="px-3 py-2 pr-3">
                            <div className="text-sm font-medium text-gray-900 break-words">
                              {player.name}
                            </div>
                          </td>
                          <td className="px-0 py-2 relative">
                            <div className="flex items-center justify-center">
                              <StatCounter
                                value={playerStats.assists || 0}
                                onDecrement={() =>
                                  updateStat(player.id, 'assists', false)
                                }
                                onIncrement={() =>
                                  updateStat(player.id, 'assists', true)
                                }
                                statName="assists"
                              />
                            </div>
                          </td>
                          <td className="px-0 py-2 relative">
                            <div className="flex items-center justify-center">
                              <StatCounter
                                value={playerStats.goals || 0}
                                onDecrement={() =>
                                  updateStat(player.id, 'goals', false)
                                }
                                onIncrement={() =>
                                  updateStat(player.id, 'goals', true)
                                }
                                statName="goals"
                              />
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
