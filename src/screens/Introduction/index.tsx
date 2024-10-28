import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {KeyboardAvoidingView, TextInput, View} from 'react-native';
import Header from '../../components/Header';
import MainButton from '../../components/MainButton';
import {styles} from './styles';
import {Colors} from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import Firestore from '../../services/firebase/Firestore';
import {FetchStatus} from '../../types/FetchStatus';
import {navigate} from '../../services/navigator/Navigator';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {userNameSelector, userSelector} from '../../redux/user/selectors';
import {setUser, setUsername} from '../../redux/user/slice';

const introSequence = [
  'Enter Your Name',
  'Choose your level',
  'Write some words',
  'Other...',
];

const Introduction = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(FetchStatus.SUCCESS);
  const [page, setPage] = useState(0);
  const {t} = useTranslation();
  const usr = useAppSelector(userNameSelector);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    //? OR DO SIGNUP->NAMESCREEN->LEVELSCREEN->BIO->COUNTRY->...->DO_SIGNUP()
    if (page >= 2) {
      setPage(0);
      //!DO SIGNUP INSTEAD NAVIGATE
      navigate('SignUp');
    }
    //push to redux
    //dispatch(setUsername('Petya'));
    setInputValue('');
    setPage(prev => prev + 1);
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>{introSequence[page] + usr}</Header>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
            placeholder={t('name')}
            placeholderTextColor={Colors.grey_dark}
          />
          <MainButton active content="Next" onClick={() => onSubmit()} />
        </KeyboardAvoidingView>
      </View>
    </Wrapper>
  );
};

export default Introduction;
