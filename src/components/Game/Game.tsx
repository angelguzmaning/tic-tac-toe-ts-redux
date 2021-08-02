import { store } from '../../state/store';
import { useStore } from '../../state/storeHooks';
import { Board } from '../Board/Board';
import { GameStateHistoryEntry, playCell } from './Game.Slice';

export function Game() {
  const state = useStore();

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={state.history[state.stepNumber].squares} onCellClicked={onCellClicked} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{state.history.map(getMoveTemplate)}</ol>
      </div>
    </div>
  );
}

function getMoveTemplate(_: GameStateHistoryEntry, move: number) {
  const desc = move ? 'Go to move #' + move : 'Go to game start';
  return (
    <li key={move}>
      <button>{desc}</button>
    </li>
  );
}

function onCellClicked(index: number) {
  store.dispatch(playCell(index));
}
