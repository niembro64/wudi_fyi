import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatGameDate, formatGameTime } from '../utils/gameUtils';

interface GameInfoProps {
  date: string;
  time: string;
  fieldName: string;
  fieldLocationLink?: string | null;
}

/**
 * Game information component that displays date, time, and location
 * with a back navigation button
 */
const GameInfo: React.FC<GameInfoProps> = ({
  date,
  time,
  fieldName,
  fieldLocationLink,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      {/* Back button - always visible */}
      <div className="mb-3">
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:text-primary-dark transition-colors"
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Schedule
          </div>
        </button>
      </div>

      {/* Game info - stacked on mobile, horizontal on larger screens */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-primary flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium text-gray-700 text-sm sm:text-base">
            {formatGameDate(date)} • {formatGameTime(time)}
          </span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-primary flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <a
            href={fieldLocationLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:text-primary-dark transition-colors text-sm sm:text-base"
          >
            {fieldName}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
