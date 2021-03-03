import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import Stats from './stats';
import { StoreProvider } from '../store';

const renderWithStore = (ui: ReactElement) =>
  render(<StoreProvider>{ui}</StoreProvider>);

describe('<Stats />', () => {
  it('should render without crashing', () => {
    renderWithStore(<Stats />);
  });

  it('should init with time 00:00:00', () => {
    const { getByText } = renderWithStore(<Stats />);
    const label = getByText('Time Wasted');
    const value = label.nextSibling;

    expect(document.body.contains(label));
    expect(value?.textContent).to.equal('00:00:00');
  });
});
