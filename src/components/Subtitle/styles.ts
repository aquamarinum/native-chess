import {StyleSheet} from 'react-native';
import {TextSize} from '../../constants/TextSizes';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    subtitle: {
      margin: '1%',
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Regular',
      fontSize: TextSize.mini,
    },
  });
