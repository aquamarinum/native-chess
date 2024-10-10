import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import Input from '../../components/Input';
import MainButton from '../../components/MainButton';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import {
  validateLogin,
  validatePassword,
  confirmPassword,
  validateInput,
} from '../../services/validation';
import AuthLink from '../../components/Alert';
import {useInput} from '../../hooks/useInput';

const SignUp = () => {
  const {t} = useTranslation();

  const onClickCreate = () => {
    Alert.alert('Account has been created');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.form}>
        <Header>{t('welcome')}</Header>
        <Input isSecret={true} placeholder={t('login')} />
        <Input isSecret={true} placeholder={t('password')} />
        <Input isSecret={true} placeholder={t('repeat password')} />
        <MainButton
          content={t('buttonSignUp')}
          active={true}
          onClick={onClickCreate}
        />
        <AuthLink
          content={t('returnSignIn')}
          link={t('signIn')}
          callback={() => {}}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
