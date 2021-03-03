import { useEffect, RefObject } from 'react';
import { timeStringToSeconds, secondsToTimeString } from '../helpers';

const useTimeWasted = <Elem extends HTMLElement = HTMLElement>(
  ref: RefObject<Elem>,
  enabled: boolean,
) => {
  useEffect(() => {
    let interval: number;
    const el = ref?.current;

    const resetTimeWasted = () => {
      if (el) {
        el.innerText = '00:00:00';
        clearInterval(interval);
      }
    };

    if (el) {
      if (enabled) {
        interval = window.setInterval(() => {
          const timeInSeconds = timeStringToSeconds(el.innerText);
          el.innerText = secondsToTimeString(timeInSeconds + 1);
        }, 1000);
      } else {
        resetTimeWasted();
      }
    }

    return () => {
      resetTimeWasted();
    };
  }, [ref, enabled]);
};

export default useTimeWasted;
