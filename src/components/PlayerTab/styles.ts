import {StyleSheet} from 'react-native';
import {TextSize} from '../../constants/TextSizes';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '3%',
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
    photo: {
      width: 60,
      height: 60,
      borderWidth: 4,
      borderRadius: 10,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      backgroundColor: isDarkMode ? darkTheme.text : lightTheme.text,
    },
    content: {
      marginHorizontal: '2%',
    },
    content_header: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Medium',
      fontSize: TextSize.small,
    },
    content_text: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Medium',
      fontSize: TextSize.mini,
    },
  });
