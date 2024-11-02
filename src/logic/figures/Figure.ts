import {ImageSourcePropType} from 'react-native';
import {Colors} from '../models/Colors';
import {Figures} from '../models/Figures';
import {Models} from '../models/Models';

export interface Figure {
  readonly type: Figures;
  readonly color: Colors;
  getModel: () => Models;
  canMove: () => Set<string>;
}
