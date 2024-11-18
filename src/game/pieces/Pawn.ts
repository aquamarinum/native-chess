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
  onmove(
    from: CellPositionType,
    to: CellPositionType,
    board: ChessBoard,
  ): void {
    // TAKE EN PASSANT PAWN
    if (to.y === board.enpassant?.y && to.x === board.enpassant.x) {
      if (to.y === 2) {
        board.capturePiece({y: 3, x: to.x});
      }
      if (to.y === 5) {
        board.capturePiece({y: 4, x: to.x});
      }
      //! RECORD TO PGN
      return;
    }

    // SET EN PASSANT PAWN
    if (
      to.y - from.y === 2 &&
      (board.isPieceThreatens({y: to.y, x: to.x - 1}, Figures.PAWN) ||
        board.isPieceThreatens({y: to.y, x: to.x + 1}, Figures.PAWN))
    ) {
      board.setEnPassant({
        y: 2,
        x: to.x,
      });
    }
    if (
      to.y - from.y === -2 &&
      (board.isPieceThreatens({y: to.y, x: to.x - 1}, Figures.PAWN) ||
        board.isPieceThreatens({y: to.y, x: to.x + 1}, Figures.PAWN))
    ) {
      board.setEnPassant({
        y: 5,
        x: to.x,
      });
    }

    // TRANSFORMATION
    if (to.y === 0 && this.color === ChessColors.WHITE) {
      if (board.getPositionAt(to)?.state === CellStates.OCCUPIED) {
        //! WRITE TO PGN
      } else {
        //! WRITE TO PGN
      }
      board.setPieceAt(to, new Queen(ChessColors.WHITE));
      return;
    }
    if (to.y === 7 && this.color === ChessColors.BLACK) {
      if (board.getPositionAt(to)?.state === CellStates.OCCUPIED) {
        //! WRITE TO PGN
      } else {
        //! WRITE TO PGN
      }
      board.setPieceAt(to, new Queen(ChessColors.BLACK));
      return;
    }

    // DEFAULT MOVEMENT
    if (board.getPositionAt(to)?.state === CellStates.OCCUPIED) {
      //! WRITE TO PGN
    } else {
      //! WRITE TO PGN
    }
  }
}
