import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const screen_width = Dimensions.get('window').width;
const cell_width = screen_width / 8;

export const styles = StyleSheet.create({
  cell: {
    width: cell_width,
    height: cell_width,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  white: {
    backgroundColor: Colors.grey_light,
  },
  black: {
    backgroundColor: Colors.grey_dark,
  },
});
