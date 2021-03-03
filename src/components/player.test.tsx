import React from 'react';
import { render } from '@testing-library/react';
import { PlayerTypes, Weapons } from '../constants';
import Player from './player';

describe('<Player />', () => {
  it('should render without crashing', () => {
    const player = { as: 1, score: 0, plays: 0, type: PlayerTypes.User };
    render(<Player player={player} weapon={Weapons.Paper} />);
  });
});
