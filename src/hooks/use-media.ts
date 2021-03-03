import { useEffect, useState } from 'react';

const useMedia = (query: string) => {
  const queryList =
    typeof window !== 'undefined' ? window.matchMedia(query) : null;
  const [state, setState] = useState(Boolean(queryList?.matches));

  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      setState(event.matches);
    };

    queryList?.addEventListener('change', handler);

    return () => {
      queryList?.removeEventListener('change', handler);
    };
  }, [queryList]);

  return state;
};

export default useMedia;
