import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Models} from '../models/Models';
import {Figure} from './Figure';

export class Pawn implements Figure {
  type: Figures;
  color: Colors;

  constructor(_color: Colors) {
    this.type = Figures.PAWN;
    this.color = _color;
  }

  canMove = (position: string) => {
    const moves = new Set<string>();
    return moves;
  };

  getModel = () => {
    return this.color === Colors.WHITE ? Models.PAWN_WHITE : Models.PAWN_BLACK;
  };
}
