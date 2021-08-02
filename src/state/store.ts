import { Action, configureStore } from '@reduxjs/toolkit';
import game from '../components/Game/Game.Slice';

export const store = configureStore({ reducer: game });
export type State = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
