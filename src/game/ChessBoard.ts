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
  whiteKingPos: CellPositionType;
  blackKingPos: CellPositionType;

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
    this.whiteKingPos = {y: 7, x: 4};
    this.blackKingPos = {y: 0, x: 4};
  }

  private init() {
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

  getPositionAt(pos: CellPositionType) {
    if (pos.y < 8 && pos.y >= 0 && pos.x < 8 && pos.x >= 0) {
      return this.cells[pos.y][pos.x];
    }
    return null;
  }

  getPieceAt(pos: CellPositionType) {
    const cell = this.getPositionAt(pos);
    if (cell) return cell.piece;
    else throw new Error('Cell out of the board');
  }

  setCellState(pos: CellPositionType, state: CellStates) {
    if (this.getPositionAt(pos)) this.cells[pos.y][pos.x].state = state;
    else throw new Error('Cell out of the board');
  }

  setCellPiece(pos: CellPositionType, piece: ChessPiece) {
    this.cells[pos.y][pos.x].piece = piece;
  }

  private doCastleShort(pos: CellPositionType) {
    this.cells[pos.y][5].piece = this.cells[pos.y][7].piece;
    this.cells[pos.y][7].piece = null;
  }

  private doCastleLong(pos: CellPositionType) {
    this.cells[pos.y][3].piece = this.cells[pos.y][0].piece;
    this.cells[pos.y][0].piece = null;
  }

  // TODO REWRITE FUNCTION
  private onPawnMoved(cell: ChessCell) {
    if (cell.position.y === 0 || cell.position.y === 7) {
      this.setCellPiece(
        cell.position,
        new Queen((cell.piece as ChessPiece).color),
      );
    }
  }

  private onRookMoved(cell: ChessCell) {
    if (cell.position.x === 0) {
      if ((cell.piece as ChessPiece).color === ChessColors.WHITE) {
        (this.getPieceAt(this.whiteKingPos) as King).abortLongCastle();
      } else {
        (this.getPieceAt(this.blackKingPos) as King).abortLongCastle();
      }
    }
    if (cell.position.x === 7) {
      if ((cell.piece as ChessPiece).color === ChessColors.WHITE) {
        (this.getPieceAt(this.whiteKingPos) as King).abortShortCastle();
      } else {
        (this.getPieceAt(this.blackKingPos) as King).abortShortCastle();
      }
    }
  }

  private onKingMoved(posFrom: CellPositionType, posTo: CellPositionType) {
    if (posFrom.x - posTo.x === -2) {
      this.doCastleShort(posTo);
    }
    if (posFrom.x - posTo.x === 2) {
      this.doCastleLong(posTo);
    }

    const king = this.getPieceAt(posTo) as King;

    king.abortCastling();

    if (king.color === ChessColors.WHITE) this.whiteKingPos = posTo;
    else this.blackKingPos = posTo;
  }

  public moveFigure(from: ChessCell, to: ChessCell): boolean {
    if (to.state === CellStates.AVAILABLE || to.state === CellStates.OCCUPIED) {
      to.piece = from.piece;
      from.piece = null;

      // AFTERMOVE
      switch ((to.piece as ChessPiece).type) {
        case Figures.PAWN:
          this.onPawnMoved(to);
          break;
        case Figures.ROOK:
          this.onRookMoved(from);
          break;
        case Figures.KING:
          this.onKingMoved(from.position, to.position);
          break;
        default:
          break;
      }

      //? this.gameRef.switchPlayer();
    }
    this.clearHighlighting();
    return true;
  }

  public clearHighlighting() {
    this.cells.forEach(row =>
      row.forEach(cell => (cell.state = CellStates.DEFAULT)),
    );
  }

  public checkPosition(pos: CellPositionType) {
    if (!this.getPieceAt(pos)) {
      this.setCellState(pos, CellStates.AVAILABLE);
      return true;
    } else {
      if (
        (this.getPieceAt(pos) as ChessPiece).color !==
        this.gameRef.getCurrentPlayerColor()
      ) {
        this.setCellState(pos, CellStates.OCCUPIED);
      }
      return false;
    }
  }

  private isPieceThreatens(pos: CellPositionType, pieceType: Figures) {
    return (
      this.getPieceAt(pos)?.type === pieceType &&
      this.getPieceAt(pos)?.color !== this.gameRef.getCurrentPlayerColor()
    );
  }

  private checkForThreat(target: CellPositionType) {
    //! KING AND PAWN
    if (target.y - 1 >= 0) {
      const top: CellPositionType = {
        y: target.y - 1,
        x: target.x,
      };

      //TOP
      if (this.isPieceThreatens(top, Figures.KING)) return false;

      if (target.x - 1 >= 0) {
        const left: CellPositionType = {
          y: target.y,
          x: target.x - 1,
        };

        //LEFT
        if (this.isPieceThreatens(left, Figures.KING)) return false;

        //TOP-LEFT
        if (
          this.isPieceThreatens({y: top.y, x: left.x}, Figures.PAWN) ||
          this.isPieceThreatens({y: top.y, x: left.x}, Figures.KING)
        )
          return false;
      }
      if (target.x + 1 < 8) {
        const right: CellPositionType = {
          y: target.y,
          x: target.x + 1,
        };

        //RIGHT
        if (this.isPieceThreatens(right, Figures.KING)) return false;

        //TOP-RIGHT
        if (
          this.isPieceThreatens({y: top.y, x: right.x}, Figures.PAWN) ||
          this.isPieceThreatens({y: top.y, x: right.x}, Figures.KING)
        )
          return false;
      }
    }
    if (target.y + 1 < 8) {
      const bottom: CellPositionType = {
        y: target.y + 1,
        x: target.x,
      };

      //BOTTOM
      if (this.isPieceThreatens(bottom, Figures.KING)) return false;

      if (target.x - 1 >= 0) {
        const left: CellPositionType = {
          y: target.y,
          x: target.x - 1,
        };

        //BOTTOM-LEFT
        if (
          this.isPieceThreatens({y: bottom.y, x: left.x}, Figures.PAWN) ||
          this.isPieceThreatens({y: bottom.y, x: left.x}, Figures.KING)
        )
          return false;
      }
      if (target.x + 1 < 8) {
        const right: CellPositionType = {
          y: target.y,
          x: target.x + 1,
        };

        //BOTTOM-RIGHT
        if (
          this.isPieceThreatens({y: bottom.y, x: right.x}, Figures.PAWN) ||
          this.isPieceThreatens({y: bottom.y, x: right.x}, Figures.KING)
        )
          return false;
      }
    }

    //! KNIGHT
    if (target.y > 1) {
      if (
        target.x > 0 &&
        this.isPieceThreatens(
          {y: target.y - 2, x: target.x - 1},
          Figures.KNIGHT,
        )
      )
        return false;
      if (
        target.x < 7 &&
        this.isPieceThreatens(
          {y: target.y - 2, x: target.x + 1},
          Figures.KNIGHT,
        )
      )
        return false;
    }
    if (target.y > 0) {
      if (
        target.x > 1 &&
        this.isPieceThreatens(
          {y: target.y - 1, x: target.x - 2},
          Figures.KNIGHT,
        )
      )
        return false;

      if (
        target.x < 6 &&
        this.isPieceThreatens(
          {y: target.y - 1, x: target.x + 2},
          Figures.KNIGHT,
        )
      )
        return false;
    }
    if (target.y < 6) {
      if (
        target.x > 0 &&
        this.isPieceThreatens(
          {y: target.y + 2, x: target.x - 1},
          Figures.KNIGHT,
        )
      )
        return false;

      if (
        target.x < 7 &&
        this.isPieceThreatens(
          {y: target.y + 2, x: target.x + 1},
          Figures.KNIGHT,
        )
      )
        return false;
    }
    if (target.y < 7) {
      if (
        target.x > 1 &&
        this.isPieceThreatens(
          {y: target.y + 1, x: target.x - 2},
          Figures.KNIGHT,
        )
      )
        return false;

      if (
        target.x < 6 &&
        this.isPieceThreatens(
          {y: target.y + 1, x: target.x + 2},
          Figures.KNIGHT,
        )
      )
        return false;
    }

    //! BISHOP AND QUEEN
    //MAIN DIAGONAL TO TOP
    const newPosition: CellPositionType = {
      y: target.y - 1,
      x: target.x - 1,
    };

    while (newPosition.y >= 0 && newPosition.x >= 0) {
      if (
        this.isPieceThreatens(newPosition, Figures.BISHOP) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.y--;
      newPosition.x--;
    }
    //MAIN DIAGONAL TO BOTTOM
    newPosition.y = target.y + 1;
    newPosition.x = target.x + 1;

    while (newPosition.y < 8 && newPosition.x < 8) {
      if (
        this.isPieceThreatens(newPosition, Figures.BISHOP) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.y++;
      newPosition.x++;
    }
    //SIDE DIAGONAL TO TOP
    newPosition.y = target.y - 1;
    newPosition.x = target.x + 1;

    while (newPosition.y >= 0 && newPosition.x < 8) {
      if (
        this.isPieceThreatens(newPosition, Figures.BISHOP) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.y--;
      newPosition.x++;
    }
    //SIDE DIAGONAL TO BOTTOM
    newPosition.y = target.y + 1;
    newPosition.x = target.x - 1;

    while (newPosition.y < 8 && newPosition.x >= 0) {
      if (
        this.isPieceThreatens(newPosition, Figures.BISHOP) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.y++;
      newPosition.x--;
    }

    //! ROOK AND QUEEN
    //VERTICAL TO TOP
    newPosition.y = target.y - 1;
    newPosition.x = target.x;

    while (newPosition.y >= 0) {
      if (
        this.isPieceThreatens(newPosition, Figures.ROOK) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.y--;
    }
    //VERTICAL TO BOTTOM
    newPosition.y = target.y + 1;

    while (newPosition.y < 8) {
      if (
        this.isPieceThreatens(newPosition, Figures.ROOK) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.y++;
    }
    //HORIZONTAL TO LEFT
    newPosition.y = target.y;
    newPosition.x = target.x - 1;

    while (newPosition.x >= 0) {
      if (
        this.isPieceThreatens(newPosition, Figures.ROOK) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.x--;
    }
    //HORIZONTAL TO RIGHT
    newPosition.x = target.x + 1;

    while (newPosition.x < 8) {
      if (
        this.isPieceThreatens(newPosition, Figures.ROOK) ||
        this.isPieceThreatens(newPosition, Figures.QUEEN)
      )
        return false;
      newPosition.x++;
    }

    return true;
  }
}
