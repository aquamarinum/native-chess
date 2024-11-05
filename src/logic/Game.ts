import {ChessBoard} from './ChessBoard';
import {Player} from './Player';

export class Game {
  private board: ChessBoard;
  private currentPlayer: Player;
  private players: Player[];

  constructor(player1: Player, player2: Player) {
    this.board = new ChessBoard();
    this.players = [player1, player2];
    this.currentPlayer = player1;
  }

  private switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];
  }

  public getBoard() {
    return this.board.board;
  }

  public makeMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (this.board.movePiece(fromX, fromY, toX, toY)) {
      this.switchPlayer();
    } else {
      console.log('invalid move');
    }
  }
}
