import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameModeType} from '../../types/GameModeType';
import {TimeModes} from '../../types/TimeModes';
import {PlayerType} from '../../types/PlayerType';

const initialState: GameModeType = {
  gameId: 'null',
  timeMode: TimeModes.RAPID1,
  pieceColor: 'random',
  isRating: true,
  minRating: 300,
  maxRating: 300,
  playerBlack: {
    name: 'Anonymous',
    rating: undefined,
  },
  playerWhite: {
    name: 'Anonymous',
    rating: undefined,
  },
  premoves: [],
  speed: 'correspond',
  initialClock: 0,
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
    setMinRating(state, action: PayloadAction<number>) {
      state.minRating = action.payload;
    },
    setMaxRating(state, action: PayloadAction<number>) {
      state.maxRating = action.payload;
    },
    setPremoves(state, action: PayloadAction<string[]>) {
      state.premoves = action.payload;
    },
    setWhitePlayer(state, action: PayloadAction<PlayerType>) {
      state.playerWhite = action.payload;
    },
    setBlackPlayer(state, action: PayloadAction<PlayerType>) {
      state.playerBlack = action.payload;
    },
    setGameSpeed(state, action: PayloadAction<string>) {
      state.speed = action.payload;
    },
  },
});

export const {
  setGameMode,
  setTimeMode,
  setIsRating,
  setMinRating,
  setMaxRating,
  setPieceColor,
  setGameId,
  setPremoves,
  setWhitePlayer,
  setBlackPlayer,
  setGameSpeed,
} = gameModeSlice.actions;

export default gameModeSlice.reducer;
