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
  public highlight(currentPos: CellPositionType, board: ChessBoard): void {
    ///FOR WHITE
    if (this.color === ChessColors.WHITE) {
      const newPosition = currentPos;

      //LONG JUMP
      if (currentPos.y === 6) {
        board.checkPosition({y: currentPos.y - 2, x: currentPos.x});
      }

      //DEFAULT JUMP
      newPosition.y--;
      if (newPosition.y >= 0) {
        board.checkPosition(newPosition);

        //CAPTURE LEFT
        newPosition.x--;
        if (
          newPosition.x >= 0 &&
          board.getPositionAt(newPosition).piece?.color !== this.color
        )
          board.checkPosition(newPosition);

        //CAPTURE RIGHT
        newPosition.x += 2;
        if (
          newPosition.x < 8 &&
          board.getPositionAt(newPosition).piece?.color !== this.color
        )
          board.checkPosition(newPosition);
      }

      //EN PASSANT
      //QUEEN TRANSFORMING
    }

    ///FOR BLACK
    else {
      const newPosition = currentPos;

      //LONG JUMP
      if (currentPos.y === 1) {
        board.checkPosition({y: currentPos.y + 2, x: currentPos.x});
      }

      //DEFAULT JUMP
      newPosition.y++;
      if (newPosition.y < 8) {
        board.checkPosition(newPosition);

        //CAPTURE LEFT
        newPosition.x--;
        if (
          newPosition.x >= 0 &&
          board.getPositionAt(newPosition).piece?.color !== this.color
        )
          board.checkPosition(newPosition);

        //CAPTURE RIGHT
        newPosition.x += 2;
        if (
          newPosition.x < 8 &&
          board.getPositionAt(newPosition).piece?.color !== this.color
        )
          board.checkPosition(newPosition);
      }

      //EN PASSANT
      //QUEEN TRANSFORMING
    }
  }
}
