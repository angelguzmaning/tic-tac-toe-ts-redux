import { SquareValue } from '../../types/boardSquares';

export function Square({ value, onClick }: { value: SquareValue; onClick: () => void }) {
  return (
    <button className='square' onClick={onClick}>
      {value}
    </button>
  );
}
