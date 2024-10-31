import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./Figure";

export class Cell {
  readonly board: Board;
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  available: boolean;

  constructor(
    _b: Board,
    _x: number,
    _y: number,
    clr: Colors,
    fig: Figure | null
  ) {
    this.board = _b;
    this.x = _x;
    this.y = _y;
    this.id = (_y + 1) * 10 + (_x + 1);
    this.color = clr;
    this.figure = fig;
    this.available = false;
  }

  public isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) return false;

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let i = min + 1; i < max; i++)
      if (this.board.getCell(i, this.x).figure) return false;
    return true;
  }

  public isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) return false;

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let i = min + 1; i < max; i++)
      if (this.board.getCell(this.y, i).figure) return false;
    return true;
  }

  public isEmptyDiagonal(target: Cell): boolean {
    if (Math.abs(this.x - target.x) === Math.abs(this.y - target.y)) {
      const min = Math.min(this.y, target.y);
      const max = Math.max(this.y, target.y);
      let x_val = target.x;
      for (let i = min; i < max; i++) {
        if (this.board.getCell(i, x_val)?.figure) return false;
        if (
          (target.x > this.x && target.y < this.y) ||
          (target.x < this.x && target.y > this.y)
        )
          x_val--;
        else x_val++;
      }
      return true;
    }
    return false;
  }
}
