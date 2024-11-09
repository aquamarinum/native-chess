import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {CellStates} from '../models/CellStates';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class King extends ChessPiece {
  public canKingCastleShort: boolean;
  public canKingCastleLong: boolean;
  constructor(color: ChessColors) {
    super(
      Figures.KING,
      color,
      color === ChessColors.BLACK
        ? ViewModels.KING_BLACK
        : ViewModels.KING_WHITE,
    );
    this.canKingCastleShort = true;
    this.canKingCastleLong = true;
  }

  public abortShortCastle() {
    this.canKingCastleShort = false;
  }

  public abortLongCastle() {
    this.canKingCastleLong = false;
  }

  public abortCastling() {
    this.canKingCastleShort = false;
    this.canKingCastleLong = false;
  }

  public canMove(currentPos: CellPositionType, board: ChessBoard): void {
    // TOP ROW
    if (board.getPositionAt({y: currentPos.y + 1, x: currentPos.x - 1}))
      board.checkPosition({y: currentPos.y + 1, x: currentPos.x - 1});

    if (board.getPositionAt({y: currentPos.y + 1, x: currentPos.x}))
      board.checkPosition({y: currentPos.y + 1, x: currentPos.x});

    if (board.getPositionAt({y: currentPos.y + 1, x: currentPos.x + 1}))
      board.checkPosition({y: currentPos.y + 1, x: currentPos.x + 1});

    // MID ROW
    if (board.getPositionAt({y: currentPos.y, x: currentPos.x - 1}))
      board.checkPosition({y: currentPos.y, x: currentPos.x - 1});

    if (board.getPositionAt({y: currentPos.y, x: currentPos.x + 1}))
      board.checkPosition({y: currentPos.y, x: currentPos.x + 1});

    // BOTTOM ROW
    if (board.getPositionAt({y: currentPos.y - 1, x: currentPos.x - 1}))
      board.checkPosition({y: currentPos.y - 1, x: currentPos.x - 1});

    if (board.getPositionAt({y: currentPos.y - 1, x: currentPos.x}))
      board.checkPosition({y: currentPos.y - 1, x: currentPos.x});

    if (board.getPositionAt({y: currentPos.y - 1, x: currentPos.x + 1}))
      board.checkPosition({y: currentPos.y - 1, x: currentPos.x + 1});

    //CASTLE
    // O-O
    if (
      this.canKingCastleShort &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x + 1}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x + 2})
    )
      board.setCellState(
        {y: currentPos.y, x: currentPos.x + 2},
        CellStates.AVAILABLE,
      );
    // O-O-O
    if (
      this.canKingCastleShort &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 1}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 2}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 3})
    )
      board.setCellState(
        {y: currentPos.y, x: currentPos.x - 2},
        CellStates.AVAILABLE,
      );
  }
}
