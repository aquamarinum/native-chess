import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
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

  public highlight(currentPos: CellPositionType, board: ChessBoard): void {
    if (currentPos.y > 0) {
      board.checkPosition({y: currentPos.y - 1, x: currentPos.x});
      if (currentPos.x > 0)
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x - 1});
      if (currentPos.x < 7)
        board.checkPosition({y: currentPos.y - 1, x: currentPos.x + 1});
    }
    if (currentPos.y < 7) {
      board.checkPosition({y: currentPos.y + 1, x: currentPos.x});
      if (currentPos.x > 0)
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x - 1});
      if (currentPos.x < 7)
        board.checkPosition({y: currentPos.y + 1, x: currentPos.x + 1});
    }
    if (currentPos.x > 0) {
      board.checkPosition({y: currentPos.y, x: currentPos.x - 1});
    }
    if (currentPos.x < 7) {
      board.checkPosition({y: currentPos.y, x: currentPos.x + 1});
    }
    //CASTLE
    board.checkForCastling(
      currentPos,
      this.canKingCastleShort,
      this.canKingCastleLong,
    );
  }
}
