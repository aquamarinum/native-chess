import {StyleSheet} from 'react-native';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      padding: '7%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderTopColor: isDarkMode ? darkTheme.border : lightTheme.border,
      borderBottomColor: isDarkMode ? darkTheme.border : lightTheme.border,
    },
    image: {
      marginRight: '5%',
      width: 30,
      height: 30,
    },
  });
