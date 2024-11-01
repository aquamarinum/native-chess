import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Figure} from './Figure';

export class Queen implements Figure {
  type: Figures;
  color: Colors;
  image: string;
  position: string;

  constructor(_color: Colors, _image: string, _pos: string) {
    this.type = Figures.QUEEN;
    this.color = _color;
    this.image = _image;
    this.position = _pos;
  }

  canMove = () => {
    const moves = new Set<string>();
    return moves;
  };
}
