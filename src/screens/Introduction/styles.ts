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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
  },
  input: {
    position: 'relative',
    width: '100%',
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
  inputOutlined: {
    borderColor: Colors.red,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    color: Colors.red,
    fontSize: TextSize.mini,
    fontFamily: 'Ubuntu-Regular',
  },
});
