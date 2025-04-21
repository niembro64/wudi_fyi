import React from 'react';
import { Link } from 'react-router-dom';
import { wudiInfo, wudiMapCoordinates } from '../data/sampleData';

const HomePage: React.FC = () => {
  const currentSeason = wudiInfo.current_season;
  const announcements = wudiInfo.announcements || [];

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
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl overflow-hidden shadow-custom mb-12">
        <div className="relative z-10 py-16 px-6 md:px-12 text-center animate-pulse-slow">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md animate-float">
            WUDI FYI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-light">
            Westchester Ultimate Disc, Inc.
          </p>

          {currentSeason && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {currentSeason.leagues.map((league) => {
                const leagueType =
                  league.type === 'Co-ed'
                    ? 'coed'
                    : league.type === "Women's"
                    ? 'womens'
                    : league.type === 'Recreational'
                    ? 'recreational'
                    : '';

                return (
                  <Link
                    key={league.id}
                    to={`/leagues/${leagueType}`}
                    className="inline-block px-6 py-3 bg-white text-primary font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    View {league.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-blue-500 opacity-20 mix-blend-multiply"></div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">
          Field Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold text-primary-dark mb-4">
              Location Details
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-primary mt-0.5 mr-3"
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
                  href={wudiMapCoordinates.field1.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-dark hover:underline transition-colors"
                >
                  SUNY Purchase, 735 Anderson Hill Rd, Purchase, NY 10577
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-primary mt-0.5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span>
                  Parking available at{' '}
                  <a
                    href={wudiMapCoordinates.parkingFields.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark hover:underline transition-colors"
                  >
                    Fields Parking
                  </a>
                  ,{' '}
                  <a
                    href={wudiMapCoordinates.parkingPAC.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark hover:underline transition-colors"
                  >
                    Performing Arts Center (PAC)
                  </a>{' '}
                  and{' '}
                  <a
                    href={wudiMapCoordinates.parkingGreatLawn.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark hover:underline transition-colors"
                  >
                    Great Lawn
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-primary-dark mb-4">
              Google Maps
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {/* Field locations */}
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(wudiMapCoordinates)
                    .filter((location) => location.type === 'field')
                    .map((location) => (
                      <a
                        key={location.coordinates}
                        href={location.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white py-2 px-3 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:bg-green-600 hover:shadow-md font-medium text-sm"
                      >
                        {location.name}
                      </a>
                    ))}
                </div>

                {/* Parking locations */}
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(wudiMapCoordinates)
                    .filter((location) => location.type === 'parking')
                    .map((location) => (
                      <a
                        key={location.coordinates}
                        href={location.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white py-2 px-3 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:bg-blue-600 hover:shadow-md font-medium text-sm"
                      >
                        {location.name}
                      </a>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
              <p className="text-center mb-2">
                Tap any button above to open the exact location in Google Maps
              </p>
              <div className="flex justify-center items-center gap-4 mt-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span>Fields</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span>Parking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card overflow-hidden p-0">
          <img
            src="/fields_map.png"
            alt="Fields Map"
            className="w-full max-w-full h-auto"
          />
        </div>
      </section>

      <section className="mb-12 bg-red-50 rounded-xl shadow-custom overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-700 py-3 px-6">
          <h2 className="text-white text-xl font-bold">
            Emergency Information
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center w-full md:w-auto">
              <a
                href={`tel:${wudiInfo.emergency_number || '9142516900'}`}
                className="text-xl font-bold text-red-600 flex items-center"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                {wudiInfo.emergency_number || '914.251.6900'}
              </a>
            </div>
            <div className="flex-1">
              <p className="mb-2">
                This number should be used for emergencies at our playing
                fields. It will connect you to security services at SUNY
                Purchase for a faster response than 911.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get day of week from date string
const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export default HomePage;
