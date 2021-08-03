import { SquareValue } from './boardSquares';

export interface PlayingStatus {
  name: 'Playing';
}

export interface WinnerStatus {
  name: 'Winner';
  winner: SquareValue;
  winningCells: [number, number, number];
}

export interface DrawStatus {
  name: 'Draw';
}

export type GameStatus = PlayingStatus | WinnerStatus | DrawStatus;

export function buildStatusText(status: GameStatus, xIsNext: boolean): string {
  return status.name === 'Winner'
    ? 'Winner: ' + status.winner
    : status.name === 'Draw'
    ? 'Draw'
    : 'Next player: ' + (xIsNext ? 'X' : 'O');
}
