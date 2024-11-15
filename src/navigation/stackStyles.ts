import {StackNavigationOptions} from '@react-navigation/stack';
import {darkTheme, lightTheme} from '../constants/Themes';

export const createStackStyles: (a: boolean) => StackNavigationOptions = (
  isDarkMode: boolean,
) => {
  return {
    headerStyle: {
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
    headerTitleStyle: {
      color: isDarkMode
        ? lightTheme.background_light
        : darkTheme.background_dark,
      fontFamily: 'Ubuntu-Bold',
      fontSize: 22,
    },
    headerTitleAlign: 'center',
  };
};
