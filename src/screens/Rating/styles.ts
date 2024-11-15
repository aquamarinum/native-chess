import {StyleSheet} from 'react-native';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    list: {
      width: '100%',
    },
    listItem: {
      flex: 1,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 4,
      borderRadius: 5,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_dark,
    },
    imageContainer: {
      padding: 5,
    },
    image: {
      width: 30,
      height: 30,
    },
  });
