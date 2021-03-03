import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { render, fireEvent } from '@testing-library/react';

import Weapons from './weapons';

describe('<Weapons />', () => {
  it('should render without crashing', () => {
    const handleOnWeaponSelect = sinon.spy();
    render(<Weapons onWeaponSelect={handleOnWeaponSelect} />);
  });

  it('should call on weapon select when weapon is clicked', () => {
    const handleOnWeaponSelect = sinon.spy();
    const { container } = render(
      <Weapons onWeaponSelect={handleOnWeaponSelect} />,
    );

    const weapons = container.querySelectorAll('ul > li');

    Array.from(weapons).forEach((item) => {
      const button = item.querySelector('button') as HTMLButtonElement;
      const { weapon } = button.dataset;

      fireEvent.click(button as Element);
      expect(handleOnWeaponSelect.calledOnceWith(weapon));
    });
  });
});
