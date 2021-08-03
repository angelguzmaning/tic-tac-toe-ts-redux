import { Fragment } from 'react';
import { dispatchOnCall, store } from '../../state/store';
import { GameState, GameStateHistoryEntry, jumpTo, toggleMovesOrder } from '../Game/Game.Slice';
import * as R from 'ramda';

export function History({
  movesOrder,
  history,
  stepNumber,
}: {
  movesOrder: GameState['movesOrder'];
  history: GameState['history'];
  stepNumber: number;
}) {
  const moves = history.map(getMoveTemplate(stepNumber));
  return (
    <Fragment>
      <button onClick={dispatchOnCall(toggleMovesOrder())}>Toggle moves order</button>
      <ol>{movesOrder === 'Ascending' ? moves : R.reverse(moves)}</ol>
    </Fragment>
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
