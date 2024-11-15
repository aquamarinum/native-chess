import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import {darkTheme, lightTheme} from '../../constants/Themes';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: '2%',
      padding: '2%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
      borderRadius: 8,
    },
    column: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    photo: {
      width: 30,
      height: 30,
      marginRight: '5%',
      backgroundColor: Colors.grey_light,
      borderRadius: 20,
    },
    gameType: {
      width: 10,
      height: 10,
      marginLeft: '5%',
      backgroundColor: Colors.grey_light,
    },
    gameResult: {
      width: 20,
      height: 20,
      marginLeft: '2%',
      borderRadius: 10,
    },
  });
