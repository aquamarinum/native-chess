import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {TextSize} from '../../constants/TextSizes';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 3,
      padding: '5%',
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth: 4,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      backgroundColor: isDarkMode
        ? darkTheme.background_light
        : lightTheme.background_light,
    },
    preview: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderRadius: 10,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
    },
    image: {
      width: 80,
      height: 80,
    },
    content: {
      marginLeft: 10,
      justifyContent: 'space-evenly',
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating_icon: {
      width: 30,
      height: 30,
    },
    rating_content: {
      marginLeft: 10,
      color: isDarkMode
        ? lightTheme.background_light
        : darkTheme.background_dark,
      fontFamily: 'Ubuntu-Medium',
      fontSize: TextSize.mini,
    },
  });
