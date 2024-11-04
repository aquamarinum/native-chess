import {ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Models} from '../models/Models';

export class Bishop extends ChessPiece {
  public readonly type: Figures;

  constructor(_col: Colors) {
    super(_col);
    this.type = Figures.BISHOP;
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

  getModel() {
    return this.color === Colors.BLACK
      ? Models.BISHOP_BLACK
      : Models.BISHOP_WHITE;
  }

  getPossibleMoves(fromX: number, fromY: number, board: ChessBoard) {
    const moves: {x: number; y: number}[] = [];
    return moves;
  }
}
