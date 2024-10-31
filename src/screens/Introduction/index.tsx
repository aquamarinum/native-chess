import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {KeyboardAvoidingView, Text, TextInput, View} from 'react-native';
import Header from '../../components/Header';
import MainButton from '../../components/MainButton';
import {styles} from './styles';
import {Colors} from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../redux/store';
import {setUsername} from '../../redux/user/slice';
import {Validator} from '../../services/validation/Validator';
import {SignStatuses} from '../../services/validation/SignStatuses';
import {navigate} from '../../services/navigator/Navigator';

const Introduction = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<SignStatuses>(SignStatuses.SUCCESS);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const status = new Validator(inputValue)
      .notEmpty()
      .matchLatin()
      .getStatus();
    if (status === SignStatuses.SUCCESS) {
      dispatch(setUsername(inputValue));
      navigate('IntroLevel');
    } else setError(status);
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>What is your name</Header>
          {error !== SignStatuses.SUCCESS && (
            <Text style={styles.label}>
              Name should contain only latin letters and no spaces
            </Text>
          )}
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
            placeholder={t('type here...')}
            placeholderTextColor={Colors.grey_dark}
          />
          <MainButton active content="Next" onClick={() => onSubmit()} />
        </KeyboardAvoidingView>
      </View>
    </Wrapper>
  );
};

export default Introduction;
