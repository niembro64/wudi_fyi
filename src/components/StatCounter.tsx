import React from 'react';

interface StatCounterProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  statName: string; // For accessibility
}

/**
 * A counter with two transparent, half‑width hit zones overlapping
 * a centered number so you tap the left or right side of the value.
 */
const StatCounter: React.FC<StatCounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  statName,
}) => {
  return (
    <div className="relative w-16 h-10">
      {/* The large number, behind the buttons */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-lg font-medium">{value}</span>
      </div>

      {/* Left half: transparent hit‑area with minus icon */}
      <button
        onClick={onDecrement}
        aria-label={`Decrease ${statName}`}
        className="
          absolute top-0 left-0
          w-8 h-full
          bg-transparent
          flex items-center justify-center
          z-20
        "
      >
        <svg
          className="w-4 h-4 text-gray-600"
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

      {/* Right half: transparent hit‑area with plus icon */}
      <button
        onClick={onIncrement}
        aria-label={`Increase ${statName}`}
        className="
          absolute top-0 right-0
          w-8 h-full
          bg-transparent
          flex items-center justify-center
          z-20
        "
      >
        <svg
          className="w-4 h-4 text-gray-600"
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
