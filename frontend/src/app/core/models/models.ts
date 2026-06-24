/** Tipos (interfaces) compartilhados pela aplicação. */

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  balance: number;
}

export type Pick = 'home' | 'draw' | 'away';

export interface Odds {
  home: number;
  draw: number;
  away: number;
}

export interface Score {
  home: number | null;
  away: number | null;
}

export interface Game {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  stage: string;
  group?: string;
  stadium?: string;
  city?: string;
  matchDate: string;
  odds: Odds;
  status: 'agendado' | 'encerrado';
  score: Score;
  result: Pick | null;
}

export interface Bet {
  _id: string;
  user: string;
  game: Game;
  pick: Pick;
  amount: number;
  oddAtBet: number;
  status: 'pendente' | 'ganha' | 'perdida';
  payout: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
