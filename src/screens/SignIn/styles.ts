import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {TextSize} from '../../constants/TextSizes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black_black,
  },
  form: {
    alignItems: 'center',
  },
  link_container: {
    marginTop: 10,
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: TextSize.mini,
    color: Colors.grey_light,
  },
  link: {
    textDecorationLine: 'underline',
  },
  input: {
    position: 'relative',
    width: '100%',
    marginVertical: '3%',
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.grey_dark,
    color: Colors.grey_light,
    fontSize: TextSize.small,
    fontFamily: 'Ubuntu-Regular',
    backgroundColor: Colors.dark_black,
  },
});
