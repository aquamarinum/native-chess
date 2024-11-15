import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import TabText from './components/TabText';
import TabIcon from './components/TabIcon';
import {useTranslation} from 'react-i18next';
import {
  focused_home_icon,
  focused_menu_icon,
  focused_puzzle_icon,
  focused_study_icon,
  home_icon_dark,
  menu_icon_dark,
  puzzle_icon_dark,
  study_icon_dark,
  home_icon_light,
  menu_icon_light,
  puzzle_icon_light,
  study_icon_light,
} from '../assets/img';
import {createTabStyles} from './tabStyles';
import Home from '../screens/Home';
import Puzzles from '../screens/Puzzles';
import Lessons from '../screens/Lessons';
import Options from '../screens/Options';
import {useAppSelector} from '../redux/store';
import {themeSelector} from '../redux/theme/selectors';

export type HomeTabParamList = {
  Home: undefined;
  Puzzles: undefined;
  Lessons: undefined;
  Options: undefined;
};

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
  const {t} = useTranslation();
  const isDarkMode = useAppSelector(themeSelector);
  const tabStyles = createTabStyles(isDarkMode);
  return (
    <HomeTab.Navigator screenOptions={{...tabStyles}} initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({focused}) => (
            <TabText content={t('Play')} focused={focused} />
          ),
          tabBarIcon: ({focused}) => (
            <TabIcon
              src={isDarkMode ? home_icon_light : home_icon_dark}
              src_active={focused_home_icon}
              focused={focused}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="Puzzles"
        component={Puzzles}
        options={{
          tabBarLabel: ({focused}) => (
            <TabText content={t('Puzzles')} focused={focused} />
          ),
          tabBarIcon: ({focused}) => (
            <TabIcon
              src={isDarkMode ? puzzle_icon_light : puzzle_icon_dark}
              src_active={focused_puzzle_icon}
              focused={focused}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="Lessons"
        component={Lessons}
        options={{
          tabBarLabel: ({focused}) => (
            <TabText content={t('Study')} focused={focused} />
          ),
          tabBarIcon: ({focused}) => (
            <TabIcon
              src={isDarkMode ? study_icon_light : study_icon_dark}
              src_active={focused_study_icon}
              focused={focused}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="Options"
        component={Options}
        options={{
          tabBarLabel: ({focused}) => (
            <TabText content={t('Options')} focused={focused} />
          ),
          tabBarIcon: ({focused}) => (
            <TabIcon
              src={isDarkMode ? menu_icon_light : menu_icon_dark}
              src_active={focused_menu_icon}
              focused={focused}
            />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabNavigator;
