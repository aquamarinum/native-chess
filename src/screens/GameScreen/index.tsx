import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {background_dark, background_light} from '../../assets/img';
import {styles} from './styles';
import MovesHistoryBar from '../../components/MovesHistoryBar';
import PlayerTab from '../../components/PlayerTab';
import BoardComponent from '../../components/BoardComponent';
import {queen_black_icon, queen_white_icon} from '../../assets/img/chess';
import {Game} from '../../game/Game';
import {Player} from '../../game/Player';
import {ChessColors} from '../../game/models/ChessColors';
import {useAppSelector} from '../../redux/store';
import {themeSelector} from '../../redux/theme/selectors';
import {
  blackPlayerGameSelector,
  gameIdSelector,
  premovesSelector,
  whitePlayerGameSelector,
} from '../../redux/game/selectors';
import {useOnlineGame} from '../../hooks/useOnlineGame';
import {ChessBoard} from '../../game/ChessBoard';
import {useOfflineGame} from '../../hooks/useOfflineGame';

const GameScreen = () => {
  const premoves = useAppSelector(premovesSelector);
  const gameid = useAppSelector(gameIdSelector);
  const whitePlayer = useAppSelector(whitePlayerGameSelector);
  const blackPlayer = useAppSelector(blackPlayerGameSelector);

  const game = new Game(
    new Player(whitePlayer.name, ChessColors.WHITE, whitePlayer.rating),
    new Player(blackPlayer.name, ChessColors.BLACK, blackPlayer.rating),
    premoves,
  );

  const {board, moves, activePlayerColor, onClickCell} = useOfflineGame(
    game.board,
    gameid,
  );
  const isDarkMode = useAppSelector(themeSelector);

  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar moves={moves} />
      <ImageBackground
        source={isDarkMode ? background_dark : background_light}
        style={styles.wrapper}>
        <PlayerTab
          username={blackPlayer.name}
          elo={blackPlayer.rating}
          image={queen_black_icon}
          timeLimit={10}
          timerStatus={activePlayerColor === game.getSecondPlayer().color}
        />
        <BoardComponent board={board} onTapCell={onClickCell} />
        <PlayerTab
          username={whitePlayer.name}
          elo={whitePlayer.rating}
          image={queen_white_icon}
          timeLimit={10}
          timerStatus={activePlayerColor === game.getFirstPlayer().color}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GameScreen;
