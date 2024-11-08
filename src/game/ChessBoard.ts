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
      if (
        to.piece &&
        to.piece.title === Figures.PAWN &&
        (to.position.y === 0 || to.position.y === 7)
      ) {
        this.transformPawn(to.position, to.piece.color);
      }
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

  public transformPawn(pos: CellPositionType, color: ChessColors) {
    this.cells[pos.y][pos.x].piece = new Queen(color);
  }
}
