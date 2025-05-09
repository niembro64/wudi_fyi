import React from 'react';

interface StatCounterProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  statName: string; // For accessibility
}

/**
 * A slightly wider counter (w-20) with two transparent,
 * half-width hit zones (w-10) overlapping a centered number,
 * outer-only borders, and simple press feedback.
 */
const StatCounter: React.FC<StatCounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  statName,
}) => {
  // Map 0–9 to tailwind bg classes:
  const bgClasses = [
    'bg-white',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-blue-900',
  ];

  // clamp value into [0,9]
  const idx = Math.min(Math.max(value, 0), 9);
  const backgroundClass = bgClasses[idx];

  // switch to white text/icons when value ≥ 5
  const textColorClass = value >= 5 ? 'text-white' : 'text-gray-800';

  return (
    <div className={`relative w-20 h-10 mx-2 ${backgroundClass}`}>
      {/* Centered number behind the buttons */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className={`${textColorClass} text-lg font-medium`}>{value}</span>
      </div>

      {/* Left half: minus button */}
      <button
        onClick={onDecrement}
        aria-label={`Decrease ${statName}`}
        className={`
          absolute top-0 left-0
          w-10 h-full
          bg-transparent flex items-center justify-center z-20
          
          /* outer border only */
          border-t border-l border-b border-gray-300 border-r-0

          /* dynamic icon/text color */
          ${textColorClass}

          /* press feedback: border & text */
          transition-colors duration-100
          active:border-blue-500 active:text-blue-500

          focus:outline-none
        `}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      {/* Right half: plus button */}
      <button
        onClick={onIncrement}
        aria-label={`Increase ${statName}`}
        className={`
          absolute top-0 right-0
          w-10 h-full
          bg-transparent flex items-center justify-center z-20

          /* outer border only */
          border-t border-r border-b border-gray-300 border-l-0

          /* dynamic icon/text color */
          ${textColorClass}

          /* press feedback: border & text */
          transition-colors duration-100
          active:border-blue-500 active:text-blue-500

          focus:outline-none
        `}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default StatCounter;
