import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Models} from '../models/Models';
import {Figure} from './Figure';

export class Queen implements Figure {
  type: Figures;
  color: Colors;

  constructor(_color: Colors) {
    this.type = Figures.QUEEN;
    this.color = _color;
  }

  canMove = () => {
    const moves = new Set<string>();
    return moves;
  };

  getModel = () => {
    return this.color === Colors.WHITE
      ? Models.QUEEN_WHITE
      : Models.QUEEN_BLACK;
  };
}
