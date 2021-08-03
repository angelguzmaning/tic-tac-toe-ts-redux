import { BoardSquares, SquareValue } from '../../types/boardSquares';
import { Square } from '../Square/Square';
import * as R from 'ramda';

export function Board({ squares, onCellClicked }: { squares: BoardSquares; onCellClicked: (index: number) => void }) {
  return (
    <div>
      {R.range(0, 3).map((rowIndex) => (
        <div className='board-row' key={rowIndex}>
          {R.range(0, 3).map((columnIndex) => {
            const index = rowIndex * 3 + columnIndex;
            return renderSquare(squares[index], index, onCellClicked);
          })}
        </div>
      ))}
    </div>
  );
}

function renderSquare(square: SquareValue, index: number, onCellClicked: (index: number) => void) {
  return <Square key={index} value={square} onClick={() => onCellClicked(index)} />;
}
