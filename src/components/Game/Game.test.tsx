import { act, fireEvent, render, screen } from '@testing-library/react';
import { store } from '../../state/store';
import { Game } from './Game';
import { jumpTo, playCell, reset } from './Game.Slice';
import * as R from 'ramda';

beforeEach(() => {
  act(() => {
    store.dispatch(reset());
  });
});

it('Should render empty cells and Go to game start button', () => {
  const { queryAllByRole, getByText } = render(<Game />);

  const buttons = queryAllByRole('button');
  expect(buttons.length).toBe(9 + store.getState().history.length);
  R.take(9, buttons).forEach((button) => expect(button.innerHTML).toBeFalsy());

  expect(getByText('Go to game start')).toBeInTheDocument();
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

  act(() => {
    store.dispatch(jumpTo(1));
  });

  const result4 = getSquareValues();
  expect(result4.Xs.length).toBe(1);
  expect(result4.Os.length).toBe(0);

  act(() => {
    store.dispatch(jumpTo(4));
  });

  const result5 = getSquareValues();
  expect(result5.Xs.length).toBe(2);
  expect(result5.Os.length).toBe(2);
});

function getSquareValues(): { Xs: HTMLElement[]; Os: HTMLElement[] } {
  return {
    Xs: screen.queryAllByText('X'),
    Os: screen.queryAllByText('O'),
  };
}

it('Should update render to match state', () => {
  act(() => {
    render(<Game />);
  });

  act(() => {
    store.dispatch(playCell(1));
    store.dispatch(playCell(2));
    store.dispatch(playCell(3));
    store.dispatch(playCell(4));
  });

  expect(screen.getByText('Go to move #1')).toBeInTheDocument();
  expect(screen.getByText('Go to move #2')).toBeInTheDocument();
  expect(screen.getByText('Go to move #3')).toBeInTheDocument();
  expect(screen.getByText('Go to move #4')).toBeInTheDocument();
});

it('Should update store on cell clicked', () => {
  act(() => {
    render(<Game />);
  });

  const buttons = screen.queryAllByRole('button');
  act(() => {
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[4]);
    fireEvent.click(buttons[4]);
  });

  const { history, xIsNext, stepNumber } = store.getState();
  expect(xIsNext).toBe(true);
  expect(stepNumber).toBe(2);
  expect(history[history.length - 1].squares[0]).toMatch('X');
  expect(history[history.length - 1].squares[4]).toMatch('O');
});
