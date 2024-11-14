import {TimeModes} from './TimeModes';

export type GameModeType = {
  timeMode: TimeModes;
  pieceColor: string;
  isRating: boolean;
  leftRating: number;
  rightRating: number;
};
