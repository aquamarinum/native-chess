import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Colors} from '../../logic/models/Colors';
import {styles} from './styles';
import {ChessPiece} from '../../logic/ChessPiece';

interface CellProps {
  figure: ChessPiece | null;
  color: Colors;
  isHighlighted: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({color, figure, onClick, isHighlighted}) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={
          color === Colors.WHITE
            ? [styles.cell, styles.white]
            : [styles.cell, styles.black]
        }>
        {isHighlighted && <View style={styles.highlighted}></View>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Cell;
