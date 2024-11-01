import React, {useState} from 'react';
import {
  Image,
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
import Cell from '../../components/Cell';
import {CellStates} from '../../logic/models/CellStates';
import {Engine} from '../../logic/GameEngine';
import {Colors} from '../../logic/models/Colors';

const Game = () => {
  const [game, setGame] = useState(new Engine());
  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar />
      <ImageBackground source={background_dark} style={styles.wrapper}>
        <PlayerTab />
        <ScrollView>
          {game.getBoard().map((row, row_idx) => (
            <View style={{flexDirection: 'row'}}>
              {row.map((cell, cell_idx) => (
                <Cell
                  color={
                    (row_idx + cell_idx) % 2 === 0 ? Colors.WHITE : Colors.BLACK
                  }
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
