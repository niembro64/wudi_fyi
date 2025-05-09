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
  Announcement,
  MapCoordinate,
  LocationType,
} from '../types';

// parking f1234: 41.04559554501856, -73.69775475053007
// parking great lawn: 41.04867160871423, -73.69910489732831
// parking pac: 41.04738461853583, -73.70614712509212
// field pac: 41.04814768322365, -73.70676635860728
// field great lawn: 41.04980649089463, -73.70035329200905
// field 1: 41.04528241174422, -73.70007964880229
// field 2: 41.04391848805534, -73.69946768347029
// field 3: 41.04264330358383, -73.6993303723268
// field 4: 41.041649117811865, -73.6988461168168

// WUDI Map Coordinates
export const wudiMapCoordinates: Record<string, MapCoordinate> = {
  // Fields
  field1: {
    name: 'Forest Field 1',
    coordinates: '41.04528241174422,-73.70007964880229',
    mapsLink: 'https://maps.google.com/?q=41.04528241174422,-73.70007964880229',
    type: LocationType.FIELD,
  },
  field2: {
    name: 'Forest Field 2',
    coordinates: '41.04391848805534,-73.69946768347029',
    mapsLink: 'https://maps.google.com/?q=41.04391848805534,-73.69946768347029',
    type: LocationType.FIELD,
  },
  field3: {
    name: 'Forest Field 3',
    coordinates: '41.04264330358383,-73.6993303723268',
    mapsLink: 'https://maps.google.com/?q=41.04264330358383,-73.6993303723268',
    type: LocationType.FIELD,
  },
  field4: {
    name: 'Forest Field 4',
    coordinates: '41.041649117811865,-73.6988461168168',
    mapsLink: 'https://maps.google.com/?q=41.041649117811865,-73.6988461168168',
    type: LocationType.FIELD,
  },
  // Parking locations
  parkingPAC: {
    name: 'PAC Parking',
    coordinates: '41.04738461853583,-73.70614712509212',
    mapsLink: 'https://maps.google.com/?q=41.04738461853583,-73.70614712509212',
    type: LocationType.PARKING,
  },
  parkingGreatLawn: {
    name: 'Great Lawn Parking',
    coordinates: '41.04867160871423,-73.69910489732831',
    mapsLink: 'https://maps.google.com/?q=41.04867160871423,-73.69910489732831',
    type: LocationType.PARKING,
  },
  // Parking for the main fields
  parkingFields: {
    name: 'Forest Fields Parking',
    coordinates: '41.04559554501856,-73.69775475053007',
    mapsLink: 'https://maps.google.com/?q=41.04559554501856,-73.69775475053007',
    type: LocationType.PARKING,
  },
  // Other locations
  pacFields: {
    name: 'PAC Fields',
    coordinates: '41.04814768322365,-73.70676635860728',
    mapsLink: 'https://maps.google.com/?q=41.04814768322365,-73.70676635860728',
    type: LocationType.FIELD,
  },
  greatLawn: {
    name: 'Great Lawn Fields',
    coordinates: '41.04980649089463,-73.70035329200905',
    mapsLink: 'https://maps.google.com/?q=41.04980649089463,-73.70035329200905',
    type: LocationType.FIELD,
  },
};

// Sample location
export const sampleLocations: Location[] = [
  {
    id: 'loc-1',
    name: 'SUNY Purchase',
    address: 'SUNY Purchase Campus',
    city: 'Purchase',
    state: 'NY',
    zip: '10577',
    parking_info: `Parking available at ${wudiMapCoordinates.parkingPAC.name} and ${wudiMapCoordinates.parkingGreatLawn.name}`,
    google_maps_link: wudiMapCoordinates.field1.mapsLink,
  },
];

// Sample fields
export const sampleFields: Field[] = [
  {
    id: 'field-1',
    name: 'WUDI Field 1',
    number: 1,
    location: {
      ...sampleLocations[0],
      google_maps_link: wudiMapCoordinates.field1.mapsLink,
    },
    dimensions: {
      length: 50,
      width: 30,
      endzone: 10,
    },
  },
  {
    id: 'field-2',
    name: 'WUDI Field 2',
    number: 2,
    location: {
      ...sampleLocations[0],
      google_maps_link: wudiMapCoordinates.field2.mapsLink,
    },
    dimensions: {
      length: 50,
      width: 30,
      endzone: 10,
    },
  },
  {
    id: 'field-3',
    name: 'WUDI Field 3',
    number: 3,
    location: {
      ...sampleLocations[0],
      google_maps_link: wudiMapCoordinates.field3.mapsLink,
    },
    dimensions: {
      length: 50,
      width: 30,
      endzone: 10,
    },
  },
  {
    id: 'field-4',
    name: 'WUDI Field 4',
    number: 4,
    location: {
      ...sampleLocations[0],
      google_maps_link: wudiMapCoordinates.field4.mapsLink,
    },
    dimensions: {
      length: 50,
      width: 30,
      endzone: 10,
    },
  },
];

// Sample people
export const samplePeople: Person[] = [
  // Team 1 Players
  {
    id: 'person-1',
    name: 'Leia Walker',
    email: 'leia.brubaker@wudi.org',
    phone: '719-679-7220',
    emergency_contact: null,
  },
  {
    id: 'person-2',
    name: 'Eric Niemeyer',
    email: 'niemeyer.eric@gmail.com',
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-3',
    name: 'Alex Rodriguez',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-4',
    name: 'Jamie Wilson',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-5',
    name: 'Taylor Swift',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-6',
    name: 'Sam Johnson',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-7',
    name: 'Pat Garcia',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-8',
    name: 'Casey Kim',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-9',
    name: 'Jordan Lee',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-10',
    name: 'Riley Cooper',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-11',
    name: 'Morgan Chen',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-12',
    name: 'Dakota White',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-13',
    name: 'Quinn Smith',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-14',
    name: 'Cameron Brown',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  // Team 2 Players
  {
    id: 'person-15',
    name: 'Karen Chalif',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-16',
    name: 'Andrew Marshall',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-17',
    name: 'Skyler Thomas',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-18',
    name: 'Avery Martinez',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-19',
    name: 'Harper Davis',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-20',
    name: 'Reese Williams',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-21',
    name: 'Blake Anderson',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-22',
    name: 'Emerson Clark',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-23',
    name: 'Finley Wright',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-24',
    name: 'Rowan Young',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-25',
    name: 'Sage Green',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-26',
    name: 'Parker Scott',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-27',
    name: 'Drew Hall',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-28',
    name: 'Hayden King',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  // Team 3 Players
  {
    id: 'person-29',
    name: 'Michael Ciancimino',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-30',
    name: 'Charlie Lopez',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-31',
    name: 'Ryan Baker',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-32',
    name: 'Tyler Gonzalez',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-33',
    name: 'Alex Rivera',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-34',
    name: 'Bailey Hill',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-35',
    name: 'Casey Lewis',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-36',
    name: 'Dana Morgan',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-37',
    name: 'Eddie Ross',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-38',
    name: 'Frankie Bell',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-39',
    name: 'Georgie Hayes',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-40',
    name: 'Harper Wood',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-41',
    name: 'Jaimie Price',
    email: null,
    phone: null,
    emergency_contact: null,
  },
  {
    id: 'person-42',
    name: 'Kris Long',
    email: null,
    phone: null,
    emergency_contact: null,
  },
];

// Sample teams
export const sampleTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Team 1',
    captains: [samplePeople[0]],
    players: samplePeople.slice(0, 14), // 14 players
    color: 'White',
    logo: null,
  },
  {
    id: 'team-2',
    name: 'Team 2',
    captains: [samplePeople[14]],
    players: samplePeople.slice(14, 28), // 14 players
    color: 'Black',
    logo: null,
  },
  {
    id: 'team-3',
    name: 'Team 3',
    captains: [samplePeople[28]],
    players: samplePeople.slice(28, 42), // 14 players
    color: 'Purple',
    logo: null,
  },
  {
    id: 'team-4',
    name: 'Team 4',
    captains: [samplePeople[14]],
    players: samplePeople.slice(14, 28), // Same as Team 2
    color: 'Red',
    logo: null,
  },
  {
    id: 'team-5',
    name: 'Team 5',
    captains: [samplePeople[1]],
    players: samplePeople.slice(0, 14), // Same as Team 1
    color: 'Blue',
    logo: null,
  },
  {
    id: 'team-6',
    name: 'Team 6',
    captains: [samplePeople[15]],
    players: samplePeople.slice(28, 42), // Same as Team 3
    color: 'Green',
    logo: null,
  },
];

// Sample games for Week 1 (April 21)
export const week1Games: Game[] = [
  // First round games - 6:00 PM
  {
    id: 'game-1',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-22',
    time: '18:00',
    field: sampleFields[0], // Field 1
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null,
  },
  {
    id: 'game-2',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[0], // Team 1
    date: '2025-04-22',
    time: '18:00',
    field: sampleFields[1], // Field 2
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null,
  },
  {
    id: 'game-3',
    home_team: sampleTeams[5], // Team 6
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-22',
    time: '18:00',
    field: sampleFields[2], // Field 3
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null,
  },

  // Second round games - 6:40 PM
  {
    id: 'game-4',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[0], // Team 1
    date: '2025-04-22',
    time: '18:40',
    field: sampleFields[0], // Field 1
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null,
  },
  {
    id: 'game-5',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-22',
    time: '18:40',
    field: sampleFields[1], // Field 2
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null,
  },
  {
    id: 'game-6',
    home_team: sampleTeams[5], // Team 6
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-22',
    time: '18:40',
    field: sampleFields[2], // Field 3
    status: GameStatus.COMPLETED,
    week: 1,
    round: null,
    notes: null,
  },
];

// Sample games for Week 2 (April 28)
export const week2Games: Game[] = [
  // First round games - 6:00 PM
  {
    id: 'game-7',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-29',
    time: '18:00',
    field: sampleFields[0], // Field 1
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null,
  },
  {
    id: 'game-8',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[5], // Team 6
    date: '2025-04-29',
    time: '18:00',
    field: sampleFields[1], // Field 2
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null,
  },
  {
    id: 'game-9',
    home_team: sampleTeams[0], // Team 1
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-29',
    time: '18:00',
    field: sampleFields[2], // Field 3
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null,
  },

  // Second round games - 6:40 PM
  {
    id: 'game-10',
    home_team: sampleTeams[0], // Team 1
    away_team: sampleTeams[4], // Team 5
    date: '2025-04-29',
    time: '18:40',
    field: sampleFields[0], // Field 1
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null,
  },
  {
    id: 'game-11',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[5], // Team 6
    date: '2025-04-29',
    time: '18:40',
    field: sampleFields[1], // Field 2
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null,
  },
  {
    id: 'game-12',
    home_team: sampleTeams[2], // Team 3
    away_team: sampleTeams[3], // Team 4
    date: '2025-04-29',
    time: '18:40',
    field: sampleFields[2], // Field 3
    status: GameStatus.SCHEDULED,
    week: 2,
    round: null,
    notes: null,
  },
];

// Sample games for Week 3 - Quarterfinals and Semifinals (May 5)
export const week3Games: Game[] = [
  // First round games - 6:00 PM (Quarterfinals)
  {
    id: 'game-13',
    home_team: sampleTeams[0], // Team 1
    away_team: sampleTeams[5], // Team 6
    date: '2025-05-06',
    time: '18:00',
    field: sampleFields[0], // Field 1
    status: GameStatus.SCHEDULED,
    week: 3,
    round: 'Quarterfinals',
    notes: null,
  },
  {
    id: 'game-14',
    home_team: sampleTeams[3], // Team 4
    away_team: sampleTeams[4], // Team 5
    date: '2025-05-06',
    time: '18:00',
    field: sampleFields[1], // Field 2
    status: GameStatus.SCHEDULED,
    week: 3,
    round: 'Quarterfinals',
    notes: null,
  },
  {
    id: 'game-15',
    home_team: sampleTeams[1], // Team 2
    away_team: sampleTeams[2], // Team 3
    date: '2025-05-06',
    time: '18:00',
    field: sampleFields[2], // Field 3
    status: GameStatus.SCHEDULED,
    week: 3,
    round: 'Quarterfinals',
    notes: null,
  },

  // Second round games - 6:40 PM (Semifinals)
  {
    id: 'game-16',
    home_team: sampleTeams[0], // placeholder for Semifinal 1
    away_team: sampleTeams[3], // placeholder for Semifinal 1
    date: '2025-05-06',
    time: '18:40',
    field: sampleFields[0], // Field 1
    status: GameStatus.SCHEDULED,
    week: 3,
    round: 'Semifinals',
    notes: 'Winner of QF1 vs Winner of QF2',
  },
  {
    id: 'game-17',
    home_team: sampleTeams[1], // placeholder for Semifinal 2
    away_team: sampleTeams[5], // placeholder for Semifinal 2
    date: '2025-05-06',
    time: '18:40',
    field: sampleFields[1], // Field 2
    status: GameStatus.SCHEDULED,
    week: 3,
    round: 'Semifinals',
    notes: 'Winner of QF3 vs Highest seed remaining',
  },
];

// Sample games for Week 4 - Finals (May 12)
export const week4Games: Game[] = [
  // Finals - 6:00 PM
  {
    id: 'game-18',
    home_team: sampleTeams[0], // placeholder for Final
    away_team: sampleTeams[1], // placeholder for Final
    date: '2025-05-13',
    time: '18:00',
    field: sampleFields[0], // Field 1
    status: GameStatus.SCHEDULED,
    week: 4,
    round: 'Finals',
    notes: 'Winner of SF1 vs Winner of SF2',
  },
  // 3rd Place Game - 6:00 PM
  {
    id: 'game-19',
    home_team: sampleTeams[3], // placeholder for 3rd Place
    away_team: sampleTeams[5], // placeholder for 3rd Place
    date: '2025-05-13',
    time: '18:00',
    field: sampleFields[1], // Field 2
    status: GameStatus.SCHEDULED,
    week: 4,
    round: '3rd Place Game',
    notes: 'Loser of SF1 vs Loser of SF2',
  },
];

// Combine all games
export const sampleGames: Game[] = [
  ...week1Games,
  ...week2Games,
  ...week3Games,
  ...week4Games,
];

// Sample schedule
export const springCoedSchedule: Schedule = {
  id: 'schedule-spring-coed-2025',
  games: sampleGames,
  start_date: '2025-04-22',
  end_date: '2025-05-13',
  playoff_start_date: '2025-05-06',
  weeks: 4,
};

export const springWomensSchedule: Schedule = {
  id: 'schedule-spring-womens-2025',
  games: [],
  start_date: '2025-04-23',
  end_date: '2025-05-14',
  playoff_start_date: null,
  weeks: 4,
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
    description:
      'Our Co-ed 5v5 Outdoor League is on Tuesday nights starting in late April. It will run for 4 weeks directly before our summer season starts.',
    rules: {
      field_size: 'Length: 50 yards, Width: 30 yards, Endzones: 10 yards',
      game_length:
        '40 minutes per game, 2 games per night (6:00 PM and 6:40 PM)',
      timeouts: 'One 1-minute timeout per game',
      gender_ratio: '4/1 (4 men, 1 woman)',
      substitution_rules: 'Live hockey subs',
      other_rules:
        "Make it drop it (if you score, drop the disc and now you'll be playing defense)",
    },
    location: sampleLocations[0],
    registration_info: {
      is_open: false,
      deadline: '2025-04-01',
      player_fee: 40,
      max_players: 90,
    },
    emergency_number: '914.251.6900',
  },
  {
    id: 'league-spring-womens-2025',
    name: "Spring Women's League",
    type: LeagueType.WOMENS,
    teams: null,
    schedule: springWomensSchedule,
    coordinators: [samplePeople[0]],
    description:
      "Our Women's League is meant as a community event to bring together women players.",
    rules: {
      field_size: null,
      game_length: null,
      timeouts: null,
      gender_ratio: 'Women only',
      substitution_rules: null,
      other_rules:
        'Each week will have a short skill focus. In that skill focus there will be a beginner section as well as an advanced section.',
    },
    location: sampleLocations[0],
    registration_info: {
      is_open: false,
      deadline: '2025-04-01',
      player_fee: 30,
      max_players: 50,
    },
    emergency_number: '914.251.6900',
  },
];

// Sample seasons
export const sampleSeasons: SeasonInfo[] = [
  {
    id: 'season-spring-2025',
    season: Season.SPRING,
    year: 2025,
    leagues: sampleLeagues,
    start_date: '2025-04-22',
    end_date: '2025-05-14',
    description:
      "WUDi's Spring Leagues consists of two leagues: 5v5 Outdoor League and a Women's League. Both leagues play at SUNY Purchase in Purchase, NY.",
    theme: null,
    media: {
      disc_image: null,
      jersey_image: null,
      banner_image: null,
    },
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
      banner_image: null,
    },
  },
];

// Sample announcements
export const sampleAnnouncements: Announcement[] = [
  {
    id: 'announcement-1',
    title: 'Spring League 2025 Starting Soon!',
    content: `Welcome to Spring League 2025! We're excited to welcome you all to what is going to be a wonderful Spring League for WUDI!

The Spring 5v5 Outdoor League games are held at SUNY Purchase on Tuesday evenings. Each team will have two games per night:
- First game starts at 6:00 PM
- Second game starts at 6:40 PM

Games for the Women's League are held at SUNY Purchase on Wednesday evenings, starting at 6:00 PM.

IMPORTANT: Purchase has its own emergency number (914.251.6900) that will have a faster response time than 911. Please save this number in your phone as "Purchase Emergency" or "WUDI Emergency".`,
    date: '2025-04-17',
    author: samplePeople[3],
    image: null,
    priority: 1,
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
    priority: 2,
  },
];

// Top level WUDI info
export const wudiInfo: WUDIInfo = {
  current_season: sampleSeasons[0],
  board_members: [
    samplePeople[0],
    samplePeople[2],
    samplePeople[3],
    samplePeople[4],
  ],
  contact_email: 'theboard@wudi.org',
  emergency_number: '914.251.6900',
  slack_invite_link: null,
  announcements: sampleAnnouncements,
};
