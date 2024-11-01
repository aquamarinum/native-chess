import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';

export interface Figure {
  readonly type: Figures;
  readonly color: Colors;
  readonly image: string;
  position: string;
  canMove: () => Set<string>;
}
