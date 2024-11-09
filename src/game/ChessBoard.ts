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

  private init() {
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

    // for (let i = 0; i < 8; i++) {
    //   this.cells[1][i].piece = new Pawn(ChessColors.BLACK);
    // }
    for (let i = 0; i < 8; i++) {
      this.cells[6][i].piece = new Pawn(ChessColors.WHITE);
    }
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

  setCellState(pos: CellPositionType, state: CellStates) {
    if (this.getPositionAt(pos)) this.cells[pos.y][pos.x].state = state;
    else throw new Error('Cell out of the board');
  }

  setCellPiece(pos: CellPositionType, piece: ChessPiece) {
    this.cells[pos.y][pos.x].piece = piece;
  }

  private doCastleShort(pos: CellPositionType) {
    this.cells[pos.y][5].piece = this.cells[pos.y][7].piece;
    this.cells[pos.y][7].piece = null;
  }

  private doCastleLong(pos: CellPositionType) {
    this.cells[pos.y][3].piece = this.cells[pos.y][0].piece;
    this.cells[pos.y][0].piece = null;
  }

  // TODO REWRITE FUNCTION
  private onPawnMoved(cell: ChessCell) {
    if (cell.position.y === 0 || cell.position.y === 7) {
      this.setCellPiece(
        cell.position,
        new Queen((cell.piece as ChessPiece).color),
      );
    }
  }

  private onRookMoved(pos: CellPositionType, color: ChessColors) {
    if (pos.x === 0) {
      if (color === ChessColors.WHITE) {
        console.log('LONG CASTLE FOR WHITE ABORTED');
        (this.getPieceAt(this.whiteKingPos) as King).abortLongCastle();
      } else {
        console.log('LONG CASTLE FOR BLACK ABORTED');
        (this.getPieceAt(this.blackKingPos) as King).abortLongCastle();
      }
    }
    if (pos.x === 7) {
      if (color === ChessColors.WHITE) {
        console.log('SHORT CASTLE FOR WHITE ABORTED');
        (this.getPieceAt(this.whiteKingPos) as King).abortShortCastle();
      } else {
        console.log('SHORT CASTLE FOR BLACK ABORTED');
        (this.getPieceAt(this.blackKingPos) as King).abortShortCastle();
      }
    }
  }

  private onKingMoved(posFrom: CellPositionType, posTo: CellPositionType) {
    if (posFrom.x - posTo.x === -2) {
      this.doCastleShort(posTo);
    }
    if (posFrom.x - posTo.x === 2) {
      this.doCastleLong(posTo);
    }

    const king = this.getPieceAt(posTo) as King;

    king.abortCastling();

    if (king.color === ChessColors.WHITE) this.whiteKingPos = posTo;
    else this.blackKingPos = posTo;
  }

  public moveFigure(from: ChessCell, to: ChessCell): boolean {
    if (to.state === CellStates.AVAILABLE || to.state === CellStates.OCCUPIED) {
      to.piece = from.piece;
      from.piece = null;

      // AFTERMOVE
      switch ((to.piece as ChessPiece).type) {
        case Figures.PAWN:
          this.onPawnMoved(to);
          break;
        case Figures.ROOK:
          this.onRookMoved(from.position, (to.piece as ChessPiece).color);
          break;
        case Figures.KING:
          this.onKingMoved(from.position, to.position);
          break;
        default:
          break;
      }

      //? this.gameRef.switchPlayer();
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
    if (!this.getPieceAt(pos)) {
      this.setCellState(pos, CellStates.AVAILABLE);
      return true;
    } else {
      if (
        (this.getPieceAt(pos) as ChessPiece).color !==
        this.gameRef.getCurrentPlayerColor()
      ) {
        this.setCellState(pos, CellStates.OCCUPIED);
      }
      return false;
    }
  }

  private isPieceThreatens(pos: CellPositionType, type: Figures) {
    return (
      this.getPositionAt(pos) &&
      this.getPieceAt(pos)?.type === type &&
      this.getPieceAt(pos)?.color !== this.gameRef.getCurrentPlayerColor()
    );
  }

  public isCellSafe(pos: CellPositionType) {
    const cell = this.getPositionAt(pos);
    if (!cell) return;

    // CELL ALREADY TAKEN
    if (this.getPieceAt(cell.position)) {
      // TAKEN BY ALLY
      if (cell.piece?.color === this.gameRef.getCurrentPlayerColor()) return;
      // TAKEN BY ENEMY
      else {
        if (this.isCellDefended(cell.position)) return;
        else this.setCellState(cell.position, CellStates.OCCUPIED);
      }
    }
    // CELL IS FREE
    else {
      if (this.isCellDefended(cell.position)) return;
      else this.setCellState(cell.position, CellStates.AVAILABLE);
    }
  }

  public isCellDefended(pos: CellPositionType) {
    // BY PAWN
    if (this.isPieceThreatens({y: pos.y, x: pos.x - 1}, Figures.PAWN))
      return true;
    if (this.isPieceThreatens({y: pos.y, x: pos.x + 1}, Figures.PAWN))
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
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.y--;
      target.x--;
    }

    target.y = pos.y + 1;
    target.x = pos.x + 1;
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.y++;
      target.x++;
    }

    target.y = pos.y - 1;
    target.x = pos.x + 1;
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.y--;
      target.x++;
    }

    target.y = pos.y + 1;
    target.x = pos.x - 1;
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.y++;
      target.x--;
    }

    // BY ROOK & QUEEN
    target.y = pos.y + 1;
    target.x = pos.x;
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.y++;
    }

    target.y = pos.y - 1;
    target.x = pos.x;
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.y--;
    }

    target.y = pos.y;
    target.x = pos.x + 1;
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.x++;
    }

    target.y = pos.y;
    target.x = pos.x - 1;
    while (this.getPositionAt(target) && !this.getPieceAt(target)) {
      if (
        this.isPieceThreatens(target, Figures.BISHOP) ||
        this.isPieceThreatens(target, Figures.QUEEN)
      )
        return true;
      target.x--;
    }

    return false;
  }
}
