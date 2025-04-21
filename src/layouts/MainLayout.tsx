import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { wudiInfo, wudiMapCoordinates } from '../data/sampleData';

const MainLayout: React.FC = () => {
  const currentSeason = wudiInfo.current_season;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header>
        <div className="bg-primary shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <Link
                to="/"
                className="text-white text-2xl font-bold hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                WUDI FYI
              </Link>
              <nav>
                <ul className="flex items-center space-x-6">
                  <li>
                    <Link
                      to="/"
                      className="text-white hover:text-primary-light font-medium transition-all duration-300"
                    >
                      Home
                    </Link>
                  </li>
                  {currentSeason && (
                    <li className="relative group">
                      <span className="text-white font-medium cursor-pointer hover:text-primary-light transition-all duration-300">
                        Leagues
                      </span>
                      <div className="absolute right-0 z-10 w-48 mt-2 hidden group-hover:block">
                        <div className="bg-white rounded-md shadow-custom overflow-hidden">
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
                                className="block px-4 py-2 text-gray-dark hover:bg-primary-light hover:text-primary-dark transition-colors duration-300"
                              >
                                {league.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs justify-end">
              {/* Field locations */}
              {Object.values(wudiMapCoordinates)
                .filter(location => location.type === 'field')
                .map(location => (
                  <a 
                    key={location.coordinates}
                    href={location.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-200 transition-all duration-300"
                  >
                    {location.name}
                  </a>
                ))
              }
              
              {/* Parking locations */}
              {Object.values(wudiMapCoordinates)
                .filter(location => location.type === 'parking')
                .map(location => (
                  <a 
                    key={location.coordinates}
                    href={location.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 transition-all duration-300"
                  >
                    {location.name}
                  </a>
                ))
              }
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>

      <footer className="bg-primary-dark text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WUDI FYI</h3>
              <p className="text-primary-light">
                Westchester Ultimate Disc, Inc.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="mb-2">
                Email:{' '}
                <a
                  href={`mailto:${
                    wudiInfo.contact_email || 'theboard@wudi.org'
                  }`}
                  className="text-primary-light hover:text-white transition-all duration-300"
                >
                  {wudiInfo.contact_email || 'theboard@wudi.org'}
                </a>
              </p>
              <p>
                Emergency:{' '}
                <a
                  href={`tel:${wudiInfo.emergency_number || '9142516900'}`}
                  className="text-primary-light hover:text-white transition-all duration-300"
                >
                  {wudiInfo.emergency_number || '914.251.6900'}
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Leagues</h3>
              <ul className="space-y-2">
                {currentSeason &&
                  currentSeason.leagues.map((league) => {
                    const leagueType =
                      league.type === 'Co-ed'
                        ? 'coed'
                        : league.type === "Women's"
                        ? 'womens'
                        : league.type === 'Recreational'
                        ? 'recreational'
                        : '';

                    return (
                      <li key={league.id}>
                        <Link
                          to={`/leagues/${leagueType}`}
                          className="text-primary-light hover:text-white transition-all duration-300"
                        >
                          {league.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-600 text-center">
            <p className="text-sm text-primary-light">
              &copy; {new Date().getFullYear()} Westchester Ultimate Disc, Inc.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
