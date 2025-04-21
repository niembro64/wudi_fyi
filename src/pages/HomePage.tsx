import React from 'react';
import { Link } from 'react-router-dom';
import { wudiInfo } from '../data/sampleData';

const HomePage: React.FC = () => {
  const currentSeason = wudiInfo.current_season;
  const announcements = wudiInfo.announcements || [];

  return (
    <div>
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl overflow-hidden shadow-custom mb-12">
        <div className="relative z-10 py-16 px-6 md:px-12 text-center animate-pulse-slow">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md animate-float">WUDI FYI</h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-light">Westchester Ultimate Disc, Inc.</p>

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

      <section className="mb-12 bg-red-50 rounded-xl shadow-custom overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-700 py-3 px-6">
          <h2 className="text-white text-xl font-bold">Emergency Information</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center w-full md:w-auto">
              <a
                href={`tel:${wudiInfo.emergency_number || '9142516900'}`}
                className="text-xl font-bold text-red-600 flex items-center"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                {wudiInfo.emergency_number || '914.251.6900'}
              </a>
            </div>
            <div className="flex-1">
              <p className="mb-2">
                This number should be used for emergencies at our playing fields. It
                will connect you to security services at SUNY Purchase for a faster
                response than 911.
              </p>
              <p className="font-bold text-red-600">
                Please save this number in your phone as "WUDI Emergency" or
                "Purchase Emergency".
              </p>
            </div>
          </div>
        </div>
      </section>

      {announcements.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">Important Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="card hover:translate-y-[-4px]">
                <h3 className="text-xl font-bold text-primary-dark mb-2">{announcement.title}</h3>
                <p className="text-sm text-gray mb-3">
                  {new Date(announcement.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="prose prose-sm mb-4">
                  {announcement.content}
                </div>
                {announcement.author && (
                  <p className="text-sm text-gray italic">
                    Posted by: {announcement.author.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {currentSeason && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">
            {currentSeason.season} {currentSeason.year} Season
          </h2>
          <p className="mb-8 text-lg">{currentSeason.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div key={league.id} className="card hover:translate-y-[-4px]">
                  <h3 className="text-xl font-bold text-primary-dark mb-3">{league.name}</h3>
                  <p className="mb-4 text-gray-700">{league.description}</p>

                  {league.schedule && (
                    <div className="mb-4 bg-gray-50 p-3 rounded-md">
                      <p className="font-medium">
                        <span className="text-gray">Game Days:</span>{' '}
                        <span className="text-primary-dark">{getDayOfWeek(league.schedule.start_date)}s</span>
                      </p>
                    </div>
                  )}

                  <Link 
                    to={`/leagues/${leagueType}`} 
                    className="btn inline-flex items-center"
                  >
                    <span>View Schedule</span>
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-dark border-b-2 border-primary pb-2">Field Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold text-primary-dark mb-4">Location Details</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>SUNY Purchase, 735 Anderson Hill Rd, Purchase, NY 10577</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>Parking available at the Performing Arts Center (PAC) and the Great Lawn</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Emergency Number: 914.251.6900</span>
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold text-primary-dark mb-4">Google Maps</h3>
            <a
              href="https://maps.google.com/?q=41.04561378382737,-73.6978115030064"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-center w-full transform transition-all duration-300 hover:bg-primary-dark hover:shadow-lg font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Open SUNY Purchase Fields
            </a>
            <div className="mt-4 bg-gray-100 rounded-lg p-2 text-sm text-gray-600 text-center">
              Tap the button above to open the exact field location in Google Maps
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