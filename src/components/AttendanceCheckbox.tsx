import React from 'react';

interface AttendanceCheckboxProps {
  isPresent: boolean;
  onToggle: () => void;
  playerName: string; // For accessibility
}

/**
 * A custom attendance checkbox component
 * Displays a checkmark when player is present
 */
const AttendanceCheckbox: React.FC<AttendanceCheckboxProps> = ({ isPresent, onToggle, playerName }) => {
  return (
    <button
      onClick={onToggle}
      className={`w-8 h-8 flex items-center justify-center rounded-full shadow-sm ${
        isPresent
          ? 'bg-primary border-primary text-white'
          : 'bg-white border border-gray-300'
      }`}
      aria-label={isPresent ? `Mark ${playerName} as absent` : `Mark ${playerName} as present`}
      aria-checked={isPresent}
      role="checkbox"
    >
      {isPresent && (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
};

export default AttendanceCheckbox;