import {ChessBoard} from './ChessBoard';
import {ChessColors} from './models/ChessColors';
import {Player} from './Player';

export class Game {
  private board: ChessBoard;
  private players: Player[];

  constructor(playerWhite: Player, playerBlack: Player) {
    this.board = new ChessBoard();
    this.players = [playerWhite, playerBlack];
  }

  public getBoard() {
    return this.board;
  }

  public getFirstPlayer() {
    return this.players[0];
  }

  public getSecondPlayer() {
    return this.players[1];
  }
}
