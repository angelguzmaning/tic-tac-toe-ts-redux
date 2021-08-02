import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquares } from '../../types/boardSquares';

export type GameStateHistoryEntry = { squares: BoardSquares };

export interface GameState {
  history: GameStateHistoryEntry[];
  stepNumber: number;
  xIsNext: boolean;
}

const initialState: GameState = {
  history: [{ squares: [null, null, null, null, null, null, null, null, null] }],
  stepNumber: 0,
  xIsNext: true,
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
    playCell: (state, { payload: index }: PayloadAction<number>) => {
      state.history = state.history.slice(0, state.stepNumber + 1);
      const current = state.history[state.history.length - 1];
      if (current.squares[index]) return;

      state.history.push({ squares: current.squares.slice() as BoardSquares });
      state.history[state.history.length - 1].squares[index] = state.xIsNext ? 'X' : 'O';
      state.xIsNext = !state.xIsNext;
      state.stepNumber = state.history.length - 1;
    },
    jumpTo: (state, { payload: step }: PayloadAction<number>) => {
      state.stepNumber = step;
      state.xIsNext = step % 2 === 0;
    },
  },
});

export default slice.reducer;

export const { reset, playCell, jumpTo } = slice.actions;
