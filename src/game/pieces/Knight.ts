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
  public highlight(currentPos: CellPositionType, board: ChessBoard): void {
    if (currentPos.y > 1) {
      if (currentPos.x > 0)
        board.checkPosition({y: currentPos.y - 2, x: currentPos.x - 1});
      if (currentPos.x < 7)
        board.checkPosition({y: currentPos.y - 2, x: currentPos.x + 1});
    }
    if (currentPos.y > 0) {
      if (currentPos.x > 1)
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x - 2});
      if (currentPos.x < 6)
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x + 2});
    }
    if (currentPos.y < 6) {
      if (currentPos.x > 0)
        board.checkPosition({y: currentPos.y + 2, x: currentPos.x - 1});
      if (currentPos.x < 7)
        board.checkPosition({y: currentPos.y + 2, x: currentPos.x + 1});
    }
    if (currentPos.y < 7) {
      if (currentPos.x > 1)
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x - 2});
      if (currentPos.x < 6)
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x + 2});
    }
  }
}
