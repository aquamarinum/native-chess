import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import MainButton from '../../components/MainButton';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import {navigate} from '../../services/navigator/Navigator';
import {Validator} from '../../services/validation/Validator';
import Auth from '../../services/firebase/Auth';
import {SignStatuses} from '../../services/validation/SignStatuses';
import {Colors} from '../../constants/Colors';
import {useAuthInput} from '../../hooks/useAuthInput';
import Splash from '../Splash';
import Popup from '../../components/Popup';
import ShadowButton from '../../components/ShadowButton';
import Firestore from '../../services/firebase/Firestore';
import {User} from '../../types/User';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {userSelector} from '../../redux/user/selectors';
import {setCredentials} from '../../redux/user/slice';

const SignUp = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const Email = useAuthInput('email');
  const Password = useAuthInput('password');
  const RepPassword = useAuthInput('password');

  const onSubmit = () => {
    if (
      Email.fallback === SignStatuses.SUCCESS &&
      Password.fallback === SignStatuses.SUCCESS &&
      Password.value === RepPassword.value
    ) {
      dispatch(setCredentials({email: Email.value, password: Password.value}));
      navigate('Introduction');
    }
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>{t('welcome')}</Header>
          <View style={styles.inputContainer}>
            {Email.fallback !== SignStatuses.SUCCESS && (
              <Text style={styles.label}>{Email.fallback}</Text>
            )}
            <TextInput
              value={Email.value}
              onChangeText={Email.setter}
              style={
                Email.fallback !== SignStatuses.SUCCESS
                  ? [styles.input, styles.inputOutlined]
                  : styles.input
              }
              placeholder={t('login')}
              placeholderTextColor={Colors.grey_dark}
            />
          </View>
          <View style={styles.inputContainer}>
            {Password.fallback !== SignStatuses.SUCCESS && (
              <Text style={styles.label}>{Password.fallback}</Text>
            )}
            <TextInput
              value={Password.value}
              onChangeText={Password.setter}
              style={
                Password.fallback !== SignStatuses.SUCCESS
                  ? [styles.input, styles.inputOutlined]
                  : styles.input
              }
              placeholder={t('password')}
              placeholderTextColor={Colors.grey_dark}
            />
          </View>
          <View style={styles.inputContainer}>
            {RepPassword.fallback !== SignStatuses.SUCCESS && (
              <Text style={styles.label}>{RepPassword.fallback}</Text>
            )}
            <TextInput
              value={RepPassword.value}
              onChangeText={RepPassword.setter}
              style={
                RepPassword.fallback !== SignStatuses.SUCCESS
                  ? [styles.input, styles.inputOutlined]
                  : styles.input
              }
              placeholder={t('login')}
              placeholderTextColor={Colors.grey_dark}
            />
          </View>
          <MainButton
            content={t('buttonSignUp')}
            active={
              new Validator(Email.value).notEmpty().getStatus() ===
                SignStatuses.SUCCESS &&
              new Validator(Password.value).notEmpty().getStatus() ===
                SignStatuses.SUCCESS &&
              Password.value === RepPassword.value
            }
            onClick={() => onSubmit()}
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
