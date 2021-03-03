import React from 'react';
import styled from 'styled-components';
import Icon from 'feather-icons-react';
import logo from '../images/logo.png';

import { Button } from '../components';
import { useStore } from '../hooks';
import { ActionTypes, PlayerTypes } from '../constants';

const Start: React.FC = () => {
  const { dispatch } = useStore();

  const startUserVsComputer = () => {
    const payload = [PlayerTypes.User, PlayerTypes.Computer].map(
      (type, index) => ({
        as: index + 1,
        score: 0,
        plays: 0,
        type,
      }),
    );

    dispatch({
      type: ActionTypes.Start,
      payload,
    });
  };

  const startComputerVsComputer = () => {
    const payload = [1, 2].map((as) => ({
      type: PlayerTypes.Computer,
      score: 0,
      plays: 0,
      as,
    }));

    dispatch({
      type: ActionTypes.Start,
      payload,
    });
  };

  return (
    <Container>
      <Logo src={logo} alt="Rock Paper Scissors" />

      <ButtonGroup>
        <Button onClick={startUserVsComputer}>
          <Icon icon="user" size="18" className="left" />
          <span>vs</span>
          <Icon icon="monitor" size="18" className="right" />
        </Button>

        <Button onClick={startComputerVsComputer}>
          <Icon icon="monitor" size="18" className="left" />
          <span>vs</span>
          <Icon icon="monitor" size="18" className="right" />
        </Button>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  text-align: center;
`;

const Logo = styled.img`
  width: 180px;
  margin: 0 auto 2rem;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 1.2rem;

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;

    & > * {
      height: 100%;
    }

    span {
      margin: 0 1rem;
    }
  }
`;

export default Start;
