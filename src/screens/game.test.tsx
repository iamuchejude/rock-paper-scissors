import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from '../store';
import Game from './game';

const renderWithStore = (ui: ReactElement) =>
  render(<StoreProvider>{ui}</StoreProvider>);

describe('<Game />', () => {
  it('should render without crashing', () => {
    renderWithStore(<Game />);
  });
});
