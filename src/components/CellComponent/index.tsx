import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';
import {ChessCell} from '../../game/ChessCell';
import {CellStates} from '../../game/models/CellStates';
import {ChessColors} from '../../game/models/ChessColors';

interface ICell {
  cell: ChessCell;
  setSelected: (target: ChessCell) => void;
}

const getStyle = (color: ChessColors, state: CellStates) => {
  const style: StyleProp<ViewStyle> = [styles.cell];
  switch (state) {
    case CellStates.DEFAULT:
      color === ChessColors.WHITE
        ? style.push(styles.white)
        : style.push(styles.black);
      break;
    case CellStates.SELECTED:
      style.push(styles.selected);
      break;
    case CellStates.AVAILABLE:
      style.push(styles.highlighted);
      break;
    case CellStates.OCCUPIED:
      style.push(styles.occupied);
      break;
    default:
      break;
  }
  return style;
};

const CellComponent: React.FC<ICell> = ({cell, setSelected}) => {
  //1. default {black / white}
  //2. selected
  //-----HIGHLIGHTING------//
  //3. occupied
  //4. available
  return (
    <TouchableWithoutFeedback onPress={() => setSelected(cell)}>
      <View style={getStyle(cell.color, cell.state)}>
        {cell.piece && <Image source={cell.piece.model} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CellComponent;
