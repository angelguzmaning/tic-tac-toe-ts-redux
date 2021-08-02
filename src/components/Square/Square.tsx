import { SquareValue } from '../../types/boardSquares';

export function Square(props: { value: SquareValue }) {
  return <button className='square'>{props.value}</button>;
}
