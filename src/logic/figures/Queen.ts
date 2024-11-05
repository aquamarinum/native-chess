import {ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class Queen extends ChessPiece {
  public readonly type: Figures;

  constructor(_col: ChessColors) {
    super(_col);
    this.type = Figures.QUEEN;
  }

  isMoveValid(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    board: ChessBoard,
  ) {
    return true;
  }

  getViewModel() {
    return this.color === ChessColors.BLACK
      ? ViewModels.QUEEN_BLACK
      : ViewModels.QUEEN_WHITE;
  }

  getPossibleMoves(fromX: number, fromY: number, board: ChessBoard) {
    const moves: {x: number; y: number}[] = [];
    return moves;
  }
}
