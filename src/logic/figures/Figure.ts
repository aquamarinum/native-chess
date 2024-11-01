import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';

export interface Figure {
  readonly type: Figures;
  readonly color: Colors;
  readonly image: string;
  canMove: () => Set<string>;
}
