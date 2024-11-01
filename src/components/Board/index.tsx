import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

const ARR: ReactElement<View>[] = [];

for (let i = 0; i < 64; i++) {
  ARR.push(<View style={styles.cell}></View>);
}

const Board = () => {
  return <View style={styles.board}>{ARR}</View>;
};

export default Board;
