import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {darkTheme, lightTheme} from '../../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginLeft: 5,
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Bold',
      fontSize: 22,
    },
    icon: {
      width: 28,
      height: 28,
    },
  });
