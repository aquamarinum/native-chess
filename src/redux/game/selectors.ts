import {RootState} from '../store';

export const gameModeSelector = (state: RootState) => state.gameMode;
export const timeModeSelector = (state: RootState) => state.gameMode.timeMode;
export const pieceColorSelector = (state: RootState) =>
  state.gameMode.pieceColor;
