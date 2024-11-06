import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class Queen extends ChessPiece {
  constructor(color: ChessColors) {
    super(
      Figures.QUEEN,
      color,
      color === ChessColors.BLACK
        ? ViewModels.QUEEN_BLACK
        : ViewModels.QUEEN_WHITE,
    );
  }
  public highlight(currentPos: CellPositionType, matrix: ChessBoard): void {
    //HIGHLIGHT LIKE QUEEN
  }
}
