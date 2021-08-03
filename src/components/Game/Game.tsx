import { store } from '../../state/store';
import { useStore } from '../../state/storeHooks';
import { Board } from '../Board/Board';
import { playCell } from './Game.Slice';
import { buildStatusText } from '../../types/gameStatus';
import { History } from '../History/History';

export function Game() {
  const { history, status, stepNumber, xIsNext, movesOrder } = useStore();

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
        <div>{buildStatusText(status, xIsNext)}</div>
        <History {...{ history, movesOrder, stepNumber }} />
      </div>
    </div>
  );
}

function onCellClicked(index: number) {
  store.dispatch(playCell(index));
}
