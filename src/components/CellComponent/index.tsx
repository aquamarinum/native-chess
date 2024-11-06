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
import {Cell} from '../../game/ChessCell';
import {Colors} from '../../game/Colors';

interface ICell {
  cell: Cell;
  isSelected: boolean;
  setSelected: (target: Cell) => void;
}

const getStyle = (color: Colors, isSel: boolean) => {
  const style: StyleProp<ViewStyle> = [styles.cell];
  if (isSel) {
    style.push(styles.selected);
    return style;
  }
  if (color === Colors.WHITE) style.push(styles.white);
  else style.push(styles.black);
  // switch (state) {
  //   case CellStates.DEFAULT:

  //     break;
  //   case CellStates.SELECTED:
  //     style.push(styles.selected);
  //     break;
  //   default:
  //     break;
  // }
  return style;
};

const CellComponent: React.FC<ICell> = ({cell, isSelected, setSelected}) => {
  //1. default {black / white}
  //2. selected
  //-----HIGHLIGHTING------//
  //3. occupied
  //4. available
  return (
    <TouchableWithoutFeedback onPress={() => setSelected(cell)}>
      <View style={getStyle(cell.color, isSelected)}>
        {cell.figure && (
          <Image source={cell.figure.icon} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CellComponent;
