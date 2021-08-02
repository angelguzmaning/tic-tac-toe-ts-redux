import { useEffect, useState } from 'react';
import { store } from './store';

export function useStore() {
  const [state, setState] = useState(store.getState());
  useEffect(() => store.subscribe(() => setState(store.getState())), [null]);
  return state;
}
