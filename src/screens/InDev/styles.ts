import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      margin: '5%',
      paddingHorizontal: '5%',
      paddingVertical: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      borderRadius: 10,
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
  });
