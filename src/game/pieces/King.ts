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

  public banShortCastle() {
    this.canKingCastleShort = false;
  }

  public banLongCastle() {
    this.canKingCastleLong = false;
  }

  public banAllCastling() {
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
      !board.isCellDefended({y: currentPos.y, x: currentPos.x + 2}) &&
      board.getPieceAt({y: currentPos.y, x: currentPos.x + 3})?.type ===
        Figures.ROOK &&
      board.getPieceAt({y: currentPos.y, x: currentPos.x + 3})?.color ===
        this.color
    )
      board.setCellState(
        {y: currentPos.y, x: currentPos.x + 2},
        CellStates.SPECIAL,
      );
    // O-O-O
    if (
      this.canKingCastleLong &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 1}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x - 1}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 2}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x - 2}) &&
      !board.getPieceAt({y: currentPos.y, x: currentPos.x - 3}) &&
      !board.isCellDefended({y: currentPos.y, x: currentPos.x - 3}) &&
      board.getPieceAt({y: currentPos.y, x: currentPos.x - 4})?.type ===
        Figures.ROOK &&
      board.getPieceAt({y: currentPos.y, x: currentPos.x - 4})?.color ===
        this.color
    )
      board.setCellState(
        {y: currentPos.y, x: currentPos.x - 2},
        CellStates.SPECIAL,
      );
  }

  onmove(
    from: CellPositionType,
    to: CellPositionType,
    board: ChessBoard,
  ): void {
    // NEW POSITION AFTER MOVE
    if (this.color === ChessColors.WHITE) {
      board.whiteKingPos = to;
    } else {
      board.blackKingPos = to;
    }
    this.banAllCastling();

    // CASTLE
    if (from.x - to.x === -2) {
      board.movePiece({y: to.y, x: 7}, {y: to.y, x: 5});
      //! WRITE TO PGN
      return;
    }
    if (from.x - to.x === 2) {
      board.movePiece({y: to.y, x: 0}, {y: to.y, x: 3});
      //! WRITE TO PGN
      return;
    }

    if (board.getPositionAt(to)?.state === CellStates.OCCUPIED) {
      //! WRITE TO PGN
    } else {
      //! WRITE TO PGN
    }
  }
}
