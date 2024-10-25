import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Input from '../../components/Input';
import MainButton from '../../components/MainButton';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import Auth from '../../services/firebase/Auth';
import {navigate} from '../../services/navigator/Navigator';
import {SignStatuses} from '../../services/validation/SignStatuses';
import {Validator} from '../../services/validation/Validator';
import Splash from '../Splash';
import Title from '../../components/Title';

//'testuser@example.com', 'qwerty12345'
//admin@admin.com qwerty12345

const SignIn = () => {
  const {t} = useTranslation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkValidation = () => {
    const loginValidator = new Validator(login);
    const passwordValidator = new Validator(password);

    if (
      loginValidator.notEmpty().matchMail().getStatus() !== SignStatuses.SUCCESS
    ) {
      Alert.alert(`Exception. ${loginValidator.getStatus()}`);
      return;
    }

    if (
      passwordValidator.notEmpty().matchPassword().getStatus() ===
      SignStatuses.SUCCESS
    ) {
      setLoading(true);
      Auth.signIn(login, password)
        .then(res => Alert.alert('success'))
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            setError('Неправильный пароль!');
          } else if (error.code === 'auth/user-not-found') {
            setError('Пользователь не найден!');
          } else if (error.code === 'auth/invalid-email') {
            setError('Некорректный email!');
          } else {
            setError(String(error));
          }
        })
        .finally(() => setLoading(false));
    } else {
      Alert.alert(`Exception. ${passwordValidator.getStatus()}`);
    }
  };
  if (error)
    return (
      <Wrapper>
        <Title>{error}</Title>
      </Wrapper>
    );

  if (loading) return <Splash />;

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>{t('welcome')}</Header>
          <Input
            placeholder={t('login')}
            inputValue={login}
            setInputValue={setLogin}
          />
          <Input
            placeholder={t('password')}
            inputValue={password}
            setInputValue={setPassword}
          />
          <MainButton
            content={t('buttonSignIn')}
            active={true}
            onClick={() => checkValidation()}
          />
          <View style={styles.link_container}>
            <Text style={styles.text}>New to native chess? Click to </Text>
            <TouchableHighlight onPress={() => navigate('SignUp')}>
              <Text style={[styles.text, styles.link]}>Sign Up</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Wrapper>
  );
};

export default SignIn;
