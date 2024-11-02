import {Bishop} from './figures/Bishop';
import {Figure} from './figures/Figure';
import {King} from './figures/King';
import {Knight} from './figures/Knight';
import {Pawn} from './figures/Pawn';
import {Queen} from './figures/Queen';
import {Rook} from './figures/Rook';
import {Colors} from './models/Colors';

export class Engine {
  private activePlayer: Colors;
  private activeCell: [number, number] | null;
  private board: Array<Array<Figure | null>>;
  private highlighted: Set<string>;
  //private timeMode: string;

  constructor() {
    this.activePlayer = Colors.WHITE;
    this.activeCell = null;
    this.board = new Array(8);
    this.highlighted = new Set();

    for (let i = 0; i < 8; i++) {
      const row = new Array();
      for (let j = 0; j < 8; j++) {
        row.push(null);
      }
      this.board.push(row);
    }
  }

  init() {
    //BLACK
    for (let i = 0; i < 8; i++) {
      this.board[1][i] = new Pawn(Colors.BLACK);
    }

    this.board[0][0] = new Rook(Colors.BLACK);
    this.board[0][7] = new Rook(Colors.BLACK);

    this.board[0][1] = new Knight(Colors.BLACK);
    this.board[0][6] = new Knight(Colors.BLACK);

    this.board[0][2] = new Bishop(Colors.BLACK);
    this.board[0][5] = new Bishop(Colors.BLACK);

    this.board[0][3] = new Queen(Colors.BLACK);
    this.board[0][4] = new King(Colors.BLACK);

    //WHITE
    for (let i = 0; i < 8; i++) {
      this.board[6][i] = new Pawn(Colors.WHITE);
    }

    this.board[7][0] = new Rook(Colors.WHITE);
    this.board[7][7] = new Rook(Colors.WHITE);

    this.board[7][1] = new Knight(Colors.WHITE);
    this.board[7][6] = new Knight(Colors.WHITE);

    this.board[7][2] = new Bishop(Colors.WHITE);
    this.board[7][5] = new Bishop(Colors.WHITE);

    this.board[7][3] = new Queen(Colors.WHITE);
    this.board[7][4] = new King(Colors.WHITE);
  }

  getBoard() {
    return this.board;
  }

  matchHighlighted(cell: string) {
    return this.highlighted.has(cell);
  }

  onClickCell(row: number, col: number) {
    if (this.activeCell) {
    } else {
    }
  }
}
