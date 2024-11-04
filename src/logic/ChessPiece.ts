import {ChessBoard} from './ChessBoard';
import {Colors} from './models/Colors';
import {ViewModels} from './models/ViewModels';

export abstract class ChessPiece {
  public readonly color: Colors;
  constructor(_color: Colors) {
    this.color = _color;
  }
  abstract isMoveValid(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    board: ChessBoard,
  ): boolean;
  abstract getPossibleMoves(
    fromX: number,
    fromY: number,
    board: ChessBoard,
  ): {x: number; y: number}[];
  abstract getViewModel(): ViewModels;
}
