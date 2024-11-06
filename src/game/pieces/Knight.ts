import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class Knight extends ChessPiece {
  constructor(color: ChessColors) {
    super(
      Figures.KNIGHT,
      color,
      color === ChessColors.BLACK
        ? ViewModels.KNIGHT_BLACK
        : ViewModels.KNIGHT_WHITE,
    );
  }
  public highlight(currentPos: CellPositionType, matrix: ChessBoard): void {
    //HIGHLIGHT LIKE KNIGHT
  }
}
