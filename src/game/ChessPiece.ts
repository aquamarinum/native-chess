import {Figures} from './models/Figures';
import {ChessColors} from './models/ChessColors';
import {ViewModels} from './models/ViewModels';
import {CellPositionType, ChessBoard} from './ChessBoard';

export abstract class ChessPiece {
  readonly title: Figures;
  readonly color: ChessColors;
  readonly model: ViewModels;
  constructor(title: Figures, clr: ChessColors, icon: ViewModels) {
    this.title = title;
    this.color = clr;
    this.model = icon;
  }
  public highlight(currentPos: CellPositionType, board: ChessBoard): void {}
}
