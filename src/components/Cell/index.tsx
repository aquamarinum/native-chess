import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {Colors} from '../../logic/models/Colors';
import {styles} from './styles';
import {Figure} from '../../logic/figures/Figure';

interface CellProps {
  position: string;
  figure: Figure | null | undefined;
  color: Colors;
}

const Cell: React.FC<CellProps> = ({color, position, figure}) => {
  return (
    <View
      style={
        color === Colors.WHITE
          ? [styles.cell, styles.white]
          : [styles.cell, styles.black]
      }>
      {figure && <Image source={figure.getModel()} style={styles.image} />}
    </View>
  );
};

export default Cell;
