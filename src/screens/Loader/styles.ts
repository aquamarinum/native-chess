import {StyleSheet} from 'react-native';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
    loader: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 10,
      borderColor: isDarkMode ? darkTheme.blue : lightTheme.blue,
      borderTopColor: 'transparent',
    },
  });
