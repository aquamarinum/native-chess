import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeTabNavigator from './HomeTabNavigator';
import Game from '../screens/Game';
import GameMode from '../screens/GameMode';
import TimeMode from '../screens/TimeMode';
import Profile from '../screens/Profile';
import Rating from '../screens/Rating';
import Settings from '../screens/Settings';
import {createStackStyles} from './stackStyles';
import StepBack from './components/StepBack';
import {goBack} from '../services/navigator/Navigator';
import {useAppSelector} from '../redux/store';
import {themeSelector} from '../redux/theme/selectors';

export type AppStackParamList = {
  HomeTab: undefined;
  Profile: undefined;
  Game: undefined;
  GameMode: undefined;
  TimeMode: undefined;
  Settings: undefined;
  Rating: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();

const AppStackNavigator = () => {
  const stackStyles = createStackStyles(useAppSelector(themeSelector));
  return (
    <AppStack.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        ...stackStyles,
        headerLeft: () => <StepBack onClick={() => goBack()} />,
      }}>
      <AppStack.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
      <AppStack.Screen name="Game" component={Game} />
      <AppStack.Screen name="GameMode" component={GameMode} />
      <AppStack.Screen name="TimeMode" component={TimeMode} />
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="Rating" component={Rating} />
      <AppStack.Screen name="Settings" component={Settings} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
