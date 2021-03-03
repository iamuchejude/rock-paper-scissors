import { ActionTypes } from './constants';
import type { State, Action, Player } from './types';

const updateGame = (state: State, winner: number): State => {
  if (winner === 0) {
    return { ...state, played: state.played + 1 };
  }

  const players = state.players?.map((player) =>
    player.as === winner ? { ...player, score: player.score + 1 } : player,
  );

  return { ...state, players, played: state.played + 1 };
};

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  if (type === ActionTypes.Start) {
    return {
      players: payload as Player[],
      playing: true,
      played: 0,
    };
  }

  if (type === ActionTypes.Update) {
    return updateGame(state, action.payload as number);
  }

  if (type === ActionTypes.Reset) {
    return {
      playing: false,
      played: 0,
    };
  }

  return state;
};

export default reducer;
