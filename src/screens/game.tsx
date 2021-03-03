import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import type { Player as PlayerInterface } from '../types';

import { useStore, useCounter } from '../hooks';
import { Button, Player, Weapons } from '../components';
import { computeWinner, computeMessage, getRandomWeapon } from '../helpers';
import { ActionTypes, PlayerTypes, Weapons as WeaponsEnum } from '../constants';

const DELAY: number = 3000;

const Game: React.FC = () => {
  const { state, dispatch } = useStore();
  const { count, actions: counter } = useCounter(DELAY / 1000);

  const [message, setMessage] = useState<string>('Playing');
  const [weapons, setWeapons] = useState<Record<number, WeaponsEnum>>({});
  const [isAnOngoingGame, setIsAnOngoingGame] = useState<boolean>(true);

  const isUserVsComputer = useMemo(
    () =>
      Boolean(
        state.players?.some((player) => player.type === PlayerTypes.User),
      ),
    [state.players],
  );

  const isUserTurn = useMemo(
    () => Boolean(isAnOngoingGame && isUserVsComputer && !weapons[1]),
    [isAnOngoingGame, isUserVsComputer, weapons],
  );

  const shouldComputeResult = useMemo(
    () => [1, 2].every((player) => weapons[player]),
    [weapons],
  );

  useEffect(() => {
    if (isAnOngoingGame && shouldComputeResult) {
      dispatch({
        type: ActionTypes.Update,
        payload: computeWinner(weapons),
      });

      setIsAnOngoingGame(false);
    }
  }, [setIsAnOngoingGame, shouldComputeResult, isAnOngoingGame, weapons]);

  useEffect(() => {
    const players = state.players as PlayerInterface[];

    if (shouldComputeResult && !isAnOngoingGame) {
      const winner = computeWinner(weapons);
      setMessage(computeMessage(winner, players, isUserVsComputer));
    } else {
      setMessage(
        isUserVsComputer
          ? `${isUserTurn ? 'Your' : "Computer's"} turn`
          : 'Waiting for plays',
      );
    }
  }, [
    shouldComputeResult,
    isAnOngoingGame,
    state.players,
    isUserTurn,
    setMessage,
    weapons,
  ]);

  useEffect(() => {
    if (!isAnOngoingGame) return;

    let timeout: number;

    if (!isUserVsComputer) {
      counter.start();

      timeout = window.setTimeout(() => {
        setWeapons({ 1: getRandomWeapon(), 2: getRandomWeapon() });
        counter.stop();
      }, DELAY);
    } else if (!isUserTurn) {
      counter.start();

      timeout = window.setTimeout(() => {
        setWeapons((previous) => ({ ...previous, 2: getRandomWeapon() }));
        counter.stop();
      }, DELAY);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeout);
    };
  }, [isUserVsComputer, isUserTurn, isAnOngoingGame]);

  const resetGame = () => {
    setWeapons({});
    setMessage('Playing');
    setIsAnOngoingGame(true);
  };

  const setYourWeapon = (weapon: WeaponsEnum) => {
    // eslint-disable-next-line no-unused-expressions
    isUserTurn && setWeapons((previous) => ({ ...previous, 1: weapon }));
  };

  return (
    <GameArea>
      <Players>
        {state.players?.map((player) => {
          const isUser = player.type === PlayerTypes.User;
          return (
            <Player
              key={player.as}
              player={player}
              weapon={weapons[player.as]}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(isUser || isUserTurn || shouldComputeResult
                ? {}
                : { count })}
            />
          );
        })}
      </Players>

      <Footer>
        <Message>{message}</Message>

        {!isAnOngoingGame && (
          <Button icon="play" onClick={resetGame}>
            Play Again
          </Button>
        )}

        {isAnOngoingGame && isUserTurn && (
          <Weapons onWeaponSelect={setYourWeapon} />
        )}
      </Footer>
    </GameArea>
  );
};

const GameArea = styled.section`
  display: grid;
  place-items: center;
`;

const Players = styled.section`
  display: grid;
  grid-gap: 6rem;
  position: relative;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;

  &::after {
    top: 50%;
    left: 50%;
    content: 'VS';
    font-size: 0.9rem;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 580px) {
    grid-gap: 3.5rem;
  }
`;

const Footer = styled.footer`
  justify-content: center;
  margin-top: 2rem;
  min-height: 80px;
  display: grid;
`;

const Message = styled.p`
  text-align: center;
`;

export default Game;
