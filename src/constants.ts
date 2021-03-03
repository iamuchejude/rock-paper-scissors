import Rock from './images/weapons/rock.svg';
import Paper from './images/weapons/paper.svg';
import Scissors from './images/weapons/scissors.svg';

export enum PlayerTypes {
  User = 'USER',
  Computer = 'COMPUTER',
}

export enum Weapons {
  Rock = 'ROCK',
  Paper = 'PAPER',
  Scissors = 'SCISSORS',
}

export enum ActionTypes {
  Start = 'START',
  Update = 'UPDATE',
  Stop = 'STOP',
  Reset = 'RESET',
}

export const WinnerConfig = {
  [Weapons.Rock]: [Weapons.Scissors],
  [Weapons.Paper]: [Weapons.Rock],
  [Weapons.Scissors]: [Weapons.Paper],
};

export const WeaponIcons = {
  [Weapons.Rock]: Rock,
  [Weapons.Paper]: Paper,
  [Weapons.Scissors]: Scissors,
};
