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

  move(board: ChessBoard, target: CellPositionType): void {
    const from = board.activePosition as CellPositionType;

    // NEW POSITION AFTER MOVE
    if (this.color === ChessColors.WHITE) {
      board.whiteKingPos = target;
    } else {
      board.blackKingPos = target;
    }
    this.banAllCastling();

    // CASTLE
    if (from.x - target.x === -2) {
      board.movePiece({y: target.y, x: 7}, {y: target.y, x: 5});
      board.moves.recordMoveSpecial('O-O');
      return;
    }
    if (from.x - target.x === 2) {
      board.movePiece({y: target.y, x: 0}, {y: target.y, x: 3});
      board.moves.recordMoveSpecial('O-O-O');
      return;
    }

    if (board.getPositionAt(target)?.state === CellStates.OCCUPIED) {
      board.capturePiece(target);
    } else {
    }

    board.movePiece(board.activePosition as CellPositionType, target);

    // BAN ALL CASTLE AFTER MOVE

    if (this.color === ChessColors.WHITE) {
      board.moves.recordMove('K', target);
    } else {
      board.moves.recordMove('K', target).next();
    }
  }
}
