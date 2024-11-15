import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {darkTheme, lightTheme} from '../../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    text: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Medium',
      fontSize: 14,
    },
    focused: {
      color: Colors.red,
    },
  });
