import {StyleSheet} from 'react-native';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    list: {
      width: '100%',
    },
    preview: {
      alignItems: 'center',
    },
    leagues: {
      marginVertical: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    leagueImage: {
      width: 48,
      height: 48,
    },
  });
