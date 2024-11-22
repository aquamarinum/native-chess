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
import {setGameId, setPremoves} from '../../redux/game/slice';
import {LichessApiService} from '../../services/lichess/LichessApiService';
import Splash from '../Splash';

const GameConnect = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const styles = createStyles(useAppSelector(themeSelector));
  const dispatch = useAppDispatch();

  const onStartGame = () => {
    setLoading(true);
    dispatch(setGameId(inputValue));
    new LichessApiService(inputValue)
      .getGameState()
      .then(res => {
        if (res && res.moves) {
          const newMoves: string[] = res.moves.split(' ');
          dispatch(setPremoves(newMoves));
          navigate('GameScreen');
        }
      })
      .catch(err => setError(true))
      .finally(() => setLoading(false));
  };

  if (loading) return <Splash />;

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>Connect</Header>
          <View style={styles.inputContainer}>
            {error && (
              <Text style={styles.label}>Wrong game code or no internet</Text>
            )}
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
