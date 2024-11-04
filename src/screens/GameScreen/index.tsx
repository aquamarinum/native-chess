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
import {Colors} from '../../logic/models/Colors';
import {ChessBoard} from '../../logic/ChessBoard';

const GameScreen = () => {
  const [board, setBoard] = useState(new ChessBoard());

  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar />
      <ImageBackground source={background_dark} style={styles.wrapper}>
        <PlayerTab />
        <ScrollView>
          {board.getBoard().map((row, r_idx) => (
            <View style={{flexDirection: 'row'}}>
              {row.map((col, c_idx) => (
                <Cell
                  color={
                    (r_idx + c_idx) % 2 === 0 ? Colors.WHITE : Colors.BLACK
                  }
                  figure={col}
                  isHighlighted={false}
                  onClick={() => {}}
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

export default GameScreen;
