import {knight_black_icon, knight_white_icon} from '../../../assets/img/chess';
import {Cell} from '../Cell';
import {Colors} from '../Colors';
import {Figure, figures} from '../Figure';

export class Knight extends Figure {
  constructor(base: Cell, color: Colors) {
    super(
      base,
      figures.KNIGHT,
      color,
      color === Colors.BLACK ? knight_black_icon : knight_white_icon,
    );
  }
  public canMove() {
    this.cell.board.knightMove(this.cell);
  }
}
