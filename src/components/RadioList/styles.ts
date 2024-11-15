import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    list: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    item: {
      flex: 1,
      margin: '2%',
      padding: '2%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      borderRadius: 5,
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_dark,
    },
    itemActive: {
      borderColor: Colors.aquamarine,
    },
  });
