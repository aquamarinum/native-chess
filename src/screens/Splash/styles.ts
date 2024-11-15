import {StyleSheet} from 'react-native';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
    logo: {
      width: 100,
      height: 100,
    },
  });
