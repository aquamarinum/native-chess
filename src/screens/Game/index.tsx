import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {background_dark, background_light} from '../../assets/img';
import {styles} from './styles';
import MovesHistoryBar from '../../components/MovesHistoryBar';
import PlayerTab from '../../components/PlayerTab';
import {Board} from '../../logic/models/Board';
import Cell from '../../components/Cell';
import {CellStates} from '../../logic/models/CellStates';

const Game = () => {
  const [board, setBoard] = useState(new Board());
  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar />
      <ImageBackground source={background_dark} style={styles.wrapper}>
        <PlayerTab />
        <ScrollView>
          {board.cells.map(row => (
            <View style={{flexDirection: 'row'}}>
              {row.map(cell => (
                <Cell
                  state={CellStates.AVAILABLE}
                  color={cell.color}
                  figure={undefined}
                />
              ))}
            </View>
          ))}
        </ScrollView>
        {/* <Board /> */}
        <PlayerTab />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Game;
