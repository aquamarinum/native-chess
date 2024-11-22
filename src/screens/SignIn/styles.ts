import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {TextSize} from '../../constants/TextSizes';
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
    form: {
      alignItems: 'center',
      paddingHorizontal: '20%',
    },
    link_container: {
      marginTop: 10,
      flexDirection: 'row',
    },
    text: {
      textAlign: 'center',
      fontSize: TextSize.mini,
      color: isDarkMode ? darkTheme.text : lightTheme.text,
    },
    link: {
      textDecorationLine: 'underline',
    },
    inputContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: '3%',
    },
    input: {
      position: 'relative',
      width: '100%',
      paddingVertical: '3%',
      paddingHorizontal: '4%',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontSize: TextSize.small,
      fontFamily: 'Ubuntu-Regular',
      backgroundColor: isDarkMode
        ? darkTheme.background_light
        : lightTheme.background_dark,
    },
  });
