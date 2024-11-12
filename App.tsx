import React, {useEffect, useState} from 'react';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import AppStackNavigator from './src/navigation/AppStackNavigator';
import {navigationRef} from './src/services/navigator/Navigator';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Auth from './src/services/firebase/Auth';
import {Provider} from 'react-redux';
import {store, useAppDispatch} from './src/redux/store';
import Firestore from './src/services/firebase/Firestore';
import {FetchStatus} from './src/types/FetchStatus';
import {setUser} from './src/redux/user/slice';

const AppProvider = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [_user, _setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const dispatch = useAppDispatch();

  function onAuthStateChanged(usr: FirebaseAuthTypes.User | null) {
    if (usr) {
      setLoading(true);
      Firestore.getUser(usr.uid)
        .then(res => {
          if (res !== FetchStatus.FAILED) {
            //@ts-ignore
            dispatch(setUser(res._data));
          }
        })
        .finally(() => {
          _setUser(usr);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    const subscriber = Auth.subscribe(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) return <Splash />;

  return (
    <NavigationContainer ref={navigationRef}>
      {!_user ? <AuthStackNavigator /> : <AppStackNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider />
    </Provider>
  );
};

export default App;
