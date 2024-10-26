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
import Auth from '../../services/firebase/Auth';
import {navigate} from '../../services/navigator/Navigator';
import {SignStatuses} from '../../services/validation/SignStatuses';
import {Validator} from '../../services/validation/Validator';
import Splash from '../Splash';
import {Colors} from '../../constants/Colors';

//'testuser@example.com', 'qwerty12345'
//admin@admin.com qwerty12345

const SignIn = () => {
  const {t} = useTranslation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SignStatuses>(SignStatuses.SUCCESS);

  const onSubmit = () => {
    setLoading(true);
    Auth.signIn(login, password).then(res => {
      setError(res);
    });
    setLoading(false);
  };

  if (loading) return <Splash />;

  //TODO !!!MODAL-UI-ERROR!!! + CLEAR ERROR = FIX INFINITY ALERT BUG
  if (error !== SignStatuses.SUCCESS) {
    Alert.alert(
      error,
      'Something gone wrong. Change your information and try again!!!',
    );
  }

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>{t('welcome')}</Header>
          <TextInput
            value={login}
            onChangeText={setLogin}
            style={styles.input}
            placeholder={t('login')}
            placeholderTextColor={Colors.grey_dark}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder={t('password')}
            placeholderTextColor={Colors.grey_dark}
          />
          <MainButton
            content={t('buttonSignIn')}
            active={
              new Validator(login).notEmpty().getStatus() ===
                SignStatuses.SUCCESS &&
              new Validator(password).notEmpty().getStatus() ===
                SignStatuses.SUCCESS
            }
            onClick={() => onSubmit()}
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
