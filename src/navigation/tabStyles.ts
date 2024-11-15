import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {darkTheme, lightTheme} from '../constants/Themes';

export const createTabStyles: (a: boolean) => BottomTabNavigationOptions = (
  isDarkMode: boolean,
) => {
  return {
    tabBarStyle: {
      backgroundColor: isDarkMode
        ? darkTheme.background_dark
        : lightTheme.background_light,
    },
    tabBarLabelStyle: {
      color: isDarkMode ? darkTheme.text : lightTheme.text,
    },
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
