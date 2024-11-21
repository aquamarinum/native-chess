import {PlayerType} from './PlayerType';
import {TimeModes} from './TimeModes';

export type GameModeType = {
  gameId: string;
  timeMode: TimeModes;
  speed: string;
  pieceColor: string;
  isRating: boolean;
  minRating: number;
  maxRating: number;
  playerWhite: PlayerType;
  playerBlack: PlayerType;
  premoves: Array<string>;
  initialClock: number;
};
