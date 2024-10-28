import React, {useEffect, useState} from 'react';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import AppStackNavigator from './src/navigation/AppStackNavigator';
import {navigationRef} from './src/services/navigator/Navigator';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Auth from './src/services/firebase/Auth';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = Auth.subscribe(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) return <Splash />;

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {!user ? <AuthStackNavigator /> : <AppStackNavigator />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
