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
  public canMove(currentPos: CellPositionType, board: ChessBoard): void {
    //VERTICAL TO TOP
    const newPosition: CellPositionType = {
      y: currentPos.y - 1,
      x: currentPos.x,
    };

    while (board.getPositionAt(newPosition)) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.y--;
    }
    //VERTICAL TO BOTTOM
    newPosition.y = currentPos.y + 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.y++;
    }
    //HORIZONTAL TO LEFT
    newPosition.y = currentPos.y;
    newPosition.x = currentPos.x - 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.x--;
    }
    //HORIZONTAL TO RIGHT
    newPosition.x = currentPos.x + 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.x++;
    }
  }
}
