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
  public canMove(currentPos: CellPositionType, board: ChessBoard): void {
    if (board.getPositionAt({y: currentPos.y + 2, x: currentPos.x - 1}))
      board.checkPosition({y: currentPos.y + 2, x: currentPos.x - 1});

    if (board.getPositionAt({y: currentPos.y + 2, x: currentPos.x + 1}))
      board.checkPosition({y: currentPos.y + 2, x: currentPos.x + 1});

    if (board.getPositionAt({y: currentPos.y - 2, x: currentPos.x - 1}))
      board.checkPosition({y: currentPos.y - 2, x: currentPos.x - 1});

    if (board.getPositionAt({y: currentPos.y - 2, x: currentPos.x + 1}))
      board.checkPosition({y: currentPos.y - 2, x: currentPos.x + 1});

    if (board.getPositionAt({y: currentPos.y + 1, x: currentPos.x - 2}))
      board.checkPosition({y: currentPos.y + 1, x: currentPos.x - 2});

    if (board.getPositionAt({y: currentPos.y + 1, x: currentPos.x + 2}))
      board.checkPosition({y: currentPos.y + 1, x: currentPos.x + 2});

    if (board.getPositionAt({y: currentPos.y - 1, x: currentPos.x - 2}))
      board.checkPosition({y: currentPos.y - 1, x: currentPos.x - 2});

    if (board.getPositionAt({y: currentPos.y - 1, x: currentPos.x + 2}))
      board.checkPosition({y: currentPos.y - 1, x: currentPos.x + 2});
  }
}
