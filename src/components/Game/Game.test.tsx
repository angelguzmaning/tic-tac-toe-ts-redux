import { act, render, screen } from '@testing-library/react';
import { dispatchOnCall, store } from '../../state/store';
import { Game } from './Game';
import { playCell, reset } from './Game.Slice';

beforeEach(dispatchOnCall(reset()));

it('Should render empty cells', () => {
  const { queryAllByRole } = render(<Game />);

  const buttons = queryAllByRole('button');
  expect(buttons.length).toBe(9);
  buttons.forEach((button) => expect(button.innerHTML).toBeFalsy());
});

it('Should update render to match state', () => {
  act(() => {
    render(<Game />);
  });

  const result1 = getSquareValues();
  expect(result1.Xs.length).toBe(0);
  expect(result1.Os.length).toBe(0);

  act(() => {
    store.dispatch(playCell(0));
  });

  const result2 = getSquareValues();
  expect(result2.Xs.length).toBe(1);
  expect(result2.Os.length).toBe(0);

  act(() => {
    store.dispatch(playCell(1));
    store.dispatch(playCell(2));
    store.dispatch(playCell(3));
    store.dispatch(playCell(4));
  });

  const result3 = getSquareValues();
  expect(result3.Xs.length).toBe(3);
  expect(result3.Os.length).toBe(2);
});

function getSquareValues(): { Xs: HTMLElement[]; Os: HTMLElement[] } {
  return {
    Xs: screen.queryAllByText('X'),
    Os: screen.queryAllByText('O'),
  };
}
