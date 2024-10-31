import {queen_black_icon, queen_white_icon} from '../../../assets/img/chess';
import {Cell} from '../Cell';
import {Colors} from '../Colors';
import {Figure, figures} from '../Figure';

export class Queen extends Figure {
  constructor(base: Cell, color: Colors) {
    super(
      base,
      figures.QUEEN,
      color,
      color === Colors.BLACK ? queen_black_icon : queen_white_icon,
    );
  }
  public canMove() {
    this.cell.board.rookMove(this.cell);
    this.cell.board.bishopMove(this.cell);
  }
}
