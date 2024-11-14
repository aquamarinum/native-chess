import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    flex: 1,
    margin: '2%',
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.grey_dark,
    borderRadius: 5,
    backgroundColor: Colors.dark_black,
  },
  itemActive: {
    borderColor: Colors.aquamarine,
  },
});
