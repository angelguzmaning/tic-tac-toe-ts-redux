import { useStore } from '../../state/storeHooks';
import { Board } from '../Board/Board';

export function Game() {
  const state = useStore();
  return <Board squares={state.history.squares} />;
}
