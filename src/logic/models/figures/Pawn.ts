import {pawn_black_icon, pawn_white_icon} from '../../../assets/img/chess';
import {Cell} from '../Cell';
import {Colors} from '../Colors';
import {Figure, figures} from '../Figure';

export class Pawn extends Figure {
  constructor(base: Cell, color: Colors) {
    super(
      base,
      figures.PAWN,
      color,
      color === Colors.BLACK ? pawn_black_icon : pawn_white_icon,
    );
  }
  public canMove() {
    this.cell.board.pawnMove(this.cell);
  }
}
