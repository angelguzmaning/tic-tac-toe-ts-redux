import { dispatchOnCall, store } from '../../state/store';
import { useStore } from '../../state/storeHooks';
import { Board } from '../Board/Board';
import { GameStateHistoryEntry, jumpTo, playCell, toggleMovesOrder } from './Game.Slice';
import * as R from 'ramda';

export function Game() {
  const { history, status, stepNumber, xIsNext, movesOrder } = useStore();

  const statusText = status.name === 'Winner' ? 'Winner: ' + status.winner : 'Next player: ' + (xIsNext ? 'X' : 'O');
  const moves = history.map(getMoveTemplate(stepNumber));
  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={history[stepNumber].squares}
          onCellClicked={onCellClicked}
          highlight={status.name === 'Winner' ? status.winningCells : undefined}
        />
      </div>
      <div className='game-info'>
        <div>{statusText}</div>
        <button onClick={dispatchOnCall(toggleMovesOrder())}>Toggle moves order</button>
        <ol>{movesOrder === 'Ascending' ? moves : R.reverse(moves)}</ol>
      </div>
    </div>
  );
}

function getMoveTemplate(current: number) {
  return (entry: GameStateHistoryEntry, move: number) => {
    const desc = move
      ? `Go to move #${move} ${getColRowRepresentationOfCell(entry.playedCell || 0)}`
      : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => onJumpTo(move)}>{move === current ? <b>{desc}</b> : desc}</button>
      </li>
    );
  };
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
