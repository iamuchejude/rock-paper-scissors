import { useEffect, useState } from 'react';

const useCounter = (max: number) => {
  const [count, setCount] = useState<number>(max);
  const [counting, setCounting] = useState<boolean>(false);

  const start = () => {
    setCounting(true);
  };

  const stop = () => {
    setCount(max);
    setCounting(false);
  };

  useEffect(() => {
    let interval: number;

    if (counting && count > 0) {
      interval = window.setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [counting, count, setCount]);

  return { count, actions: { start, stop } };
};

export default useCounter;
