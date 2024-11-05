import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ChessColors} from '../../logic/models/ChessColors';
import {styles} from './styles';
import {ChessPiece} from '../../logic/ChessPiece';

interface CellComponentProps {
  figure: ChessPiece | null;
  color: ChessColors;
  isHighlighted: boolean;
  onClick: () => void;
}

const CellComponent: React.FC<CellComponentProps> = ({
  color,
  figure,
  onClick,
  isHighlighted,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={
          color === ChessColors.WHITE
            ? [styles.cell, styles.white]
            : [styles.cell, styles.black]
        }>
        {figure && (
          <Image source={figure.getViewModel()} style={styles.image} />
        )}
        {isHighlighted && <View style={styles.highlighted}></View>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CellComponent;
