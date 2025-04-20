// WUDI League TypeScript Definitions

// Enum for seasons
export enum Season {
  WINTER = "Winter",
  SPRING = "Spring",
  SUMMER = "Summer",
  FALL = "Fall"
}

// Enum for league types
export enum LeagueType {
  COED = "Co-ed",
  WOMENS = "Women's",
  REC = "Recreational"
}

// Game status enum
export enum GameStatus {
  SCHEDULED = "Scheduled",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  POSTPONED = "Postponed"
}

// Base entity interface
export interface Entity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

// Person (player, captain, coordinator)
export interface Person extends Entity {
  name: string;
  email: string | null;
  phone: string | null;
  emergency_contact: EmergencyContact | null;
}

// Emergency contact info
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string | null;
}

// Team information
export interface Team extends Entity {
  name: string;
  captains: Person[];
  players: Person[];
  color: string | null;
  stats: TeamStats | null;
  logo: string | null;
}

// Team statistics
export interface TeamStats {
  wins: number;
  losses: number;
  points_for: number;
  points_against: number;
  spirit_score: number | null;
}

// Field location
export interface Field extends Entity {
  name: string;
  number: number;
  location: Location | null;
  dimensions: FieldDimensions | null;
}

// Field dimensions
export interface FieldDimensions {
  length: number | null;
  width: number | null;
  endzone: number | null;
}

// Location details
export interface Location extends Entity {
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  parking_info: string | null;
  google_maps_link: string | null;
}

// Game information
export interface Game extends Entity {
  home_team: Team;
  away_team: Team;
  date: string; // ISO date string
  time: string; // time string in 24hr format
  field: Field;
  home_score: number | null;
  away_score: number | null;
  status: GameStatus;
  week: number | null;
  round: string | null; // "Quarterfinals", "Semifinals", "Finals", etc.
  notes: string | null;
}

// Schedule containing games
export interface Schedule extends Entity {
  games: Game[];
  start_date: string; // ISO date
  end_date: string; // ISO date
  playoff_start_date: string | null; // ISO date
  weeks: number;
}

// League-specific information
export interface League extends Entity {
  name: string;
  type: LeagueType;
  teams: Team[] | null;
  schedule: Schedule | null;
  coordinators: Person[];
  description: string | null;
  rules: LeagueRules | null;
  location: Location | null;
  registration_info: RegistrationInfo | null;
  emergency_number: string | null;
}

// League rules
export interface LeagueRules {
  field_size: string | null;
  game_length: string | null;
  timeouts: string | null;
  gender_ratio: string | null;
  substitution_rules: string | null;
  other_rules: string | null;
}

// Registration information
export interface RegistrationInfo {
  is_open: boolean;
  deadline: string | null; // ISO date
  player_fee: number | null;
  max_players: number | null;
}

// Season information (contains multiple leagues)
export interface SeasonInfo extends Entity {
  season: Season;
  year: number;
  leagues: League[];
  start_date: string; // ISO date
  end_date: string; // ISO date
  description: string | null;
  theme: string | null;
  media: SeasonMedia | null;
}

// Season media assets
export interface SeasonMedia {
  disc_image: string | null;
  jersey_image: string | null;
  banner_image: string | null;
}

// Announcement or news item
export interface Announcement extends Entity {
  title: string;
  content: string;
  date: string; // ISO date
  author: Person | null;
  image: string | null; 
  priority: number; // Higher = more important
}

// Top level WUDI organization info
export interface WUDIInfo {
  current_season: SeasonInfo | null;
  board_members: Person[] | null;
  contact_email: string | null;
  emergency_number: string | null;
  slack_invite_link: string | null;
  announcements: Announcement[] | null;
}