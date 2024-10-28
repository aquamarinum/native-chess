export type Game = {
  gameId: string;
  whitePlayerId: string;
  blackPlayerId: string;
  started: string;
  ended: string;
  timeControl: string;
  result: 'white-win' | 'draw' | 'black-win';
  moves: string;
};
