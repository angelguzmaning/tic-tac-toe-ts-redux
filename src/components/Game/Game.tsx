import { store } from '../../state/store';
import { useStore } from '../../state/storeHooks';
import { Board } from '../Board/Board';
import { playCell } from './Game.Slice';
import { History } from '../History/History';

export function Game() {
  const { history, status, stepNumber, xIsNext, movesOrder } = useStore();

  const statusText =
    status.name === 'Winner'
      ? 'Winner: ' + status.winner
      : status.name === 'Draw'
      ? 'Draw'
      : 'Next player: ' + (xIsNext ? 'X' : 'O');
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
        <History {...{ history, movesOrder, stepNumber }} />
      </div>
    </div>
  );
}

function onCellClicked(index: number) {
  store.dispatch(playCell(index));
}
