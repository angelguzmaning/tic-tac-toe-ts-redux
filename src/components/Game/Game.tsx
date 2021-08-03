import { store } from '../../state/store';
import { useStore } from '../../state/storeHooks';
import { Board } from '../Board/Board';
import { GameStateHistoryEntry, jumpTo, playCell } from './Game.Slice';

export function Game() {
  const { history, winner, stepNumber, xIsNext } = useStore();

  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');
  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={history[stepNumber].squares} onCellClicked={onCellClicked} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{history.map(getMoveTemplate)}</ol>
      </div>
    </div>
  );
}

function getMoveTemplate(entry: GameStateHistoryEntry, move: number) {
  const desc = move
    ? `Go to move #${move} ${getColRowRepresentationOfCell(entry.playedCell || 0)}`
    : 'Go to game start';
  return (
    <li key={move}>
      <button onClick={() => onJumpTo(move)}>{desc}</button>
    </li>
  );
}

function getColRowRepresentationOfCell(index: number): string {
  return `(${index % 3}, ${Math.floor(index / 3)})`;
}

function onJumpTo(step: number) {
  store.dispatch(jumpTo(step));
}

function onCellClicked(index: number) {
  store.dispatch(playCell(index));
}
