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

  convertToPGN(pos: CellPositionType) {
    return this.columns[pos.x] + (8 - pos.y);
  }

  convertToPos(pgn: string) {
    const pos: CellPositionType = {
      y: 8 - Number(pgn[1]),
      x: (this.columnsReverse.get(pgn[0]) as number) - 1,
    };
    return pos;
  }
}
