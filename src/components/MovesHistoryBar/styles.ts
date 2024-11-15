import {StyleSheet} from 'react-native';
import {TextSize} from '../../constants/TextSizes';
import {Colors} from '../../constants/Colors';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    list: {
      width: '100%',
      padding: '3%',
      backgroundColor: isDarkMode
        ? darkTheme.background_light
        : lightTheme.background_dark,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
    },
    container: {
      marginHorizontal: 10,
    },
    text: {
      fontSize: TextSize.mini,
      fontFamily: 'Ubuntu-Regular',
    },
    white: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
    },
    black: {
      color: isDarkMode ? lightTheme.text : darkTheme.text,
    },
  });
