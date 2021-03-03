import React, { useRef } from 'react';
import styled from 'styled-components';
import { useStore, useTimeWasted } from '../hooks';

const Stats: React.FC = () => {
  const { state } = useStore();
  const { played, playing } = state;
  const timeWastedRef = useRef<HTMLHeadingElement>(null);

  useTimeWasted<HTMLHeadingElement>(timeWastedRef, playing);

  return (
    <StyledStats>
      <Stat>
        <Label>Time Wasted</Label>
        <Value ref={timeWastedRef}>00:00:00</Value>
      </Stat>

      {playing && (
        <Stat>
          <Label>Games Played</Label>
          <Value>{played}</Value>
        </Stat>
      )}
    </StyledStats>
  );
};

const StyledStats = styled.ul`
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;
  left: var(--body-padding);
  top: var(--body-padding);
  position: absolute;
  grid-gap: 1.5rem;
  display: grid;

  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(2, 1fr);
    padding: var(--body-padding);
    grid-template-rows: 1fr;
    margin-bottom: 1.2rem;
    grid-gap: 1rem;
    width: 100%;
    left: 0;
    top: 0;
  }
`;

const Stat = styled.li``;

const Label = styled.span`
  font-weight: 200;
  font-size: 0.9rem;

  @media screen and (max-width: 580px) {
    font-size: 0.8rem;
  }
`;

const Value = styled.h3`
  font-size: 2rem;
  margin-top: 0.3rem;

  @media screen and (max-width: 580px) {
    font-size: 1.5rem;
  }
`;

export default Stats;
