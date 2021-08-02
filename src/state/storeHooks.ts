import { useEffect, useState } from 'react';
import { store } from './store';

export function useStore() {
  const [state, setIsOnline] = useState(store.getState());

  useEffect(() => {
    function handleStatusChange() {
      setIsOnline(store.getState());
    }

    return store.subscribe(handleStatusChange);
  }, [null]);

  return state;
}
