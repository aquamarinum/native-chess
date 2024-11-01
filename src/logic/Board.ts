import {Cell} from './Cell';
import {Colors} from './Colors';
import {figures} from './figures/Figure';
import {Bishop} from '../figures/Bishop';
import {King} from '../figures/King';
import {Knight} from '../figures/Knight';
import {Pawn} from '../figures/Pawn';
import {Queen} from '../figures/Queen';
import {Rook} from './figures/Rook';

export class Board {
  //check king if figure
  //check en passant
  //check king under threat
  //O-O || O-O-O
  cells: Cell[][] = [];

  constructor() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0)
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        else row.push(new Cell(this, j, i, Colors.BLACK, null));
      }
      this.cells.push(row);
    }
    this.start();
  }

  public start() {
    this.cells[0][0].figure = new Rook(this.cells[0][0], Colors.BLACK);
    this.cells[0][7].figure = new Rook(this.cells[0][7], Colors.BLACK);
    this.cells[7][0].figure = new Rook(this.cells[7][0], Colors.WHITE);
    this.cells[7][7].figure = new Rook(this.cells[7][7], Colors.WHITE);

    this.cells[0][1].figure = new Knight(this.cells[0][1], Colors.BLACK);
    this.cells[0][6].figure = new Knight(this.cells[0][6], Colors.BLACK);
    this.cells[7][1].figure = new Knight(this.cells[7][1], Colors.WHITE);
    this.cells[7][6].figure = new Knight(this.cells[7][6], Colors.WHITE);

    this.cells[0][2].figure = new Bishop(this.cells[0][2], Colors.BLACK);
    this.cells[0][5].figure = new Bishop(this.cells[0][5], Colors.BLACK);
    this.cells[7][2].figure = new Bishop(this.cells[7][2], Colors.WHITE);
    this.cells[7][5].figure = new Bishop(this.cells[7][5], Colors.WHITE);

    this.cells[0][3].figure = new Queen(this.cells[0][3], Colors.BLACK);
    this.cells[7][3].figure = new Queen(this.cells[7][3], Colors.WHITE);

    this.cells[0][4].figure = new King(this.cells[0][4], Colors.BLACK);
    this.cells[7][4].figure = new King(this.cells[7][4], Colors.WHITE);

    for (let i = 0; i < 8; i++) {
      this.cells[1][i].figure = new Pawn(this.cells[1][i], Colors.BLACK);
    }
    for (let i = 0; i < 8; i++) {
      this.cells[6][i].figure = new Pawn(this.cells[6][i], Colors.WHITE);
    }
  }

  public getCell(y: number, x: number): Cell {
    return this.cells[y][x];
  }

  public moveFigure(from: Cell, to: Cell): boolean {
    if (to.available) {
      to.figure = from.figure;
      to.available = false;
      from.figure = null;
      from.available = true;
      if (to.figure) to.figure.cell = to;
    }
    return true;
  }

  public highlightCells(base: Cell | null) {
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        this.cells[i][j].available = false;
      }
    if (base?.figure) {
      base.figure.canMove();
    }
  }

  public rookMove(from: Cell) {
    //vertical movement
    for (let i = from.y - 1; i >= 0; i--) {
      const el = this.cells[i][from.x];
      el.available = true;
      if (el.figure?.color === from.figure?.color) el.available = false;
      if (el.figure) break;
    }
    for (let i = from.y + 1; i < 8; i++) {
      const el = this.cells[i][from.x];
      el.available = true;
      if (el.figure?.color === from.figure?.color) el.available = false;
      if (el.figure) break;
    }
    //horizontal movement
    for (let i = from.x - 1; i >= 0; i--) {
      this.cells[from.y][i].available = true;
      if (this.cells[from.y][i].figure?.color === from.figure?.color)
        this.cells[from.y][i].available = false;
      if (this.cells[from.y][i].figure) break;
    }
    for (let i = from.x + 1; i < 8; i++) {
      this.cells[from.y][i].available = true;
      if (this.cells[from.y][i].figure?.color === from.figure?.color)
        this.cells[from.y][i].available = false;
      if (this.cells[from.y][i].figure) break;
    }
  }
  public bishopMove(from: Cell) {
    //main diagonal
    for (let i = from.y - 1, j = from.x - 1; i >= 0 && j >= 0; i--, j--) {
      this.cells[i][j].available = true;
      if (this.cells[i][j].figure?.color === from.figure?.color)
        this.cells[i][j].available = false;
      if (this.cells[i][j].figure) break;
    }
    for (let i = from.y + 1, j = from.x + 1; i < 8 && j < 8; i++, j++) {
      this.cells[i][j].available = true;
      if (this.cells[i][j].figure?.color === from.figure?.color)
        this.cells[i][j].available = false;
      if (this.cells[i][j].figure) break;
    }
    //add diagonal
    for (let i = from.y - 1, j = from.x + 1; i >= 0 && j < 8; i--, j++) {
      this.cells[i][j].available = true;
      if (this.cells[i][j].figure?.color === from.figure?.color)
        this.cells[i][j].available = false;
      if (this.cells[i][j].figure) break;
    }
    for (let i = from.y + 1, j = from.x - 1; i < 8 && j >= 0; i++, j--) {
      this.cells[i][j].available = true;
      if (this.cells[i][j].figure?.color === from.figure?.color)
        this.cells[i][j].available = false;
      if (this.cells[i][j].figure) break;
    }
  }
  public knightMove(from: Cell) {
    if (from.y > 1) {
      if (from.x > 0) this.cells[from.y - 2][from.x - 1].available = true;
      if (from.x < 7) this.cells[from.y - 2][from.x + 1].available = true;
    }
    if (from.y > 0) {
      if (from.x > 1) this.cells[from.y - 1][from.x - 2].available = true;
      if (from.x < 6) this.cells[from.y - 1][from.x + 2].available = true;
    }
    if (from.y < 6) {
      if (from.x > 0) this.cells[from.y + 2][from.x - 1].available = true;
      if (from.x < 7) this.cells[from.y + 2][from.x + 1].available = true;
    }
    if (from.y < 7) {
      if (from.x > 1) this.cells[from.y + 1][from.x - 2].available = true;
      if (from.x < 6) this.cells[from.y + 1][from.x + 2].available = true;
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
