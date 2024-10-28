import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Introduction from '../screens/Introduction';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Introduction: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="Introduction" component={Introduction} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
