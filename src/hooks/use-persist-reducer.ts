import { useReducer, Reducer, useEffect, Dispatch } from 'react';

const usePersistReducer = <State extends any, Action extends any>(
  reducer: Reducer<State, Action>,
  initialState: State,
  key: string,
): [State, Dispatch<Action>] => {
  const initial =
    JSON.parse(localStorage.getItem(key) as string) || initialState;
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};

export default usePersistReducer;
