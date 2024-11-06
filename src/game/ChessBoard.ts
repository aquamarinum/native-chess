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

export type CellPositionType = {
  y: number;
  x: number;
};

export class ChessBoard {
  cells: Array<Array<ChessCell>>;
  gameRef: Game;

  constructor(ref: Game) {
    this.gameRef = ref;
    this.cells = new Array(8);
    this.cells.map((row, row_idx) =>
      new Array(8).map(
        (col, col_idx) => new ChessCell(this, {y: row_idx, x: col_idx}, null),
      ),
    );
    this.init();
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

  public moveFigure(from: ChessCell, to: ChessCell): boolean {
    if (to.state === CellStates.AVAILABLE || to.state === CellStates.OCCUPIED) {
      to.piece = from.piece;
      to.state = CellStates.DEFAULT;
      from.piece = null;
      from.state = CellStates.DEFAULT;
      //switch player
    }
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

  public pawnMove(from: Cell) {
    if (from.figure?.color === Colors.WHITE) {
      //movement white
      if (!this.cells[from.y - 1][from.x].figure) {
        this.cells[from.y - 1][from.x].available = true;
        if (from.y === 6 && !this.cells[4][from.x].figure)
          this.cells[4][from.x].available = true;
      }
      //capture white
      if (from.y > 0) {
        if (from.x > 0 && this.cells[from.y - 1][from.x - 1].figure)
          this.cells[from.y - 1][from.x - 1].available = true;
        if (from.x < 7 && this.cells[from.y - 1][from.x + 1].figure)
          this.cells[from.y - 1][from.x + 1].available = true;
      }
      //en passant
    } else {
      //movement black
      if (!this.cells[from.y + 1][from.x].figure) {
        this.cells[from.y + 1][from.x].available = true;
        if (from.y === 1 && !this.cells[3][from.x].figure)
          this.cells[3][from.x].available = true;
      }
      //capture black
      if (from.y < 7) {
        if (from.x > 0 && this.cells[from.y + 1][from.x - 1].figure)
          this.cells[from.y + 1][from.x - 1].available = true;
        if (from.x < 7 && this.cells[from.y + 1][from.x + 1].figure)
          this.cells[from.y + 1][from.x + 1].available = true;
      }
      //en passant
    }
  }
  public kingMove(from: Cell) {
    if (from.y > 0) this.cells[from.y - 1][from.x].available = true;
    if (from.y < 7) this.cells[from.y + 1][from.x].available = true;
    if (from.x > 0) this.cells[from.y][from.x - 1].available = true;
    if (from.x < 7) this.cells[from.y][from.x + 1].available = true;

    if (from.y > 0 && from.x > 0)
      this.cells[from.y - 1][from.x - 1].available = true;
    if (from.y > 0 && from.x < 7)
      this.cells[from.y - 1][from.x + 1].available = true;
    if (from.y < 7 && from.x > 0)
      this.cells[from.y + 1][from.x - 1].available = true;
    if (from.y < 7 && from.x < 7)
      this.cells[from.y + 1][from.x + 1].available = true;
  }
}
