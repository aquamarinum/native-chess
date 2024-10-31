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
import Popup from '../../components/Popup';
import ShadowButton from '../../components/ShadowButton';
import {useAppDispatch} from '../../redux/store';
import {setUser} from '../../redux/user/slice';

//'testuser@example.com', 'qwerty12345'
//admin@admin.com qwerty12345

const SignIn = () => {
  const {t} = useTranslation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<SignStatuses>(SignStatuses.SUCCESS);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    setLoading(true);
    Auth.signIn(login, password)
      .then(res => {
        if (res) {
          console.log(res);
          //@ts-ignore
          dispatch(setUser(res));
          setStatus(SignStatuses.SUCCESS);
        } else setStatus(SignStatuses.FAILED);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <Splash />;

  if (status !== SignStatuses.SUCCESS) {
    setStatus(SignStatuses.SUCCESS);
    setModalVisible(true);
  }

  return (
    <Wrapper>
      <Popup
        header={status}
        text="Invalid email or password. Check your data and try again."
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        buttonLeft={() => (
          <ShadowButton content="ok" event={() => setModalVisible(false)} />
        )}
      />
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
