import type { PlayerTypes, ActionTypes } from './constants';

export type Nullable<T> = T | null;

export interface Player {
  type: PlayerTypes;
  plays: number;
  score: number;
  as: number;
}

export interface State {
  playing: boolean;
  played: number;
  players?: Player[];
}

export type Action =
  | { type: ActionTypes; payload?: Player[] }
  | { type: ActionTypes; payload?: number };
