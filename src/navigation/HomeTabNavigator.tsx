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
  home_icon,
  menu_icon,
  puzzle_icon,
  study_icon,
} from '../assets/img';
import {tabStyles} from './tabStyles';
import Home from '../screens/Home';
import Puzzles from '../screens/Puzzles';
import Lessons from '../screens/Lessons';
import Options from '../screens/Options';

export type HomeTabParamList = {
  Home: undefined;
  Puzzles: undefined;
  Lessons: undefined;
  Options: undefined;
};

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
  const {t} = useTranslation();
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
              src={home_icon}
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
              src={puzzle_icon}
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
              src={study_icon}
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
              src={menu_icon}
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
