import React from 'react';
import { Team } from '../types';

interface TeamScoreHeaderProps {
  homeTeam: Team;
  awayTeam: Team;
  homeTeamScore: number;
  awayTeamScore: number;
  selectedTeam: Team | null;
  onTeamSelect: (team: Team) => void;
}

/**
 * A component for displaying team names and scores
 * with team selection functionality
 */
const TeamScoreHeader: React.FC<TeamScoreHeaderProps> = ({
  homeTeam,
  awayTeam,
  homeTeamScore,
  awayTeamScore,
  selectedTeam,
  onTeamSelect
}) => {
  return (
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
          onClick={() => onTeamSelect(homeTeam)}
          className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-center sm:text-left text-base sm:text-lg font-bold rounded-l-lg transition-all ${
            selectedTeam?.id === homeTeam.id
              ? 'bg-primary text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {homeTeam.name}
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
          onClick={() => onTeamSelect(awayTeam)}
          className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-center sm:text-right text-base sm:text-lg font-bold rounded-r-lg transition-all ${
            selectedTeam?.id === awayTeam.id
              ? 'bg-primary text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {awayTeam.name}
        </button>
      </div>
    </div>
  );
};

export default TeamScoreHeader;