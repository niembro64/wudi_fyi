import { 
  Season, 
  LeagueType, 
  GameStatus, 
  Person, 
  Team, 
  Field, 
  Location, 
  Game, 
  Schedule, 
  League, 
  SeasonInfo, 
  WUDIInfo,
  Announcement 
} from '../types';

// Sample location
export const sampleLocations: Location[] = [
  {
    id: 'loc-1',
    name: 'SUNY Purchase',
    address: 'SUNY Purchase Campus',
    city: 'Purchase',
    state: 'NY',
    zip: '10577',
    parking_info: 'Parking available at PAC and Great Lawn',
    google_maps_link: 'https://maps.google.com/?q=SUNY+Purchase',
  }
];

// Sample fields
export const sampleFields: Field[] = [
  {
    id: 'field-1',
    name: 'WUDI Field 1',
    number: 1,
    location: sampleLocations[0],
    dimensions: {
      length: 50,
      width: 30,
      endzone: 10
    }
  },
  {
    id: 'field-2',
    name: 'WUDI Field 2',
    number: 2,
    location: sampleLocations[0],
    dimensions: {
      length: 50,
      width: 30,
      endzone: 10
    }
  },
  {
    id: 'field-3',
    name: 'WUDI Field 3',
    number: 3,
    location: sampleLocations[0],
    dimensions: {
      length: 50,
      width: 30,
      endzone: 10
    }
  }
];

// Sample people
export const samplePeople: Person[] = [
  {
    id: 'person-1',
    name: 'Leia Walker',
    email: 'leia.brubaker@wudi.org',
    phone: '719-679-7220',
    emergency_contact: null
  },
  {
    id: 'person-2',
    name: 'Eric Niemeyer',
    email: 'niemeyer.eric@gmail.com',
    phone: null,
    emergency_contact: null
  },
  {
    id: 'person-3',
    name: 'Karen Chalif',
    email: null,
    phone: null,
    emergency_contact: null
  },
  {
    id: 'person-4',
    name: 'Andrew Marshall',
    email: null,
    phone: null,
    emergency_contact: null
  },
  {
    id: 'person-5',
    name: 'Michael Ciancimino',
    email: null,
    phone: null,
    emergency_contact: null
  }
];

// Sample teams
export const sampleTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Team 1',
    captains: [samplePeople[0]],
    players: [samplePeople[0], samplePeople[1]],
    color: 'White',
    stats: {
      wins: 2,
      losses: 1,
      points_for: 30,
      points_against: 25,
      spirit_score: 4.5
    },
    logo: null
  },
  {
    id: 'team-2',
    name: 'Team 2',
    captains: [samplePeople[2]],
    players: [samplePeople[2], samplePeople[3]],
    color: 'Black',
    stats: {
      wins: 1,
      losses: 2,
      points_for: 25,
      points_against: 30,
      spirit_score: 4.2
    },
    logo: null
  },
  {
    id: 'team-3',
    name: 'Team 3',
    captains: [samplePeople[4]],
    players: [samplePeople[4], samplePeople[1]],
    color: 'Purple',
    stats: {
      wins: 0,
      losses: 3,
      points_for: 20,
      points_against: 40,
      spirit_score: 4.8
    },
    logo: null
  },
  {
    id: 'team-4',
    name: 'Team 4',
    captains: [samplePeople[2]],
    players: [samplePeople[2], samplePeople[3]],
    color: 'Red',
    stats: {
      wins: 2,
      losses: 1,
      points_for: 35,
      points_against: 25,
      spirit_score: 4.6
    },
    logo: null
  },
  {
    id: 'team-5',
    name: 'Team 5',
    captains: [samplePeople[1]],
    players: [samplePeople[1], samplePeople[4]],
    color: 'Blue',
    stats: {
      wins: 1,
      losses: 2,
      points_for: 28,
      points_against: 32,
      spirit_score: 4.7
    },
    logo: null
  },
  {
    id: 'team-6',
    name: 'Team 6',
    captains: [samplePeople[3]],
    players: [samplePeople[3], samplePeople[0]],
    color: 'Green',
    stats: {
      wins: 1,
      losses: 2,
      points_for: 26,
      points_against: 30,
      spirit_score: 4.9
    },
    logo: null
  }
];

// Sample games for Week 1 (April 21)
export const week1Games: Game[] = [
  // First round games - 6:00 PM
  {
    id: 'game-1',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-21',
    time: '18:00',
    field: sampleFields[0], // Field 1
    home_score: 10,
    away_score: 8,
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null
  },
  {
    id: 'game-2',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[0], // Team 1
    date: '2025-04-21',
    time: '18:00',
    field: sampleFields[1], // Field 2
    home_score: 12,
    away_score: 10,
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null
  },
  {
    id: 'game-3',
    home_team: sampleTeams[5], // Team 6
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-21',
    time: '18:00',
    field: sampleFields[2], // Field 3
    home_score: 9,
    away_score: 11,
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null
  },
  
  // Second round games - 6:40 PM
  {
    id: 'game-4',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[0], // Team 1
    date: '2025-04-21',
    time: '18:40',
    field: sampleFields[0], // Field 1
    home_score: 8,
    away_score: 12,
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null
  },
  {
    id: 'game-5',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-21',
    time: '18:40',
    field: sampleFields[1], // Field 2
    home_score: 9,
    away_score: 11,
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null
  },
  {
    id: 'game-6',
    home_team: sampleTeams[5], // Team 6
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-21',
    time: '18:40',
    field: sampleFields[2], // Field 3
    home_score: 10,
    away_score: 8,
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null
  }
];

// Sample games for Week 2 (April 28)
export const week2Games: Game[] = [
  // First round games - 6:00 PM
  {
    id: 'game-7',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-28',
    time: '18:00',
    field: sampleFields[0], // Field 1
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null
  },
  {
    id: 'game-8',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[5], // Team 6
    date: '2025-04-28',
    time: '18:00',
    field: sampleFields[1], // Field 2
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null
  },
  {
    id: 'game-9',
    home_team: sampleTeams[0], // Team 1
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-28',
    time: '18:00',
    field: sampleFields[2], // Field 3
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null
  },
  
  // Second round games - 6:40 PM
  {
    id: 'game-10',
    home_team: sampleTeams[0], // Team 1
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-28',
    time: '18:40',
    field: sampleFields[0], // Field 1
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null
  },
  {
    id: 'game-11',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[5], // Team 6
    date: '2025-04-28',
    time: '18:40',
    field: sampleFields[1], // Field 2
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null
  },
  {
    id: 'game-12',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-28',
    time: '18:40',
    field: sampleFields[2], // Field 3
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null
  }
];

// Sample games for Week 3 - Quarterfinals and Semifinals (May 5)
export const week3Games: Game[] = [
  // First round games - 6:00 PM (Quarterfinals)
  {
    id: 'game-13',
    home_team: sampleTeams[0], // Team 1
    away_team: sampleTeams[5], // Team 6
    date: '2025-05-05',
    time: '18:00',
    field: sampleFields[0], // Field 1
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 3,
    round: "Quarterfinals",
    notes: null
  },
  {
    id: 'game-14',
    home_team: sampleTeams[3], // Team 4
    away_team: sampleTeams[4], // Team 5
    date: '2025-05-05',
    time: '18:00',
    field: sampleFields[1], // Field 2
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 3,
    round: "Quarterfinals",
    notes: null
  },
  {
    id: 'game-15',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[2], // Team 3
    date: '2025-05-05',
    time: '18:00',
    field: sampleFields[2], // Field 3
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 3,
    round: "Quarterfinals",
    notes: null
  },
  
  // Second round games - 6:40 PM (Semifinals)
  {
    id: 'game-16',
    home_team: sampleTeams[0], // placeholder for Semifinal 1
    away_team: sampleTeams[3], // placeholder for Semifinal 1
    date: '2025-05-05',
    time: '18:40',
    field: sampleFields[0], // Field 1
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 3,
    round: "Semifinals",
    notes: "Winner of QF1 vs Winner of QF2"
  },
  {
    id: 'game-17',
    home_team: sampleTeams[1], // placeholder for Semifinal 2
    away_team: sampleTeams[5], // placeholder for Semifinal 2
    date: '2025-05-05',
    time: '18:40',
    field: sampleFields[1], // Field 2
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 3,
    round: "Semifinals",
    notes: "Winner of QF3 vs Highest seed remaining"
  }
];

// Sample games for Week 4 - Finals (May 12)
export const week4Games: Game[] = [
  // Finals - 6:00 PM
  {
    id: 'game-18',
    home_team: sampleTeams[0], // placeholder for Final
    away_team: sampleTeams[1], // placeholder for Final
    date: '2025-05-12',
    time: '18:00',
    field: sampleFields[0], // Field 1
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 4,
    round: "Finals",
    notes: "Winner of SF1 vs Winner of SF2"
  },
  // 3rd Place Game - 6:00 PM
  {
    id: 'game-19',
    home_team: sampleTeams[3], // placeholder for 3rd Place
    away_team: sampleTeams[5], // placeholder for 3rd Place
    date: '2025-05-12',
    time: '18:00',
    field: sampleFields[1], // Field 2
    home_score: null,
    away_score: null,
    status: GameStatus.SCHEDULED,
    week: 4,
    round: "3rd Place Game",
    notes: "Loser of SF1 vs Loser of SF2"
  }
];

// Combine all games
export const sampleGames: Game[] = [
  ...week1Games,
  ...week2Games,
  ...week3Games,
  ...week4Games
];

// Sample schedule
export const springCoedSchedule: Schedule = {
  id: 'schedule-spring-coed-2025',
  games: sampleGames,
  start_date: '2025-04-21',
  end_date: '2025-05-12',
  playoff_start_date: '2025-05-05',
  weeks: 4
};

export const springWomensSchedule: Schedule = {
  id: 'schedule-spring-womens-2025',
  games: [],
  start_date: '2025-04-23',
  end_date: '2025-05-14',
  playoff_start_date: null,
  weeks: 4
};

// Sample leagues
export const sampleLeagues: League[] = [
  {
    id: 'league-spring-coed-2025',
    name: 'Spring Co-ed 5v5 League',
    type: LeagueType.COED,
    teams: sampleTeams,
    schedule: springCoedSchedule,
    coordinators: [samplePeople[2], samplePeople[3]],
    description: 'Our Co-ed 5v5 Outdoor League is on Monday nights starting in late April. It will run for 4 weeks directly before our summer season starts.',
    rules: {
      field_size: 'Length: 50 yards, Width: 30 yards, Endzones: 10 yards',
      game_length: '40 minutes per game, 2 games per night (6:00 PM and 6:40 PM)',
      timeouts: 'One 1-minute timeout per game',
      gender_ratio: '4/1 (4 men, 1 woman)',
      substitution_rules: 'Live hockey subs',
      other_rules: 'Make it drop it (if you score, drop the disc and now you\'ll be playing defense)'
    },
    location: sampleLocations[0],
    registration_info: {
      is_open: false,
      deadline: '2025-04-01',
      player_fee: 40,
      max_players: 90
    },
    emergency_number: '914.251.6900'
  },
  {
    id: 'league-spring-womens-2025',
    name: 'Spring Women\'s League',
    type: LeagueType.WOMENS,
    teams: null,
    schedule: springWomensSchedule,
    coordinators: [samplePeople[0]],
    description: 'Our Women\'s League is meant as a community event to bring together all DOW players. We use the term DOW (Defender of Women) to be inclusive of women and non-binary players who choose to defend against women.',
    rules: {
      field_size: null,
      game_length: null,
      timeouts: null,
      gender_ratio: 'DOW only',
      substitution_rules: null,
      other_rules: 'Each week will have a short skill focus. In that skill focus there will be a beginner section as well as an advanced section.'
    },
    location: sampleLocations[0],
    registration_info: {
      is_open: false,
      deadline: '2025-04-01',
      player_fee: 30,
      max_players: 50
    },
    emergency_number: '914.251.6900'
  }
];

// Sample seasons
export const sampleSeasons: SeasonInfo[] = [
  {
    id: 'season-spring-2025',
    season: Season.SPRING,
    year: 2025,
    leagues: sampleLeagues,
    start_date: '2025-04-21',
    end_date: '2025-05-14',
    description: 'WUDi\'s Spring Leagues consists of two leagues: 5v5 Outdoor League and a Women\'s League. Both leagues play at SUNY Purchase in Purchase, NY.',
    theme: null,
    media: {
      disc_image: null,
      jersey_image: null,
      banner_image: null
    }
  },
  {
    id: 'season-summer-2024',
    season: Season.SUMMER,
    year: 2024,
    leagues: [],
    start_date: '2024-06-01',
    end_date: '2024-08-15',
    description: 'Summer 2024 Season - Comic Book Super Villains theme!',
    theme: 'Comic Book Super Villains',
    media: {
      disc_image: null,
      jersey_image: null,
      banner_image: null
    }
  }
];

// Sample announcements
export const sampleAnnouncements: Announcement[] = [
  {
    id: 'announcement-1',
    title: 'Spring League 2025 Starting Soon!',
    content: `Welcome to Spring League 2025! We're excited to welcome you all to what is going to be a wonderful Spring League for WUDI!

The Spring 5v5 Outdoor League games are held at SUNY Purchase on Monday evenings. Each team will have two games per night:
- First game starts at 6:00 PM
- Second game starts at 6:40 PM

Games for the Women's League are held at SUNY Purchase on Wednesday evenings, starting at 6:00 PM.

IMPORTANT: Purchase has its own emergency number (914.251.6900) that will have a faster response time than 911. Please save this number in your phone as "Purchase Emergency" or "WUDI Emergency".`,
    date: '2025-04-17',
    author: samplePeople[3],
    image: null,
    priority: 1
  },
  {
    id: 'announcement-2',
    title: 'Join the WUDI Slack Community!',
    content: `All players are welcome and encouraged to join the WUDI League Slack channel to help all of us in the community to engage with each other!

Anyone can sign up and join the league's slack - just follow the invite link to join from your desktop or phone. The following channels are available:
- #ask-the-board - Ask your questions to the board
- #weather-announcements - Stay updated on weather cancellations
- #where-to-play - Find playing opportunities and tournaments
- #wudi-ride-board - Coordinate rides to games
- #wudi-social-club - Social events and announcements

Ask your captain for the invite link or email theboard@wudi.org`,
    date: '2025-04-16',
    author: samplePeople[0],
    image: null,
    priority: 2
  }
];

// Top level WUDI info
export const wudiInfo: WUDIInfo = {
  current_season: sampleSeasons[0],
  board_members: [
    samplePeople[0],
    samplePeople[2],
    samplePeople[3],
    samplePeople[4]
  ],
  contact_email: 'theboard@wudi.org',
  emergency_number: '914.251.6900',
  slack_invite_link: null,
  announcements: sampleAnnouncements
};