import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  listItem: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 5,
    borderColor: Colors.grey_dark,
    backgroundColor: Colors.dark_black,
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    width: 30,
    height: 30,
  },
});
