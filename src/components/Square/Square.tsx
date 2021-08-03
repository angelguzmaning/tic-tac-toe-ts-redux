import { SquareValue } from '../../types/boardSquares';

export function Square({
  value,
  highlight,
  onClick,
}: {
  value: SquareValue;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <button className={'square' + (highlight ? ' square--highlighted' : '')} onClick={onClick}>
      {value}
    </button>
  );
}
