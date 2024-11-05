import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const screen_width = Dimensions.get('window').width;
const cell_width = screen_width / 8;

export const styles = StyleSheet.create({
  board: {
    width: screen_width,
    height: screen_width,
    flexWrap: 'wrap',
    backgroundColor: Colors.grey_light,
  },
  row: {
    flexDirection: 'row',
  },
});
