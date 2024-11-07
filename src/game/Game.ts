import {ChessBoard} from './ChessBoard';
import {Player} from './Player';

export class Game {
  private board: ChessBoard;
  private currentPlayer: Player;
  private players: Player[];

  constructor(player1: Player, player2: Player) {
    this.board = new ChessBoard(this);
    this.players = [player1, player2];
    this.currentPlayer = player1;
  }

  public switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];
  }

  //?TEMP
  public setCurrentPlayer(idx: number) {
    if (idx === 0 || idx === 1) this.currentPlayer = this.players[idx];
  }

  public getBoard() {
    return this.board;
  }

  public getCurrentPlayerColor() {
    return this.currentPlayer.color;
  }

  public getFirstPlayer() {
    return this.players[0];
  }

  public getSecondPlayer() {
    return this.players[1];
  }
}
