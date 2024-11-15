import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {darkTheme, lightTheme} from '../../constants/Themes';

const screen_width = Dimensions.get('screen').width;

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    overlay: {
      width: screen_width,
      paddingHorizontal: '5%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099',
    },
    modal: {
      width: '100%',
      borderWidth: 4,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      borderRadius: 10,
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
    content: {
      padding: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttons: {
      flexDirection: 'row',
    },
  });
