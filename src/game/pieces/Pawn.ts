import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class Pawn extends ChessPiece {
  constructor(color: ChessColors) {
    super(
      Figures.PAWN,
      color,
      color === ChessColors.BLACK
        ? ViewModels.PAWN_BLACK
        : ViewModels.PAWN_WHITE,
    );
  }
  public highlight(currentPos: CellPositionType, matrix: ChessBoard): void {
    //HIGHLIGHT LIKE PAWN
  }
}
