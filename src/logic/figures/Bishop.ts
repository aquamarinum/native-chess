import {ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';

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
  ): boolean {
    return true;
  }

  getPossibleMoves(
    fromX: number,
    fromY: number,
    board: ChessBoard,
  ): {x: number; y: number}[] {
    const moves: {x: number; y: number}[] = [];
    return moves;
  }
}
