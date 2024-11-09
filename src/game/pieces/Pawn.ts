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
  public canMove(currentPos: CellPositionType, board: ChessBoard): void {
    if (this.color === ChessColors.WHITE) {
      //LONG JUMP
      if (
        currentPos.y === 6 &&
        !board.getPieceAt({y: currentPos.y - 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y - 2, x: currentPos.x})
      ) {
        board.checkPosition({y: currentPos.y - 2, x: currentPos.x});
      }
      //DEFAULT JUMP
      if (
        board.getPositionAt({y: currentPos.y - 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y - 1, x: currentPos.x})
      ) {
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x});
      }

      //CAPTURE LEFT
      const captureLeft: CellPositionType = {
        y: currentPos.y - 1,
        x: currentPos.x - 1,
      };
      if (
        board.getPositionAt(captureLeft) &&
        board.getPieceAt(captureLeft) &&
        this.color !== (board.getPieceAt(captureLeft) as ChessPiece).color
      ) {
        board.checkPosition(captureLeft);
      }
      //CAPTURE RIGHT
      const captureRight: CellPositionType = {
        y: currentPos.y - 1,
        x: currentPos.x + 1,
      };
      if (
        board.getPositionAt(captureRight) &&
        board.getPieceAt(captureRight) &&
        this.color !== (board.getPieceAt(captureRight) as ChessPiece).color
      ) {
        board.checkPosition(captureRight);
      }

      //EN PASSANT
      //TODO
    } else {
      //LONG JUMP
      if (
        currentPos.y === 1 &&
        !board.getPieceAt({y: currentPos.y + 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y + 2, x: currentPos.x})
      ) {
        board.checkPosition({y: currentPos.y + 2, x: currentPos.x});
      }
      //DEFAULT JUMP
      if (
        board.getPositionAt({y: currentPos.y + 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y + 1, x: currentPos.x})
      ) {
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x});
      }

      //CAPTURE LEFT
      const captureLeft: CellPositionType = {
        y: currentPos.y + 1,
        x: currentPos.x - 1,
      };
      if (
        board.getPositionAt(captureLeft) &&
        board.getPieceAt(captureLeft) &&
        this.color !== (board.getPieceAt(captureLeft) as ChessPiece).color
      ) {
        board.checkPosition(captureLeft);
      }
      //CAPTURE RIGHT
      const captureRight: CellPositionType = {
        y: currentPos.y + 1,
        x: currentPos.x + 1,
      };
      if (
        board.getPositionAt(captureRight) &&
        board.getPieceAt(captureRight) &&
        this.color !== (board.getPieceAt(captureRight) as ChessPiece).color
      ) {
        board.checkPosition(captureRight);
      }
    }
  }
}
