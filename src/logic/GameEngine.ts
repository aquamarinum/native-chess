import {Bishop} from './figures/Bishop';
import {Figure} from './figures/Figure';
import {King} from './figures/King';
import {Knight} from './figures/Knight';
import {Pawn} from './figures/Pawn';
import {Queen} from './figures/Queen';
import {Rook} from './figures/Rook';
import {Colors} from './models/Colors';
import {Figures} from './models/Figures';

export class Engine {
  public activePlayerColor: Colors;
  public activeFigure: string | null;
  private board: Map<string, Figure | null>;
  public highlighted: Set<string>;
  private captured_black: Array<Figure>;
  private captured_white: Array<Figure>;
  private cols: Map<string, number>;
  private rows: Map<string, number>;
  public moves: string;
  //private timeMode: string;

  constructor() {
    this.activePlayerColor = Colors.WHITE;
    this.activeFigure = null;
    this.board = new Map();
    this.highlighted = new Set();
    this.captured_white = new Array();
    this.captured_black = new Array();
    this.moves = '';

    this.rows = new Map()
      .set('8', 0)
      .set('7', 1)
      .set('6', 2)
      .set('5', 3)
      .set('4', 4)
      .set('3', 5)
      .set('2', 6)
      .set('1', 7);

    this.cols = new Map()
      .set('a', 0)
      .set('b', 1)
      .set('c', 2)
      .set('d', 3)
      .set('e', 4)
      .set('f', 5)
      .set('g', 6)
      .set('h', 7);

    this.rows.forEach((row, row_key) =>
      this.cols.forEach((col, col_key) =>
        this.board.set(row_key + col_key, null),
      ),
    );

    this.init();
  }

  init() {
    //BLACK
    this.board
      .set('8a', new Rook(Colors.BLACK))
      .set('8b', new Knight(Colors.BLACK))
      .set('8c', new Bishop(Colors.BLACK))
      .set('8d', new Queen(Colors.BLACK))
      .set('8e', new King(Colors.BLACK))
      .set('8f', new Bishop(Colors.BLACK))
      .set('8g', new Knight(Colors.BLACK))
      .set('8h', new Rook(Colors.BLACK));

    this.board
      .set('7a', new Pawn(Colors.BLACK))
      .set('7b', new Pawn(Colors.BLACK))
      .set('7c', new Pawn(Colors.BLACK))
      .set('7d', new Pawn(Colors.BLACK))
      .set('7e', new Pawn(Colors.BLACK))
      .set('7f', new Pawn(Colors.BLACK))
      .set('7g', new Pawn(Colors.BLACK))
      .set('7h', new Pawn(Colors.BLACK));

    //WHITE
    this.board
      .set('1a', new Rook(Colors.WHITE))
      .set('1b', new Knight(Colors.WHITE))
      .set('1c', new Bishop(Colors.WHITE))
      .set('1d', new Queen(Colors.WHITE))
      .set('1e', new King(Colors.WHITE))
      .set('1f', new Bishop(Colors.WHITE))
      .set('1g', new Knight(Colors.WHITE))
      .set('1h', new Rook(Colors.WHITE));

    this.board
      .set('2a', new Pawn(Colors.WHITE))
      .set('2b', new Pawn(Colors.WHITE))
      .set('2c', new Pawn(Colors.WHITE))
      .set('2d', new Pawn(Colors.WHITE))
      .set('2e', new Pawn(Colors.WHITE))
      .set('2f', new Pawn(Colors.WHITE))
      .set('2g', new Pawn(Colors.WHITE))
      .set('2h', new Pawn(Colors.WHITE));
  }

  getBoard() {
    return this.board;
  }

  getRows() {
    return this.rows;
  }

  getCols() {
    return this.cols;
  }

  getHighlighted() {
    return this.highlighted;
  }

  changeActivePlayer() {
    this.highlighted.clear();
    this.activePlayerColor =
      this.activePlayerColor === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
  }

  moveFigure(from: string, to: string) {
    const target = this.board.get(to);
    // ------------IF CELL IS TAKEN BY RIVALS FIGURE----------- //
    if (target) {
      this.activePlayerColor === Colors.WHITE
        ? this.captured_black.push(target)
        : this.captured_white.push(target);
    }
    this.board.set(to, this.board.get(from) as Figure);
    this.board.set(from, null);
  }

  parsePosition(pos: string) {
    const row = this.rows.get(pos[0]) as number;
    const col = this.cols.get(pos[1]) as number;
    return {row, col};
  }

  onSelectCell(target: string) {
    console.log('Target: ', target);
    const isTargetFigure = this.board.get(target);
    if (this.activeFigure) {
      if (this.highlighted.has(target)) {
        this.moveFigure(this.activeFigure, target);
        this.changeActivePlayer();
      } else {
        this.highlighted.clear();
        if (isTargetFigure && isTargetFigure.color === this.activePlayerColor) {
          this.activeFigure = target;
          this.highliteCells();
        } else {
          this.activeFigure = null;
        }
      }
    } else {
      //check if it is figure
      if (isTargetFigure && isTargetFigure.color === this.activePlayerColor) {
        this.activeFigure = target;
        this.highliteCells();
      }
    }
    console.log(this.highlighted);
  }

  highliteCells() {
    const figureType = this.board.get(this.activeFigure as string) as Figure;
    switch (figureType.type) {
      case Figures.PAWN:
        this.highlighted.add('7a').add('7b').add('7c');
        break;

      default:
        this.highlighted.clear();
        break;
    }
  }
}
