import {ChessBoard, CellPositionType} from './ChessBoard';
import {ChessPiece} from './ChessPiece';
import {CellStates} from './models/CellStates';
import {ChessColors} from './models/ChessColors';

export class ChessCell {
  readonly board: ChessBoard;
  readonly position: CellPositionType;
  readonly color: ChessColors;
  piece: ChessPiece | null;
  state: CellStates;

  constructor(
    base: ChessBoard,
    pos: CellPositionType,
    figure: ChessPiece | null,
  ) {
    this.board = base;
    this.position = pos;
    this.color =
      (pos.y + pos.x) % 2 === 0 ? ChessColors.WHITE : ChessColors.BLACK;
    this.piece = figure;
    this.state = CellStates.DEFAULT;
  }

  onSelectCell() {
    if (this.piece) this.piece.highlight(this.position, this.board);
  }
}
