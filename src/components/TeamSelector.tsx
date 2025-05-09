import React from 'react';

/**
 * Component displayed when no team is selected
 * Prompts user to select a team to begin
 */
const TeamSelector: React.FC = () => {
  return (
    <div className="text-center py-12 mb-4">
      <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <p className="text-gray-600 font-medium mb-2">Select a team above to start</p>
      <p className="text-gray-500 text-sm">Tap on either team name to manage attendance and stats</p>
    </div>
  );
};

export default TeamSelector;