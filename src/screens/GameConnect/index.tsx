import React, {useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {KeyboardAvoidingView, Text, TextInput, View} from 'react-native';
import Header from '../../components/Header';
import MainButton from '../../components/MainButton';
import {navigate} from '../../services/navigator/Navigator';
import {Colors} from '../../constants/Colors';
import {createStyles} from './styles';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';
import {setGameId} from '../../redux/game/slice';

const GameConnect = () => {
  const [inputValue, setInputValue] = useState('');
  const styles = createStyles(useAppSelector(themeSelector));
  const dispatch = useAppDispatch();

  const onStartGame = () => {
    dispatch(setGameId(inputValue));
    navigate('GameScreen');
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>Connect</Header>
          <View style={styles.inputContainer}>
            <Text style={styles.label}></Text>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="gameid"
              placeholderTextColor={Colors.grey_dark}
              style={styles.input}
            />
          </View>
          <MainButton
            active={inputValue.length > 3}
            content="Connect"
            onClick={onStartGame}
          />
        </KeyboardAvoidingView>
      </View>
    </Wrapper>
  );
};

export default GameConnect;
