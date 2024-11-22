import {ChessPiece} from './ChessPiece';
import {Bishop} from './pieces/Bishop';
import {King} from './pieces/King';
import {Knight} from './pieces/Knight';
import {Pawn} from './pieces/Pawn';
import {Queen} from './pieces/Queen';
import {Rook} from './pieces/Rook';
import {ChessColors} from './models/ChessColors';
import {ChessCell} from './ChessCell';
import {CellStates} from './models/CellStates';
import {Figures} from './models/Figures';
import {MovesAggregator} from './MovesAggregator';

export type CellPositionType = {
  y: number;
  x: number;
};

export class ChessBoard {
  cells: Array<Array<ChessCell>>;
  activePlayerColor: ChessColors;
  converter: MovesAggregator;

  whiteKingPos: CellPositionType;
  isWhiteKingCheched: boolean;
  blackKingPos: CellPositionType;
  isBlackKingChecked: boolean;

  enpassant: CellPositionType | null;
  capturedWhite: Array<ChessPiece>;
  capturedBlack: Array<ChessPiece>;

  constructor() {
    this.cells = [];
    this.activePlayerColor = ChessColors.WHITE;
    this.converter = new MovesAggregator();

    this.whiteKingPos = {y: 7, x: 4};
    this.isWhiteKingCheched = false;
    this.blackKingPos = {y: 0, x: 4};
    this.isBlackKingChecked = false;

    this.enpassant = null;
    this.capturedWhite = [];
    this.capturedBlack = [];

    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        row.push(new ChessCell(this, {y: i, x: j}, null));
      }
      this.cells.push(row);
    }
    this.init();
  }

  init() {
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

    // SET EMPTY OTHERS
    for (let i = 0; i < 8; i++) {
      this.cells[2][i].piece = null;
    }
    for (let i = 0; i < 8; i++) {
      this.cells[3][i].piece = null;
    }
    for (let i = 0; i < 8; i++) {
      this.cells[4][i].piece = null;
    }
    for (let i = 0; i < 8; i++) {
      this.cells[5][i].piece = null;
    }
  }

  getBoard() {
    return this.cells;
  }

  getBoardReversed() {
    const reversed: Array<Array<ChessCell>> = new Array(8);

    for (let y = 7; y >= 0; y--) {
      const row = new Array(8);
      for (let x = 7; x >= 0; x--) {
        row.push(this.cells[y][x]);
      }
      reversed.push(row);
    }

    return reversed;
  }

  getPositionAt(pos: CellPositionType) {
    if (pos.y < 8 && pos.y >= 0 && pos.x < 8 && pos.x >= 0) {
      return this.cells[pos.y][pos.x];
    }
    return null;
  }

  getPieceAt(pos: CellPositionType) {
    const cell = this.getPositionAt(pos);
    if (cell) return cell.piece;
    else throw new Error('Cell out of the board');
  }

  getActivePlayerColor() {
    return this.activePlayerColor;
  }

  setActivePlayerColor(color: ChessColors) {
    this.activePlayerColor = color;
  }

  setCellState(pos: CellPositionType, state: CellStates) {
    if (this.getPositionAt(pos)) this.cells[pos.y][pos.x].state = state;
    else throw new Error('Cell out of the board');
  }

  setPieceAt(pos: CellPositionType, piece: ChessPiece | null) {
    if (this.getPositionAt(pos)) this.cells[pos.y][pos.x].piece = piece;
    else throw new Error('Cell out of the board');
  }

  setEnPassant(pos: CellPositionType | null) {
    this.enpassant = pos;
  }

  switchPlayer() {
    this.checkKingPosition();
    if (this.activePlayerColor === ChessColors.WHITE) {
      this.activePlayerColor = ChessColors.BLACK;
    } else {
      this.activePlayerColor = ChessColors.WHITE;
    }
    this.checkKingPosition();
  }

  // OVERPIECES MOVEMENT BLOCKERS

  public blockLongCastle(color: ChessColors) {
    if (color === ChessColors.WHITE)
      (this.getPieceAt(this.whiteKingPos) as King).banLongCastle();
    else (this.getPieceAt(this.blackKingPos) as King).banLongCastle();
  }

  public blockShortCastle(color: ChessColors) {
    if (color === ChessColors.WHITE)
      (this.getPieceAt(this.whiteKingPos) as King).banShortCastle();
    else (this.getPieceAt(this.blackKingPos) as King).banShortCastle();
  }

  // PIECES OPERATIONS

  public movePiece(from: CellPositionType, to: CellPositionType) {
    const piece = this.getPieceAt(from);

    if (!piece) return;

    this.setPieceAt(to, piece);
    this.setPieceAt(from, null);

    this.enpassant = null;
    this.getPieceAt(to)?.onmove(from, to, this);

    return this.converter.convertToPGN(from) + this.converter.convertToPGN(to);
  }

  public capturePiece(target: CellPositionType) {
    const piece = this.getPieceAt(target);
    if (!piece) return;
    if (piece.color === ChessColors.WHITE) {
      this.capturedWhite.push(piece);
    } else {
      this.capturedBlack.push(piece);
    }
  }

  public setPieceFromPGN(move: string) {
    const from = this.converter.convertToPos(move.substring(0, 2));
    const to = this.converter.convertToPos(move.substring(2));

    this.movePiece(from, to);
  }

  // HIGHLIGHTING

  public highlight(pos: CellPositionType) {
    const cell = this.getPositionAt(pos) as ChessCell;
    if (!cell.piece) {
      this.setCellState(pos, CellStates.AVAILABLE);
      return true;
    } else {
      if (cell.piece.color !== this.activePlayerColor)
        this.setCellState(pos, CellStates.OCCUPIED);
      return false;
    }
  }

  public clearHighlighting() {
    this.cells.forEach(row =>
      row.forEach(cell => (cell.state = CellStates.DEFAULT)),
    );
    if (this.isWhiteKingCheched)
      this.setCellState(this.whiteKingPos, CellStates.THREATENED);
    if (this.isBlackKingChecked)
      this.setCellState(this.blackKingPos, CellStates.THREATENED);
  }

  // BEFORE EVERY MOVE CHECK KING DEFENSE

  public checkKingPosition() {
    if (this.activePlayerColor === ChessColors.WHITE) {
      if (this.isCellDefended(this.whiteKingPos)) {
        this.setCellState(this.whiteKingPos, CellStates.THREATENED);
        this.isWhiteKingCheched = true;
      } else {
        this.setCellState(this.whiteKingPos, CellStates.DEFAULT);
        this.isWhiteKingCheched = false;
      }
    } else {
      if (this.isCellDefended(this.blackKingPos)) {
        this.setCellState(this.blackKingPos, CellStates.THREATENED);
        this.isBlackKingChecked = true;
      } else {
        this.setCellState(this.blackKingPos, CellStates.DEFAULT);
        this.isBlackKingChecked = false;
      }
    }
  }

  // DEEP CELL CHECKING

  public isPieceThreatens(pos: CellPositionType, type: Figures) {
    return (
      this.getPositionAt(pos) &&
      this.getPieceAt(pos)?.type === type &&
      this.getPieceAt(pos)?.color !== this.activePlayerColor
    );
  }

  public isCellSafe(pos: CellPositionType) {
    const cell = this.getPositionAt(pos);
    if (!cell) return;

    const piece = this.getPieceAt(cell.position);
    if (piece) {
      // TAKEN BY ALLY
      if (piece.color === this.activePlayerColor) return;
      // TAKEN BY ENEMY
      else {
        if (this.isCellDefended(cell.position)) return;
        else this.setCellState(cell.position, CellStates.OCCUPIED);
      }
    } else {
      if (this.isCellDefended(cell.position)) return;
      else this.setCellState(cell.position, CellStates.AVAILABLE);
    }
  }

  public isCellDefended(pos: CellPositionType) {
    // BY PAWN
    if (
      this.isPieceThreatens({y: pos.y + 1, x: pos.x - 1}, Figures.PAWN) &&
      this.getPieceAt({y: pos.y + 1, x: pos.x - 1})?.color === ChessColors.WHITE
    )
      return true;
    if (
      this.isPieceThreatens({y: pos.y + 1, x: pos.x + 1}, Figures.PAWN) &&
      this.getPieceAt({y: pos.y + 1, x: pos.x + 1})?.color === ChessColors.WHITE
    )
      return true;
    if (
      this.isPieceThreatens({y: pos.y - 1, x: pos.x - 1}, Figures.PAWN) &&
      this.getPieceAt({y: pos.y - 1, x: pos.x - 1})?.color === ChessColors.BLACK
    )
      return true;
    if (
      this.isPieceThreatens({y: pos.y - 1, x: pos.x + 1}, Figures.PAWN) &&
      this.getPieceAt({y: pos.y - 1, x: pos.x + 1})?.color === ChessColors.BLACK
    )
      return true;

    // BY KNIGHT
    if (this.isPieceThreatens({y: pos.y + 2, x: pos.x - 1}, Figures.KNIGHT))
      return true;
    if (this.isPieceThreatens({y: pos.y + 2, x: pos.x + 1}, Figures.KNIGHT))
      return true;
    if (this.isPieceThreatens({y: pos.y + 1, x: pos.x - 2}, Figures.KNIGHT))
      return true;
    if (this.isPieceThreatens({y: pos.y + 1, x: pos.x + 2}, Figures.KNIGHT))
      return true;
    if (this.isPieceThreatens({y: pos.y - 1, x: pos.x - 2}, Figures.KNIGHT))
      return true;
    if (this.isPieceThreatens({y: pos.y - 1, x: pos.x + 2}, Figures.KNIGHT))
      return true;
    if (this.isPieceThreatens({y: pos.y - 2, x: pos.x - 1}, Figures.KNIGHT))
      return true;
    if (this.isPieceThreatens({y: pos.y - 2, x: pos.x + 1}, Figures.KNIGHT))
      return true;

    // BY KING
    if (this.isPieceThreatens({y: pos.y + 1, x: pos.x - 1}, Figures.KING))
      return true;
    if (this.isPieceThreatens({y: pos.y + 1, x: pos.x}, Figures.KING))
      return true;
    if (this.isPieceThreatens({y: pos.y + 1, x: pos.x + 1}, Figures.KING))
      return true;
    if (this.isPieceThreatens({y: pos.y, x: pos.x - 1}, Figures.KING))
      return true;
    if (this.isPieceThreatens({y: pos.y, x: pos.x + 1}, Figures.KING))
      return true;
    if (this.isPieceThreatens({y: pos.y - 1, x: pos.x - 1}, Figures.KING))
      return true;
    if (this.isPieceThreatens({y: pos.y - 1, x: pos.x}, Figures.KING))
      return true;
    if (this.isPieceThreatens({y: pos.y - 1, x: pos.x + 1}, Figures.KING))
      return true;

    // BY BISHOP & QUEEN
    const target: CellPositionType = {
      y: pos.y - 1,
      x: pos.x - 1,
    };
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.BISHOP ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.y--;
      target.x--;
    }

    target.y = pos.y + 1;
    target.x = pos.x + 1;
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.BISHOP ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.y++;
      target.x++;
    }

    target.y = pos.y - 1;
    target.x = pos.x + 1;
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.BISHOP ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.y--;
      target.x++;
    }

    target.y = pos.y + 1;
    target.x = pos.x - 1;
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.BISHOP ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.y++;
      target.x--;
    }

    // BY ROOK & QUEEN
    target.y = pos.y - 1;
    target.x = pos.x;
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.ROOK) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.ROOK ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.y--;
    }

    target.y = pos.y + 1;
    target.x = pos.x;
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.ROOK) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.ROOK ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.y++;
    }

    target.y = pos.y;
    target.x = pos.x + 1;
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.ROOK) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.ROOK ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.x++;
    }

    target.y = pos.y;
    target.x = pos.x - 1;
    while (this.getPositionAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.ROOK) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      if (
        this.getPieceAt(target) &&
        (this.getPieceAt(target)?.type !== Figures.ROOK ||
          this.getPieceAt(target)?.type !== Figures.QUEEN ||
          this.getPieceAt(target)?.type !== Figures.KING)
      )
        break;
      target.x--;
    }

    return false;
  }
}
