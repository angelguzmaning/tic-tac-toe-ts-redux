import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardSquares, calculateWinner, SquareValue } from '../../types/boardSquares';

export type GameStateHistoryEntry = { squares: BoardSquares; playedCell: null | number };

export interface PlayingStatus {
  name: 'Playing';
}

export interface WinnerStatus {
  name: 'Winner';
  winner: SquareValue;
  winningCells: [number, number, number];
}

export type GameStatus = PlayingStatus | WinnerStatus;

export interface GameState {
  history: GameStateHistoryEntry[];
  stepNumber: number;
  xIsNext: boolean;
  status: GameStatus;
  movesOrder: 'Descending' | 'Ascending';
}

const initialState: GameState = {
  history: [{ squares: [null, null, null, null, null, null, null, null, null], playedCell: null }],
  stepNumber: 0,
  xIsNext: true,
  status: {
    name: 'Playing',
  },
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
      if (current.squares[index] || state.status.name === 'Winner') return;

      state.history.push({ squares: current.squares.slice() as BoardSquares, playedCell: index });
      const value = state.xIsNext ? 'X' : 'O';
      state.history[state.history.length - 1].squares[index] = value;
      state.xIsNext = !state.xIsNext;
      state.stepNumber = state.history.length - 1;

      const winningCells = calculateWinner(state.history[state.history.length - 1].squares);
      if (winningCells) {
        state.status = { name: 'Winner', winner: value, winningCells };
      }
    },
    jumpTo: (state, { payload: step }: PayloadAction<number>) => {
      state.stepNumber = step;
      state.xIsNext = step % 2 === 0;

      if (step < state.history.length - 1) {
        state.status = { name: 'Playing' };
        return;
      }

      const winningCells = calculateWinner(state.history[state.history.length - 1].squares);
      if (winningCells) {
        state.status = { name: 'Winner', winner: !state.xIsNext ? 'X' : 'O', winningCells };
      }
    },
    toggleMovesOrder: (state) => {
      state.movesOrder = state.movesOrder === 'Ascending' ? 'Descending' : 'Ascending';
    },
  },
});

export default slice.reducer;

export const { reset, playCell, jumpTo, toggleMovesOrder } = slice.actions;
