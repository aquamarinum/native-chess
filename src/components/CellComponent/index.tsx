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
import {Palette} from '../../game/models/Palette';

interface ICell {
  cell: ChessCell;
  setSelected: () => void;
}

const CellComponent: React.FC<ICell> = ({cell, setSelected}) => {
  const getBackgroundColor = () => {
    switch (cell.state) {
      case CellStates.DEFAULT:
        if (cell.color === ChessColors.WHITE) return Palette.white;
        else return Palette.black;
      case CellStates.SELECTED:
        return Palette.yellow;
      case CellStates.AVAILABLE:
        return Palette.green;
      case CellStates.OCCUPIED:
        return Palette.red;
      case CellStates.SPECIAL:
        return Palette.blue;
      case CellStates.THREATENED:
        return Palette.red;
      default:
        return undefined;
    }
  };
  return (
    <TouchableWithoutFeedback onPress={setSelected}>
      <View style={[styles.cell, {backgroundColor: getBackgroundColor()}]}>
        {cell.piece && <Image source={cell.piece.model} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CellComponent;
