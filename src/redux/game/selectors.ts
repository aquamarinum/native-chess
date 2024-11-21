import {RootState} from '../store';

export const gameModeSelector = (state: RootState) => state.gameMode;
export const timeModeSelector = (state: RootState) => state.gameMode.timeMode;
export const pieceColorSelector = (state: RootState) =>
  state.gameMode.pieceColor;
export const gameIdSelector = (state: RootState) => state.gameMode.gameId;
export const premovesSelector = (state: RootState) => state.gameMode.premoves;
export const whitePlayerGameSelector = (state: RootState) =>
  state.gameMode.playerWhite;
export const blackPlayerGameSelector = (state: RootState) =>
  state.gameMode.playerBlack;
