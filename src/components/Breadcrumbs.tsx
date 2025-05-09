import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { findGameById, formatGameDate, formatGameTime } from '../utils/gameUtils';
import { wudiInfo } from '../data/sampleData';
import { LeagueType } from '../types';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathElements = location.pathname.split('/').filter(path => path);
  
  let breadcrumbs: { label: string; path: string }[] = [
    { label: 'Home', path: '/' }
  ];
  
  // Handle different routes
  if (pathElements.length > 0) {
    // Handle league pages
    if (pathElements[0] === 'leagues' && pathElements[1]) {
      const leagueType = pathElements[1];
      
      // Find the league name based on type
      let leagueName = '';
      if (leagueType === 'womens') {
        leagueName = 'Women\'s League';
      } else if (leagueType === 'coed') {
        leagueName = 'Co-ed League';
      } else if (leagueType === 'recreational') {
        leagueName = 'Recreational League';
      }
      
      breadcrumbs.push({
        label: leagueName,
        path: `/leagues/${leagueType}`
      });
    }
    
    // Handle game pages
    if (pathElements[0] === 'games' && pathElements[1]) {
      const gameId = pathElements[1];
      const game = findGameById(gameId);
      
      // Find the league this game belongs to
      let leagueType = '';
      let leagueName = '';
      
      if (game) {
        // Find which league this game belongs to
        for (const league of wudiInfo.current_season?.leagues || []) {
          if (league.schedule?.games?.some(g => g.id === gameId)) {
            if (league.type === LeagueType.WOMENS) {
              leagueType = 'womens';
              leagueName = 'Women\'s League';
            } else if (league.type === LeagueType.COED) {
              leagueType = 'coed';
              leagueName = 'Co-ed League';
            } else if (league.type === LeagueType.REC) {
              leagueType = 'recreational';
              leagueName = 'Recreational League';
            }
            break;
          }
        }
        
        // Add league to breadcrumbs
        if (leagueType) {
          breadcrumbs.push({
            label: leagueName,
            path: `/leagues/${leagueType}`
          });
        }
        
        // Create shorter team names
        const homeTeamShort = game.home_team.name.length > 10
          ? game.home_team.name.substring(0, 10) + '...'
          : game.home_team.name;

        const awayTeamShort = game.away_team.name.length > 10
          ? game.away_team.name.substring(0, 10) + '...'
          : game.away_team.name;

        // Add game to breadcrumbs with a shorter label
        breadcrumbs.push({
          label: `${homeTeamShort} vs ${awayTeamShort}`,
          path: `/games/${gameId}`
        });
      } else {
        // If game not found, just show a generic Game label
        breadcrumbs.push({
          label: 'Game',
          path: `/games/${gameId}`
        });
      }
    }
  }

  return (
    <nav className="py-2" aria-label="Breadcrumbs">
      <ol className="flex flex-wrap items-center text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.path} className="flex items-center max-w-full">
              {index > 0 && (
                <svg
                  className="mx-2 h-4 w-4 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}

              {isLast ? (
                <span className="font-medium text-primary-dark truncate">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-600 hover:text-primary hover:underline transition-colors truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;