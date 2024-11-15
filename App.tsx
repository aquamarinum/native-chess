import React, {useEffect, useState} from 'react';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import AppStackNavigator from './src/navigation/AppStackNavigator';
import {navigationRef} from './src/services/navigator/Navigator';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Auth from './src/services/firebase/Auth';
import {Provider} from 'react-redux';
import {store, useAppDispatch, useAppSelector} from './src/redux/store';
import Firestore from './src/services/firebase/Firestore';
import {FetchStatus} from './src/types/FetchStatus';
import {setUser} from './src/redux/user/slice';
import AsyncStorageService from './src/services/asyncStorage';
import {setConfig} from './src/redux/theme/slice';
import {Appearance} from 'react-native';
import {configSelector} from './src/redux/theme/selectors';
import {useTranslation} from 'react-i18next';

const AppContent = () => {
  const [authStatus, setAuthStatus] = useState<FirebaseAuthTypes.User | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const {isDarkMode, language} = useAppSelector(configSelector);
  const {i18n} = useTranslation();

  const onAuthStateChanged = (status: FirebaseAuthTypes.User | null) => {
    if (status) {
      setAuthStatus(status);
    }
  };

  useEffect(() => {
    const subscriber = Auth.subscribe(onAuthStateChanged);

    AsyncStorageService.getData()
      .then(res => {
        if (res) {
          dispatch(
            setConfig({
              isDarkMode: res.theme === 'dark',
              language: res.language,
            }),
          );
          i18n.changeLanguage(res.language);
        } else {
          const colorScheme = Appearance.getColorScheme();
          if (colorScheme === 'dark') {
            setConfig({isDarkMode: true, language: 'en'});
          } else {
            setConfig({isDarkMode: false, language: 'en'});
          }
        }
      })
      .catch(err => setError(true));

    const uid = Auth.getUserId();
    if (uid) {
      setLoading(true);
      Firestore.getUserById(uid)
        .then(res => {
          if (res !== FetchStatus.FAILED) {
            //@ts-ignore
            const data = res._data;
            dispatch(setUser(data));
          }
        })
        .catch(err => setError(true))
        .finally(() => setLoading(false));
    }

    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    setLoading(true);
    AsyncStorageService.storeData({
      theme: isDarkMode ? 'dark' : 'light',
      language: language === 'ru' ? 'ru' : 'en',
    })
      .then(res => !res && setError(res))
      .catch(err => setError(true))
      .finally(() => setLoading(false));
  }, [isDarkMode, language]);

  if (loading) return <Splash />;

  return (
    <NavigationContainer ref={navigationRef}>
      {!authStatus ? <AuthStackNavigator /> : <AppStackNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
