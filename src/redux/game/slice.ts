import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameModeType} from '../../types/GameModeType';
import {TimeModes} from '../../types/TimeModes';

const initialState: GameModeType = {
  gameId: 'null',
  timeMode: TimeModes.RAPID1,
  pieceColor: 'random',
  isRating: true,
  leftRating: 300,
  rightRating: 300,
  premoves: [],
};

export const gameModeSlice = createSlice({
  name: 'gameMode',
  initialState,
  reducers: {
    setGameMode(state, action: PayloadAction<GameModeType>) {
      state = action.payload;
    },
    setGameId(state, action: PayloadAction<string>) {
      state.gameId = action.payload;
    },
    setTimeMode(state, action: PayloadAction<TimeModes>) {
      state.timeMode = action.payload;
    },
    setPieceColor(state, action: PayloadAction<string>) {
      state.pieceColor = action.payload;
    },
    setIsRating(state, action: PayloadAction<boolean>) {
      state.isRating = action.payload;
    },
    setLeftRating(state, action: PayloadAction<number>) {
      state.leftRating = action.payload;
    },
    setRightRating(state, action: PayloadAction<number>) {
      state.rightRating = action.payload;
    },
    setPremoves(state, action: PayloadAction<string[]>) {
      state.premoves = action.payload;
    },
  },
});

export const {
  setGameMode,
  setTimeMode,
  setIsRating,
  setLeftRating,
  setRightRating,
  setPieceColor,
  setGameId,
  setPremoves,
} = gameModeSlice.actions;

export default gameModeSlice.reducer;
