import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {CellStates} from '../models/CellStates';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';
import {Queen} from './Queen';

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
      //DEFAULT JUMP
      if (
        board.getPositionAt({y: currentPos.y - 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y - 1, x: currentPos.x})
      ) {
        if (currentPos.y - 1 === 0)
          board.setCellState(
            {y: currentPos.y - 1, x: currentPos.x},
            CellStates.SPECIAL,
          );
        else board.highlight({y: currentPos.y - 1, x: currentPos.x});
      }
      //LONG JUMP
      if (
        currentPos.y === 6 &&
        !board.getPieceAt({y: currentPos.y - 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y - 2, x: currentPos.x})
      ) {
        board.highlight({y: currentPos.y - 2, x: currentPos.x});
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
        board.highlight(captureLeft);
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
        board.highlight(captureRight);
      }

      //EN PASSANT
      if (
        captureLeft.y === board.enpassant?.y &&
        captureLeft.x === board.enpassant.x
      ) {
        board.setCellState(captureLeft, CellStates.OCCUPIED);
      }
      if (
        captureRight.y === board.enpassant?.y &&
        captureRight.x === board.enpassant.x
      ) {
        board.setCellState(captureRight, CellStates.OCCUPIED);
      }
    } else {
      //DEFAULT JUMP
      if (
        board.getPositionAt({y: currentPos.y + 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y + 1, x: currentPos.x})
      ) {
        if (currentPos.y + 1 === 7)
          board.setCellState(
            {y: currentPos.y + 1, x: currentPos.x},
            CellStates.SPECIAL,
          );
        else board.highlight({y: currentPos.y + 1, x: currentPos.x});
      }
      //LONG JUMP
      if (
        currentPos.y === 1 &&
        !board.getPieceAt({y: currentPos.y + 1, x: currentPos.x}) &&
        !board.getPieceAt({y: currentPos.y + 2, x: currentPos.x})
      ) {
        board.highlight({y: currentPos.y + 2, x: currentPos.x});
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
        board.highlight(captureLeft);
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
        board.highlight(captureRight);
      }
      //EN PASSANT FOR BLACK
      if (
        captureLeft.y === board.enpassant?.y &&
        captureLeft.x === board.enpassant.x
      ) {
        board.setCellState(captureLeft, CellStates.OCCUPIED);
      }
      if (
        captureRight.y === board.enpassant?.y &&
        captureRight.x === board.enpassant.x
      ) {
        board.setCellState(captureRight, CellStates.OCCUPIED);
      }
    }
  }

  move(board: ChessBoard, target: CellPositionType): void {
    const from = board.activePosition as CellPositionType;

    if (target.y === board.enpassant?.y && target.x === board.enpassant.x) {
      if (target.y === 2) {
        board.capturePiece({y: 3, x: target.x});
      }
      if (target.y === 5) {
        board.capturePiece({y: 4, x: target.x});
      }
    }

    // EN PASSANT BLACK
    if (
      target.y - from.y === 2 &&
      (board.isPieceThreatens({y: target.y, x: target.x - 1}, Figures.PAWN) ||
        board.isPieceThreatens({y: target.y, x: target.x + 1}, Figures.PAWN))
    ) {
      board.setEnPassant({
        y: 2,
        x: target.x,
      });
    }
    // EN PASSANT WHITE
    if (
      target.y - from.y === -2 &&
      (board.isPieceThreatens({y: target.y, x: target.x - 1}, Figures.PAWN) ||
        board.isPieceThreatens({y: target.y, x: target.x + 1}, Figures.PAWN))
    ) {
      board.setEnPassant({
        y: 5,
        x: target.x,
      });
    }

    if (board.getPositionAt(target)?.state === CellStates.OCCUPIED) {
      board.capturePiece(target);
    }

    board.movePiece(board.activePosition as CellPositionType, target);

    if (target.y === 0 && this.color === ChessColors.WHITE) {
      board.setPieceAt(target, new Queen(ChessColors.WHITE));
    }
    if (target.y === 7 && this.color === ChessColors.BLACK) {
      board.setPieceAt(target, new Queen(ChessColors.BLACK));
    }
  }
}
