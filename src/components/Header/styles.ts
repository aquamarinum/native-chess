import {StyleSheet} from 'react-native';
import {TextSize} from '../../constants/TextSizes';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    header: {
      marginBottom: '4%',
      padding: '1%',
      fontSize: TextSize.large,
      color: isDarkMode
        ? lightTheme.background_light
        : darkTheme.background_dark,
      fontFamily: 'Ubuntu-Bold',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
  });
