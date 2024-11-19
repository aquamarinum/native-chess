import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const screen_width = Dimensions.get('window').width;
const cell_width = screen_width / 8;

export const styles = StyleSheet.create({
  cell: {
    position: 'relative',
    width: cell_width,
    height: cell_width,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  white: {
    backgroundColor: Colors.grey_light,
  },
  black: {
    backgroundColor: Colors.grey_dark,
  },
  selected: {
    backgroundColor: Colors.aquamarine,
  },
  occupied: {
    backgroundColor: Colors.red,
  },
  highlighted: {
    backgroundColor: Colors.aquamarine,
  },
  image: {
    width: 20,
    height: 30,
  },
});
