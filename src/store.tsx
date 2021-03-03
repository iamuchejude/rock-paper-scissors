import React, { createContext, Dispatch, Reducer } from 'react';
import type { State, Action } from './types';
import { usePersistReducer } from './hooks';
import reducer from './reducer';

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const initalState = {
  playing: false,
  played: 0,
};

export const StoreContext = createContext<Context>({
  state: initalState,
  dispatch: () => null,
});

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = usePersistReducer<State, Action>(
    reducer,
    initalState,
    '__state__',
  );

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
