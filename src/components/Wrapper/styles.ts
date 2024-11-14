import {StyleSheet} from 'react-native';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: '3%',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
  });
