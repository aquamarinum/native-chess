import {
  bishop_black_icon,
  bishop_white_icon,
  king_black_icon,
  king_white_icon,
  knight_black_icon,
  knight_white_icon,
  pawn_black_icon,
  pawn_white_icon,
  queen_black_icon,
  queen_white_icon,
  rook_black_icon,
  rook_white_icon,
} from '../assets/img/chess';
import {Bishop} from './figures/Bishop';
import {Figure} from './figures/Figure';
import {King} from './figures/King';
import {Knight} from './figures/Knight';
import {Pawn} from './figures/Pawn';
import {Queen} from './figures/Queen';
import {Rook} from './figures/Rook';
import {Colors} from './models/Colors';

export class Engine {
  private player: Colors;
  private board: Array<Array<Figure | null>>;
  //private timeMode: string;

  constructor() {
    this.player = Colors.WHITE;
    this.board = new Array(8);

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
      this.board[1][i] = new Pawn(Colors.BLACK, pawn_black_icon, '1' + i);
    }

    this.board[0][0] = new Rook(Colors.BLACK, rook_black_icon, '00');
    this.board[0][7] = new Rook(Colors.BLACK, rook_black_icon, '07');

    this.board[0][1] = new Knight(Colors.BLACK, knight_black_icon, '01');
    this.board[0][6] = new Knight(Colors.BLACK, knight_black_icon, '06');

    this.board[0][2] = new Bishop(Colors.BLACK, bishop_black_icon, '02');
    this.board[0][5] = new Bishop(Colors.BLACK, bishop_black_icon, '05');

    this.board[0][3] = new Queen(Colors.BLACK, queen_black_icon, '03');
    this.board[0][4] = new King(Colors.BLACK, king_black_icon, '04');

    //WHITE
    for (let i = 0; i < 8; i++) {
      this.board[6][i] = new Pawn(Colors.WHITE, pawn_white_icon, '6' + i);
    }

    this.board[7][0] = new Rook(Colors.WHITE, rook_white_icon, '70');
    this.board[7][7] = new Rook(Colors.WHITE, rook_white_icon, '77');

    this.board[7][1] = new Knight(Colors.WHITE, knight_white_icon, '71');
    this.board[7][6] = new Knight(Colors.WHITE, knight_white_icon, '76');

    this.board[7][2] = new Bishop(Colors.WHITE, bishop_white_icon, '72');
    this.board[7][5] = new Bishop(Colors.WHITE, bishop_white_icon, '75');

    this.board[7][3] = new Queen(Colors.WHITE, queen_white_icon, '73');
    this.board[7][4] = new King(Colors.WHITE, king_white_icon, '74');
  }

  getBoard() {
    return this.board;
  }
}
