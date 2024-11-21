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
import {
  setGameId,
  setGameSpeed,
  setPremoves,
  setWhitePlayer,
} from '../../redux/game/slice';
import {LichessApiService} from '../../services/lichess/LichessApiService';
import Splash from '../Splash';

const GameConnect = () => {
  const [inputValue, setInputValue] = useState('');
  const styles = createStyles(useAppSelector(themeSelector));
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onStartGame = () => {
    dispatch(setGameId(inputValue));
    setLoading(true);
    const lichess = new LichessApiService(inputValue);
    lichess
      .connectToGame()
      .then(res => {
        if (res) {
          console.log('THISiii IS RES', res);
          const whitePlayerData = res.white;
          const blackPlayerData = res.black;
          // if (whitePlayerData) {
          //   dispatch(
          //     setWhitePlayer({
          //       name: whitePlayerData.name,
          //       rating: whitePlayerData.rating,
          //     }),
          //   );
          // }
          // if (blackPlayerData) {
          //   dispatch(
          //     setWhitePlayer({
          //       name: blackPlayerData.name,
          //       rating: blackPlayerData.rating,
          //     }),
          //   );
          // }
          const premoves: string[] = res.state.moves.split(' ');
          dispatch(setPremoves(premoves));
          dispatch(setGameSpeed(res.speed));
          navigate('GameScreen');
        } else {
          throw new Error('Something gone wrong. Try again');
        }
      })
      .catch(error => setError(true))
      .finally(() => setLoading(false));
  };

  if (loading) return <Splash />;

  return (
    <Wrapper>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.form}>
          <Header>Connect</Header>
          <View style={styles.inputContainer}>
            {error && <Text style={styles.label}>Wrong id</Text>}
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="game code"
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
