import {ChessPiece} from './ChessPiece';
import {Bishop} from './pieces/Bishop';
import {King} from './pieces/King';
import {Knight} from './pieces/Knight';
import {Pawn} from './pieces/Pawn';
import {Queen} from './pieces/Queen';
import {Rook} from './pieces/Rook';
import {Game} from './Game';
import {ChessColors} from './models/ChessColors';
import {ChessCell} from './ChessCell';
import {CellStates} from './models/CellStates';
import {Figures} from './models/Figures';

export type CellPositionType = {
  y: number;
  x: number;
};

export class ChessBoard {
  cells: Array<Array<ChessCell>>;
  gameRef: Game;
  whiteKingPos: CellPositionType;
  blackKingPos: CellPositionType;

  constructor(ref: Game) {
    this.gameRef = ref;
    this.cells = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        row.push(new ChessCell(this, {y: i, x: j}, null));
      }
      this.cells.push(row);
    }
    this.init();
    this.whiteKingPos = {y: 7, x: 4};
    this.blackKingPos = {y: 0, x: 4};
  }

  getPositionAt(pos: CellPositionType) {
    return this.cells[pos.y][pos.x];
  }

  setCellState(pos: CellPositionType, state: CellStates) {
    this.cells[pos.y][pos.x].state = state;
  }

  setCellPiece(pos: CellPositionType, piece: ChessPiece) {
    this.cells[pos.y][pos.x].piece = piece;
  }

  public init() {
    this.cells[0][0].piece = new Rook(ChessColors.BLACK);
    this.cells[0][7].piece = new Rook(ChessColors.BLACK);
    this.cells[7][0].piece = new Rook(ChessColors.WHITE);
    this.cells[7][7].piece = new Rook(ChessColors.WHITE);

    this.cells[0][1].piece = new Knight(ChessColors.BLACK);
    this.cells[0][6].piece = new Knight(ChessColors.BLACK);
    this.cells[7][1].piece = new Knight(ChessColors.WHITE);
    this.cells[7][6].piece = new Knight(ChessColors.WHITE);

    this.cells[0][2].piece = new Bishop(ChessColors.BLACK);
    this.cells[0][5].piece = new Bishop(ChessColors.BLACK);
    this.cells[7][2].piece = new Bishop(ChessColors.WHITE);
    this.cells[7][5].piece = new Bishop(ChessColors.WHITE);

    this.cells[0][3].piece = new Queen(ChessColors.BLACK);
    this.cells[7][3].piece = new Queen(ChessColors.WHITE);

    this.cells[0][4].piece = new King(ChessColors.BLACK);
    this.cells[7][4].piece = new King(ChessColors.WHITE);

    for (let i = 0; i < 8; i++) {
      this.cells[1][i].piece = new Pawn(ChessColors.BLACK);
    }
    for (let i = 0; i < 8; i++) {
      this.cells[6][i].piece = new Pawn(ChessColors.WHITE);
    }
  }

  public doCastleShort(pos: CellPositionType) {
    this.cells[pos.y][5].piece = this.cells[pos.y][7].piece;
    this.cells[pos.y][7].piece = null;
  }

  public doCastleLong(pos: CellPositionType) {
    this.cells[pos.y][3].piece = this.cells[pos.y][0].piece;
    this.cells[pos.y][0].piece = null;
  }

  public moveFigure(from: ChessCell, to: ChessCell): boolean {
    if (to.state === CellStates.AVAILABLE || to.state === CellStates.OCCUPIED) {
      to.piece = from.piece;
      from.piece = null;

      // IF PAWN
      if (
        to.piece &&
        to.piece.title === Figures.PAWN &&
        (to.position.y === 0 || to.position.y === 7)
      ) {
        this.transformPawn(to.position, to.piece.color);
      }

      // IF KING
      if (to.piece?.title === Figures.KING) {
        if (from.position.x - to.position.x === -2) {
          this.doCastleShort(to.position);
        }
        if (from.position.x - to.position.x === 2) {
          this.doCastleLong(to.position);
        }

        (this.getPositionAt(to.position).piece as King).abortCastling();

        if (
          (this.getPositionAt(to.position).piece as ChessPiece).color ===
          ChessColors.WHITE
        )
          this.whiteKingPos = to.position;
        else this.blackKingPos = to.position;
      }

      //IF ROOK
      if (to.piece?.title === Figures.ROOK) {
        if (from.position.x === 0 && to.piece.color === ChessColors.BLACK) {
          (
            this.getPositionAt(this.blackKingPos).piece as King
          ).abortLongCastle();
        }

        if (from.position.x === 7) {
          (
            this.getPositionAt(this.blackKingPos).piece as King
          ).abortShortCastle();
        }
      }
      if (to.piece?.title === Figures.ROOK) {
        if (from.position.x === 0 && to.piece.color === ChessColors.WHITE) {
          (
            this.getPositionAt(this.whiteKingPos).piece as King
          ).abortLongCastle();
        }

        if (from.position.x === 7) {
          (
            this.getPositionAt(this.whiteKingPos).piece as King
          ).abortShortCastle();
        }
      }
      //this.gameRef.switchPlayer();
    }
    this.clearHighlighting();
    return true;
  }

  public clearHighlighting() {
    this.cells.forEach(row =>
      row.forEach(cell => (cell.state = CellStates.DEFAULT)),
    );
  }

  public checkPosition(pos: CellPositionType) {
    if (!this.getPositionAt(pos).piece) {
      this.setCellState(pos, CellStates.AVAILABLE);
      return true;
    } else {
      if (
        (this.getPositionAt(pos).piece as ChessPiece).color !==
        this.gameRef.getCurrentPlayerColor()
      ) {
        this.setCellState(pos, CellStates.OCCUPIED);
      }
      return false;
    }
  }

  public checkForCastling(
    pos: CellPositionType,
    short: boolean,
    long: boolean,
  ) {
    if (short) {
      //TODO if(CHECK FOR CHECKMATE +1 & +2 TRUE ? ... : ...)
      if (
        !this.cells[pos.y][pos.x + 1].piece &&
        !this.cells[pos.y][pos.x + 2].piece
      ) {
        this.setCellState({y: pos.y, x: pos.x + 2}, CellStates.AVAILABLE);
      }
    }
    //TODO SAME AS UPPER
    if (long) {
      if (
        !this.cells[pos.y][pos.x - 1].piece &&
        !this.cells[pos.y][pos.x - 2].piece &&
        !this.cells[pos.y][pos.x - 3].piece
      ) {
        this.setCellState({y: pos.y, x: pos.x - 2}, CellStates.AVAILABLE);
      }
    }
  }

  public transformPawn(pos: CellPositionType, color: ChessColors) {
    this.cells[pos.y][pos.x].piece = new Queen(color);
  }
}
