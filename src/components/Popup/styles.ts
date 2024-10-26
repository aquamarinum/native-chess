import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {TextSize} from '../../constants/TextSizes';

const screen_width = Dimensions.get('screen').width;
const screen_height = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  overlay: {
    width: screen_width,
    paddingHorizontal: '5%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modal: {
    width: '100%',
    borderWidth: 4,
    borderColor: Colors.grey_dark,
    borderRadius: 10,
    backgroundColor: Colors.dark_black,
  },
  content: {
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
});
