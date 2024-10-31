import {bishop_black_icon, bishop_white_icon} from '../../../assets/img/chess';
import {Cell} from '../Cell';
import {Colors} from '../Colors';
import {Figure, figures} from '../Figure';

export class Bishop extends Figure {
  constructor(base: Cell, color: Colors) {
    super(
      base,
      figures.BISHOP,
      color,
      color === Colors.BLACK ? bishop_black_icon : bishop_white_icon,
    );
  }
  public canMove() {
    this.cell.board.bishopMove(this.cell);
  }
}
