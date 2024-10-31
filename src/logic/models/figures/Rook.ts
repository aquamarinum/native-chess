import {rook_black_icon, rook_white_icon} from '../../../assets/img/chess';
import {Cell} from '../Cell';
import {Colors} from '../Colors';
import {Figure, figures} from '../Figure';

export class Rook extends Figure {
  constructor(base: Cell, color: Colors) {
    super(
      base,
      figures.ROOK,
      color,
      color === Colors.BLACK ? rook_black_icon : rook_white_icon,
    );
  }
  public canMove() {
    this.cell.board.rookMove(this.cell);
  }
}
