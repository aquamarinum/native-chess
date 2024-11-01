import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {CellStates} from '../../logic/models/CellStates';
import {Colors} from '../../logic/models/Colors';
import {styles} from './styles';

interface CellProps {
  // state: CellStates;
  // figure: ImageSourcePropType | undefined;
  color: Colors;
}

const Cell: React.FC<CellProps> = ({color}) => {
  return (
    <View
      style={
        color === Colors.WHITE
          ? [styles.cell, styles.white]
          : [styles.cell, styles.black]
      }>
      <Image source={undefined} alt="cell-figure" />
    </View>
  );
};

export default Cell;
