import {StyleSheet} from 'react-native';
import {TextSize} from '../../constants/TextSizes';
import {darkTheme, lightTheme} from '../../constants/Themes';

<<<<<<< HEAD
export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '3%',
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
    photo: {
      width: 60,
      height: 60,
      borderWidth: 4,
      borderRadius: 10,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      backgroundColor: isDarkMode ? darkTheme.text : lightTheme.text,
    },
    content: {
      marginHorizontal: '2%',
    },
    content_header: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Medium',
      fontSize: TextSize.small,
    },
    content_text: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Medium',
      fontSize: TextSize.mini,
    },
  });
=======
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
    backgroundColor: Colors.dark_black,
  },
  frame: {
    padding: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: Colors.grey_dark,
    backgroundColor: Colors.grey_light,
  },
  photo: {
    width: 40,
    height: 40,
  },
  content: {
    marginHorizontal: '2%',
  },
  content_header: {
    color: Colors.grey_light,
    fontFamily: 'Ubuntu-Medium',
    fontSize: TextSize.small,
  },
  content_text: {
    color: Colors.grey_light,
    fontFamily: 'Ubuntu-Medium',
    fontSize: TextSize.mini,
  },
});
>>>>>>> merge-gamecore
