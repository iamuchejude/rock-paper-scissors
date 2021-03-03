import { PlayerTypes, Weapons, WinnerConfig } from './constants';
import type { Player } from './types';

export const computeWinner = (weapons: Record<number, Weapons>): number => {
  const { 1: weapon1, 2: weapon2 } = weapons;
  if (weapon1 === weapon2) return 0;
  if (WinnerConfig[weapon1].includes(weapon2)) return 1;
  return 2;
};

export const computeMessage = (
  winner: number,
  players: Player[],
  isUserVsComputer: boolean,
): string => {
  if (winner < 1) return 'Draw!';

  if (isUserVsComputer) {
    const userIsTheWinner =
      players.find((player) => player.as === winner)?.type === PlayerTypes.User;

    return userIsTheWinner ? 'You win!' : 'Computer wins!';
  }

  return `Computer ${winner} wins!`;
};

export const timeStringToSeconds = (time: string): number => {
  const [hh, mm, ss] = time.split(':');
  const hours = parseInt(hh, 10) * 60 * 60;
  const minutes = parseInt(mm, 10) * 60;
  const seconds = parseInt(ss, 10);
  return hours + minutes + seconds;
};

export const secondsToTimeString = (seconds: number): string => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};

export const getRandomWeapon = (): Weapons => {
  const weapons = Object.values(Weapons);
  return weapons[Math.floor(Math.random() * weapons.length)];
};

export const getEventPath = <T>(event: T & { path?: EventTarget[] }) => {
  if (!(event instanceof Event)) return [];
  if (Array.isArray(event.path)) return event.path;
  if (typeof event.composedPath === 'function') return event.composedPath();

  const path = [];
  let { target } = event;

  while (target !== window && (target as HTMLElement).parentNode !== null) {
    path.push(target);
    target = (target as HTMLElement).parentNode;
  }

  path.push(document, window);

  return path;
};
