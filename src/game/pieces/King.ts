import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessCell} from '../ChessCell';
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
    board.isCellSafe({y: currentPos.y + 1, x: currentPos.x - 1});
    board.isCellSafe({y: currentPos.y + 1, x: currentPos.x});
    board.isCellSafe({y: currentPos.y + 1, x: currentPos.x + 1});

    board.isCellSafe({y: currentPos.y, x: currentPos.x - 1});
    board.isCellSafe({y: currentPos.y, x: currentPos.x + 1});

    board.isCellSafe({y: currentPos.y - 1, x: currentPos.x - 1});
    board.isCellSafe({y: currentPos.y - 1, x: currentPos.x});
    board.isCellSafe({y: currentPos.y - 1, x: currentPos.x + 1});

    //CASTLE
    // O-O
    if (
      this.canKingCastleShort &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x + 1}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x + 1}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x + 2}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x + 2})
    )
      board.setCellState(
        {y: currentPos.y, x: currentPos.x + 2},
        CellStates.AVAILABLE,
      );
    // O-O-O
    if (
      this.canKingCastleLong &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 1}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x - 1}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 2}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x - 2}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 3}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x - 3})
    )
      board.setCellState(
        {y: currentPos.y, x: currentPos.x - 2},
        CellStates.AVAILABLE,
      );
  }
}
