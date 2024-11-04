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
import {Figure} from '../../logic/figures/Figure';

interface CellProps {
  position: string;
  figure: Figure | null | undefined;
  color: Colors;
  isHighlighted: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({
  color,
  position,
  figure,
  onClick,
  isHighlighted,
}) => {
  if (isHighlighted) console.log('Highlighted ', position);
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View
        style={
          color === Colors.WHITE
            ? [styles.cell, styles.white]
            : [styles.cell, styles.black]
        }>
        {isHighlighted && <View style={styles.highlighted}></View>}
        {figure && <Image source={figure.getModel()} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Cell;
