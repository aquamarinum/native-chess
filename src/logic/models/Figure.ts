import { Cell } from "./Cell";
import { Colors } from "./Colors";

export enum figures {
  KING = "King",
  QUEEN = "Queen",
  ROOK = "Rook",
  BISHOP = "Bishop",
  KNIGHT = "Knight",
  PAWN = "Pawn",
}

export abstract class Figure {
  cell: Cell;
  title: figures;
  color: Colors;
  icon: string;
  constructor(cl: Cell, title: figures, clr: Colors, icon: string) {
    this.cell = cl;
    this.title = title;
    this.color = clr;
    this.icon = icon;
  }
  public canMove(): void {}
}
