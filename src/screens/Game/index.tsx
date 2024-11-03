import React, {useEffect, useState} from 'react';
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
import {Engine} from '../../logic/GameEngine';
import {Colors} from '../../logic/models/Colors';
import {Figure} from '../../logic/figures/Figure';

const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];

const Game = () => {
  const game = new Engine();
  const renderGame = () => {
    return rows.map((row, row_idx) => (
      <View style={{flexDirection: 'row'}}>
        {cols.map((col, col_idx) => (
          <Cell
            color={(row_idx + col_idx) % 2 === 0 ? Colors.WHITE : Colors.BLACK}
            position={row + col}
            figure={game.getBoard().get(row + col)}
          />
        ))}
      </View>
    ));
  };
  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar />
      <ImageBackground source={background_dark} style={styles.wrapper}>
        <PlayerTab />
        <ScrollView>{renderGame()}</ScrollView>
        {/* <Board /> */}
        <PlayerTab />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Game;
