import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquares, calculateWinner, SquareValue } from '../../types/boardSquares';

export type GameStateHistoryEntry = { squares: BoardSquares; playedCell: null | number };

export interface GameState {
  history: GameStateHistoryEntry[];
  stepNumber: number;
  xIsNext: boolean;
  winner: SquareValue;
  movesOrder: 'Descending' | 'Ascending';
}

const initialState: GameState = {
  history: [{ squares: [null, null, null, null, null, null, null, null, null], playedCell: null }],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
  movesOrder: 'Ascending',
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
    playCell: (state, { payload: index }: PayloadAction<number>) => {
      state.history = state.history.slice(0, state.stepNumber + 1);
      const current = state.history[state.history.length - 1];
      if (current.squares[index] || state.winner) return;

      state.history.push({ squares: current.squares.slice() as BoardSquares, playedCell: index });
      const value = state.xIsNext ? 'X' : 'O';
      state.history[state.history.length - 1].squares[index] = value;
      state.xIsNext = !state.xIsNext;
      state.stepNumber = state.history.length - 1;

      if (calculateWinner(state.history[state.history.length - 1].squares)) {
        state.winner = value;
      }
    },
    jumpTo: (state, { payload: step }: PayloadAction<number>) => {
      state.stepNumber = step;
      state.xIsNext = step % 2 === 0;

      if (step < state.history.length - 1) {
        state.winner = null;
        return;
      }

      if (calculateWinner(state.history[state.history.length - 1].squares)) {
        state.winner = !state.xIsNext ? 'X' : 'O';
      }
    },
    toggleMovesOrder: (state) => {
      state.movesOrder = state.movesOrder === 'Ascending' ? 'Descending' : 'Ascending';
    },
  },
});

export default slice.reducer;

export const { reset, playCell, jumpTo, toggleMovesOrder } = slice.actions;
