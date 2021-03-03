import React, { Fragment } from 'react';
import styled from 'styled-components';

import Style from './style';
import { useStore } from './hooks';
import { ActionTypes } from './constants';
import { Start, Game } from './screens';
import { Button, Stats } from './components';

const App: React.FC = () => {
  const { state, dispatch } = useStore();

  const reset = () => {
    dispatch({ type: ActionTypes.Reset });
  };

  return (
    <Fragment>
      <Style />
      <Stats />
      <Main>
        {!state.playing && <Start />}
        {state.playing && <Game />}
      </Main>
      <Reset icon="refresh-ccw" onClick={reset}>
        Reset
      </Reset>
    </Fragment>
  );
};

const Main = styled.main``;

const Reset = styled(Button)`
  bottom: var(--body-padding);
  right: var(--body-padding);
  position: fixed;
`;

export default App;
