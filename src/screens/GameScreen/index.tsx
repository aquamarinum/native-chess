import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {background_dark, background_light} from '../../assets/img';
import {styles} from './styles';
import MovesHistoryBar from '../../components/MovesHistoryBar';
import PlayerTab from '../../components/PlayerTab';
import {ChessColors} from '../../logic/models/ChessColors';
import BoardComponent from '../../components/BoardComponent';
import {Game} from '../../logic/Game';
import {Player} from '../../logic/Player';
import {queen_black_icon, rook_white_icon} from '../../assets/img/chess';

const GameScreen = () => {
  const playerWhite = new Player('Player1', ChessColors.WHITE, 1600);
  const playerBlack = new Player('Player2', ChessColors.BLACK, 1200);
  const Chess = new Game(playerWhite, playerBlack);

  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar />
      <ImageBackground source={background_dark} style={styles.wrapper}>
        <PlayerTab
          username={playerWhite.getName()}
          elo={playerWhite.getElo()}
          image={rook_white_icon}
        />
        <BoardComponent board={Chess.getBoard()} />
        <PlayerTab
          username={playerBlack.getName()}
          elo={playerBlack.getElo()}
          image={queen_black_icon}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GameScreen;
