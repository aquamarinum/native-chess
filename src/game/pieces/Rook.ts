import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class Rook extends ChessPiece {
  constructor(color: ChessColors) {
    super(
      Figures.ROOK,
      color,
      color === ChessColors.BLACK
        ? ViewModels.ROOK_BLACK
        : ViewModels.ROOK_WHITE,
    );
  }
  public highlight(currentPos: CellPositionType, matrix: ChessBoard): void {
    //HIGHLIGHT LIKE ROOK
  }
}
