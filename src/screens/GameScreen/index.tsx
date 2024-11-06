import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {background_dark, background_light} from '../../assets/img';
import {styles} from './styles';
import MovesHistoryBar from '../../components/MovesHistoryBar';
import PlayerTab from '../../components/PlayerTab';
import BoardComponent from '../../components/BoardComponent';
import {queen_black_icon, rook_white_icon} from '../../assets/img/chess';

const GameScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar />
      <ImageBackground source={background_dark} style={styles.wrapper}>
        <PlayerTab username={'kkk'} elo={1200} image={rook_white_icon} />
        <BoardComponent />
        <PlayerTab username={'kkkkk'} elo={900} image={queen_black_icon} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GameScreen;
