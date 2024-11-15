import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {TextSize} from '../../constants/TextSizes';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: '2%',
      paddingHorizontal: '8%',
      borderWidth: 4,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_dark,
    },
    text: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontSize: TextSize.small,
      fontFamily: 'Ubuntu-Medium',
    },
  });
