import { Game } from '../types';
import { wudiInfo } from '../data/sampleData';

/**
 * Find a game by ID across all leagues
 * @param gameId The game ID to search for
 * @returns The game object if found, undefined otherwise
 */
export const findGameById = (gameId: string): Game | undefined => {
  // Iterate through all leagues in the current season
  for (const league of wudiInfo.current_season?.leagues || []) {
    // Check if the league has a schedule with games
    if (league.schedule && league.schedule.games) {
      // Look for the game with the matching ID
      const game = league.schedule.games.find(g => g.id === gameId);
      if (game) {
        return game;
      }
    }
  }
  return undefined;
};

/**
 * Generate a localStorage key for game attendance
 * @param gameId The game ID
 * @param teamId The team ID
 * @returns A localStorage key string
 */
export const getAttendanceKey = (gameId: string, teamId: string): string => {
  return `game-${gameId}-${teamId}-attendance`;
};

/**
 * Generate a localStorage key for game stats
 * @param gameId The game ID
 * @param teamId The team ID
 * @returns A localStorage key string
 */
export const getStatsKey = (gameId: string, teamId: string): string => {
  return `game-${gameId}-${teamId}-stats`;
};

/**
 * Calculate team score based on player stats
 * @param gameId The game ID
 * @param teamId The team ID
 * @returns The calculated score
 */
export const calculateTeamScore = (gameStats: Record<string, { assists: number, goals: number }>): number => {
  return Object.values(gameStats).reduce((score, playerStats) => {
    return score + (playerStats.goals || 0);
  }, 0);
};

/**
 * Format a date for display in the game header
 * @param dateString The ISO date string
 * @returns A formatted date string
 */
export const formatGameDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format a time for display in the game header
 * @param timeString The time string in 24-hour format (e.g., "18:00")
 * @returns A formatted time string
 */
export const formatGameTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};


/**
 * Get default stats for a player
 * @param teamId The team ID
 * @param playerId The player ID
 * @returns Default stats object
 */
export const getDefaultStats = (): { assists: number, goals: number } => {
  return { assists: 0, goals: 0 };
};