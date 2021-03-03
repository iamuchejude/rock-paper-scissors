import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from '../store';
import Start from './start';

const renderWithStore = (ui: ReactElement) =>
  render(<StoreProvider>{ui}</StoreProvider>);

describe('<Start />', () => {
  it('should render without crashing', () => {
    renderWithStore(<Start />);
  });
});
