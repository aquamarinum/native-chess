import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Models} from '../models/Models';
import {Figure} from './Figure';

export class King implements Figure {
  type: Figures;
  color: Colors;

  constructor(_color: Colors) {
    this.type = Figures.KING;
    this.color = _color;
  }

  canMove = () => {
    const moves = new Set<string>();
    return moves;
  };

  getModel = () => {
    return this.color === Colors.WHITE ? Models.KING_WHITE : Models.KING_BLACK;
  };
}
