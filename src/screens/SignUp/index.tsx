import React, {useState} from 'react';
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
import {navigate} from '../../services/navigator/Navigator';
import {Validator} from '../../services/validation/Validator';
import Auth from '../../services/firebase/Auth';
import {SignStatuses} from '../../services/validation/SignStatuses';

const SignUp = () => {
  const {t} = useTranslation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');

  const checkValidation = () => {
    const loginValidator = new Validator(login);
    const passwordValidator = new Validator(password);

    if (
      loginValidator
        .notEmpty()
        .minLength(4)
        .maxLength(40)
        .matchMail()
        .getStatus() !== SignStatuses.SUCCESS
    ) {
      Alert.alert(`Exception. ${loginValidator.getStatus()}`);
      return;
    }

    if (
      passwordValidator
        .notEmpty()
        .minLength(5)
        .maxLength(20)
        .matchPassword()
        .getStatus() === SignStatuses.SUCCESS
    ) {
      Auth.signUp(login, password);
      Alert.alert('Success');
    } else {
      Alert.alert(`Exception. ${passwordValidator.getStatus()}`);
    }
  };

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
          <Input
            placeholder={t('repeat password')}
            inputValue={repPassword}
            setInputValue={setRepPassword}
          />
          <MainButton
            content={t('buttonSignUp')}
            active={true}
            onClick={() => {
              repPassword === password
                ? checkValidation()
                : Alert.alert('Passwords are not the same!!!');
            }}
          />
          <View style={styles.link_container}>
            <Text style={styles.text}>Or back to </Text>
            <TouchableHighlight onPress={() => navigate('SignIn')}>
              <Text style={[styles.text, styles.link]}>Sign In</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Wrapper>
  );
};

export default SignUp;
