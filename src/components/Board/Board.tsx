import { BoardSquares, SquareValue } from '../../types/boardSquares';
import { Square } from '../Square/Square';

export function Board({ squares, onCellClicked }: { squares: BoardSquares; onCellClicked: (index: number) => void }) {
  return (
    <div>
      <div className='board-row'>
        {renderSquare(squares[0], 0, onCellClicked)}
        {renderSquare(squares[1], 1, onCellClicked)}
        {renderSquare(squares[2], 2, onCellClicked)}
      </div>
      <div className='board-row'>
        {renderSquare(squares[3], 3, onCellClicked)}
        {renderSquare(squares[4], 4, onCellClicked)}
        {renderSquare(squares[5], 5, onCellClicked)}
      </div>
      <div className='board-row'>
        {renderSquare(squares[6], 6, onCellClicked)}
        {renderSquare(squares[7], 7, onCellClicked)}
        {renderSquare(squares[8], 8, onCellClicked)}
      </div>
    </div>
  );
}

function renderSquare(square: SquareValue, index: number, onCellClicked: (index: number) => void) {
  return <Square value={square} onClick={() => onCellClicked(index)} />;
}
