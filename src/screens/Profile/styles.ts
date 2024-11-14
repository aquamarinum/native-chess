import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const screen_width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  photoContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey_light,
    borderWidth: 4,
    borderColor: Colors.grey_dark,
    borderRadius: 100,
  },
  photo: {
    width: screen_width * 0.3,
    height: screen_width * 0.3,
  },
  buttons: {
    width: '100%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
