import {CellPositionType} from './ChessBoard';

export class MovesAggregator {
  private columns: Array<string>;
  private columnsReverse: Map<string, number>;
  private iteration: number;
  private moves: Array<string>;
  private currentMove: string;

  constructor() {
    this.moves = [];
    this.currentMove = '';
    this.iteration = 0;
    this.columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    this.columnsReverse = new Map();
    this.columns.forEach((value, index) =>
      this.columnsReverse.set(value, index + 1),
    );
  }

  recordMove(pieceSymbol: string, pos: CellPositionType) {
    const newPos = this.columns[pos.x] + (8 - pos.y);
    if (this.currentMove.length > 0) {
      this.currentMove += pieceSymbol + newPos + ' ';
      this.next();
    } else {
      this.currentMove += pieceSymbol + newPos + ' ';
    }
  }

  recordMoveSpecial(content: string) {
    if (this.currentMove.length > 0) {
      this.currentMove += content + ' ';
      this.next();
    } else {
      this.currentMove += content + ' ';
    }
  }

  next() {
    const completeMove = this.iteration + 1 + '. ' + this.currentMove.trimEnd();
    this.moves.push(completeMove);
    this.currentMove = '';
    this.iteration++;
  }

  getMoves() {
    return this.moves;
  }

  getSymbolPos(col: number) {
    return this.columns[col];
  }
}
