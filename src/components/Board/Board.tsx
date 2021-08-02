import { BoardSquares } from '../../types/boardSquares';
import { Square } from '../Square/Square';

export function Board({ squares }: { squares: BoardSquares }) {
  return (
    <div>
      <div className='board-row'>
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </div>
  );
}
