import {TimeModes} from './TimeModes';

export type GameModeType = {
  gameId: string;
  timeMode: TimeModes;
  pieceColor: string;
  isRating: boolean;
  leftRating: number;
  rightRating: number;
};
