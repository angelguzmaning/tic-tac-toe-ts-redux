import { render } from '@testing-library/react';
import { Board } from './Board';

it('Should render squares with values', () => {
  const { queryAllByRole, queryAllByText } = render(
    <Board squares={[null, 'X', null, 'O', 'O', 'X', 'X', null, null]} onCellClicked={() => {}} />
  );

  expect(queryAllByRole('button').length).toBe(9);
  expect(queryAllByText('X').length).toBe(3);
  expect(queryAllByText('O').length).toBe(2);
});
