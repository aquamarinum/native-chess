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
    if (this.color === ChessColors.WHITE) {
      //LONG JUMP
      if (
        currentPos.y === 6 &&
        !board.getPositionAt({y: currentPos.y - 1, x: currentPos.x}).piece &&
        !board.getPositionAt({y: currentPos.y - 2, x: currentPos.x}).piece
      ) {
        board.checkPosition({y: currentPos.y - 2, x: currentPos.x});
      }
      //DEFAULT JUMP
      if (
        currentPos.y - 1 >= 0 &&
        !board.getPositionAt({y: currentPos.y - 1, x: currentPos.x}).piece
      ) {
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x});
      }

      //CAPTURE LEFT
      const captureLeft: CellPositionType = {
        y: currentPos.y - 1,
        x: currentPos.x - 1,
      };
      if (captureLeft.y >= 0 && captureLeft.x >= 0) {
        if (
          board.getPositionAt(captureLeft).piece &&
          this.color !==
            (board.getPositionAt(captureLeft).piece as ChessPiece).color
        )
          board.checkPosition(captureLeft);
      }
      //CAPTURE RIGHT
      const captureRight: CellPositionType = {
        y: currentPos.y - 1,
        x: currentPos.x + 1,
      };
      if (captureRight.y >= 0 && captureRight.x < 8) {
        if (
          board.getPositionAt(captureRight).piece &&
          this.color !==
            (board.getPositionAt(captureRight).piece as ChessPiece).color
        )
          board.checkPosition(captureRight);
      }

      //EN PASSANT
    } else {
      //LONG JUMP
      if (
        currentPos.y === 1 &&
        !board.getPositionAt({y: currentPos.y + 1, x: currentPos.x}).piece &&
        !board.getPositionAt({y: currentPos.y + 2, x: currentPos.x}).piece
      ) {
        board.checkPosition({y: currentPos.y + 2, x: currentPos.x});
      }
      //DEFAULT JUMP
      if (
        currentPos.y + 1 < 8 &&
        !board.getPositionAt({y: currentPos.y + 1, x: currentPos.x}).piece
      ) {
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x});
      }

      //CAPTURE LEFT
      const captureLeft: CellPositionType = {
        y: currentPos.y + 1,
        x: currentPos.x - 1,
      };
      if (captureLeft.y < 8 && captureLeft.x >= 0) {
        if (
          board.getPositionAt(captureLeft).piece &&
          this.color !==
            (board.getPositionAt(captureLeft).piece as ChessPiece).color
        )
          board.checkPosition(captureLeft);
      }
      //CAPTURE RIGHT
      const captureRight: CellPositionType = {
        y: currentPos.y + 1,
        x: currentPos.x + 1,
      };
      if (captureRight.y < 8 && captureRight.x < 8) {
        if (
          board.getPositionAt(captureRight).piece &&
          this.color !==
            (board.getPositionAt(captureRight).piece as ChessPiece).color
        )
          board.checkPosition(captureRight);
      }
    }
  }
}
