import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Figure} from './Figure';

export class Pawn implements Figure {
  type: Figures;
  color: Colors;
  image: string;

  constructor(_color: Colors, _image: string) {
    this.type = Figures.PAWN;
    this.color = _color;
    this.image = _image;
  }

  canMove = () => {
    const moves = new Set<string>();
    return moves;
  };
}
