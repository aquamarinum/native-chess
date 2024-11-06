import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class King extends ChessPiece {
  constructor(color: ChessColors) {
    super(
      Figures.KING,
      color,
      color === ChessColors.BLACK
        ? ViewModels.KING_BLACK
        : ViewModels.KING_WHITE,
    );
  }
  public highlight(currentPos: CellPositionType, board: ChessBoard): void {
    if (currentPos.y > 0) {
      board.checkPosition({y: currentPos.y - 1, x: currentPos.x});
      if (currentPos.x > 0)
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x - 1});
      if (currentPos.x < 7)
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x + 1});
    }
    if (currentPos.y < 7) {
      board.checkPosition({y: currentPos.y + 1, x: currentPos.x});
      if (currentPos.x > 0)
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x - 1});
      if (currentPos.x < 7)
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x + 1});
    }
    if (currentPos.x > 0) {
      board.checkPosition({y: currentPos.y, x: currentPos.x - 1});
    }
    if (currentPos.x < 7) {
      board.checkPosition({y: currentPos.y, x: currentPos.x + 1});
    }
  }
}
