import {ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class King extends ChessPiece {
  public readonly type: Figures;

  constructor(_col: Colors) {
    super(_col);
    this.type = Figures.KING;
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
    return this.color === Colors.BLACK
      ? ViewModels.KING_BLACK
      : ViewModels.KING_WHITE;
  }

  getPossibleMoves(fromX: number, fromY: number, board: ChessBoard) {
    const moves: {x: number; y: number}[] = [];
    return moves;
  }
}
