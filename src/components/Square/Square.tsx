export type SquareValue = 'X' | 'O' | null;

export function Square(props: { value: SquareValue }) {
  return <button className='square'>{props.value}</button>;
}
