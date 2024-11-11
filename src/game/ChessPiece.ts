import {Figures} from './models/Figures';
import {ChessColors} from './models/ChessColors';
import {ViewModels} from './models/ViewModels';
import {CellPositionType, ChessBoard} from './ChessBoard';

export abstract class ChessPiece {
  readonly type: Figures;
  readonly color: ChessColors;
  readonly model: ViewModels;
  constructor(typ: Figures, clr: ChessColors, icon: ViewModels) {
    this.type = typ;
    this.color = clr;
    this.model = icon;
  }
  abstract canMove(currentPos: CellPositionType, board: ChessBoard): void;
  abstract move(board: ChessBoard, target: CellPositionType): void;
}
