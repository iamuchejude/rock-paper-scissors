import React, { MouseEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Weapons as WeaponsEnum, WeaponIcons } from '../constants';
import { getEventPath } from '../helpers';
import Button from './button';

interface WeaponsProp {
  onWeaponSelect: (weapon: WeaponsEnum) => void;
}

const Weapons: React.FC<WeaponsProp> = ({ onWeaponSelect }) => {
  const weaponsRef = useRef<any>();

  useEffect(() => {
    const handler = (event: MouseEvent<HTMLElement>) => {
      const path = getEventPath<MouseEvent<HTMLElement>>(event);
      const button = path.find(
        (el) =>
          (el as HTMLElement).tagName === 'BUTTON' &&
          (el as HTMLElement).dataset.weapon,
      );

      if (button) {
        const weapon = (button as HTMLElement).dataset.weapon as WeaponsEnum;
        onWeaponSelect(weapon);
      }
    };

    weaponsRef.current?.addEventListener('click', handler);

    return () => {
      weaponsRef.current?.removeEventListener('click', handler);
    };
  }, [weaponsRef]);

  return (
    <WeaponGroup ref={weaponsRef}>
      {Object.values(WeaponsEnum).map((weapon: WeaponsEnum) => {
        const WeaponIcon = WeaponIcons[weapon];

        return (
          <Weapon key={weapon}>
            <WeaponButton variant="rounded" data-weapon={weapon}>
              <WeaponIcon width="18" />
            </WeaponButton>
          </Weapon>
        );
      })}
    </WeaponGroup>
  );
};

const WeaponGroup = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Weapon = styled.li`
  display: inline;

  &:not(:last-of-type) {
    margin-right: 1.2rem;
  }
`;

const WeaponButton = styled(Button)`
  display: grid;
  place-items: center;
`;

export default Weapons;
