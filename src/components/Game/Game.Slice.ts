import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquares } from '../../types/boardSquares';

export interface GameState {
  history: { squares: BoardSquares };
  stepNumber: number;
  xIsNext: boolean;
}

const initialState: GameState = {
  history: { squares: [null, null, null, null, null, null, null, null, null] },
  stepNumber: 0,
  xIsNext: true,
};

const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: () => initialState,
    playCell: (state, { payload: index }: PayloadAction<number>) => {
      state.history.squares[index] = state.xIsNext ? 'X' : 'O';
      state.xIsNext = !state.xIsNext;
    },
  },
});

export default slice.reducer;

export const { reset, playCell } = slice.actions;
