import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {TextSize} from '../../constants/TextSizes';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    title: {
      margin: '2%',
      color: isDarkMode ? darkTheme.text : lightTheme.text,
      fontFamily: 'Ubuntu-Bold',
      fontSize: TextSize.small,
    },
  });
