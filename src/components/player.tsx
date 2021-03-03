import React from 'react';
import Icon from 'feather-icons-react';
import styled, { css } from 'styled-components';

import { useMedia } from '../hooks';
import type { Weapons } from '../constants';
import type { Player as PlayerInterface } from '../types';
import { PlayerTypes, WeaponIcons } from '../constants';

interface PlayerProps {
  player: PlayerInterface;
  count?: number;
  weapon?: Weapons;
}

type StyledElementProps = { position: 'left' | 'right' };

const Player: React.FC<PlayerProps> = ({ player, weapon, count }) => {
  const isMobile = useMedia('(max-width: 600px)');
  const isUser = player.type === PlayerTypes.User;

  const position = player.as === 1 ? 'left' : 'right';
  const Weapon = WeaponIcons[weapon as Weapons];
  const icon = isUser ? 'user' : 'monitor';

  return (
    <Container>
      <PlayerIcon className="player__icon" position={position}>
        <Icon icon={icon} size={isMobile ? 16 : 18} strokeWidth="1" />
      </PlayerIcon>

      {count ? (
        <Count>{count}</Count>
      ) : (
        <WeaponArea>
          {weapon && <Weapon width={isMobile ? 30 : 60} />}
        </WeaponArea>
      )}

      <Score className="player__score" position={position}>
        {player.score}
      </Score>
    </Container>
  );
};

const Container = styled.section`
  width: 150px;
  height: 150px;
  position: relative;
  box-sizing: border-box;

  & > .player__icon,
  & > .player__score {
    width: 40px;
    z-index: 3;
    height: 40px;
    display: grid;
    border-radius: 50%;
    position: absolute;
    background: #fff;
    place-items: center;
    border: 1px solid #afafaf;
  }

  @media screen and (max-width: 580px) {
    width: 100px;
    height: 100px;

    & > .player__icon,
    & > .player__score {
      width: 30px;
      height: 30px;
    }
  }
`;

const WeaponArea = styled.div`
  top: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 100%;
  display: grid;
  border-radius: 50%;
  position: relative;
  place-items: center;
  border: 1px solid #afafaf;
`;

const Count = styled(WeaponArea)`
  font-size: 2rem;
`;

const Score = styled.h3<StyledElementProps>`
  font-size: 1.3rem;
  bottom: 0;

  @media screen and (max-width: 580px) {
    font-size: 0.9rem;
  }

  ${(props) =>
    props.position === 'left'
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
`;

const PlayerIcon = styled.span<StyledElementProps>`
  top: 0;

  ${(props) =>
    props.position === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;

export default React.memo(Player);
