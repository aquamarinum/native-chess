import React, {ReactNode} from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import Subtitle from '../Subtitle';
import {createStyles} from './styles';
import {Colors} from '../../constants/Colors';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';

type TableItem = {
  column_id: number;
  column_size: number;
  content: ReactNode;
};

const GameCardMini = () => {
  const styles = createStyles(useAppSelector(themeSelector));
  return (
    <TouchableHighlight onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.photo}>{/* <Image /> */}</View>
          <Subtitle>Player#123</Subtitle>
        </View>
        <View style={styles.column}>
          <Subtitle>Rapid</Subtitle>
          <View style={styles.gameType}></View>
        </View>
        <View style={styles.column}>
          <Subtitle>-15</Subtitle>
          <View
            style={[
              styles.gameResult,
              {backgroundColor: Colors.aquamarine},
            ]}></View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default GameCardMini;
