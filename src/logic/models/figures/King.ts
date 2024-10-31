import {king_black_icon, king_white_icon} from '../../../assets/img/chess';
import {Cell} from '../Cell';
import {Colors} from '../Colors';
import {Figure, figures} from '../Figure';

export class King extends Figure {
  constructor(base: Cell, color: Colors) {
    super(
      base,
      figures.KING,
      color,
      color === Colors.BLACK ? king_black_icon : king_white_icon,
    );
  }
  public canMove() {
    this.cell.board.kingMove(this.cell);
  }
}
