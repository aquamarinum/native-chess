import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Models} from '../models/Models';
import {Figure} from './Figure';

export class Knight implements Figure {
  type: Figures;
  color: Colors;

  constructor(_color: Colors) {
    this.type = Figures.KNIGHT;
    this.color = _color;
  }

  canMove = (position: string) => {
    const moves = new Set<string>();
    return moves;
  };

  getModel = () => {
    return this.color === Colors.WHITE
      ? Models.KNIGHT_WHITE
      : Models.KNIGHT_BLACK;
  };
}
