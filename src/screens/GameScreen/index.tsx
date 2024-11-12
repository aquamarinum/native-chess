import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {background_dark, background_light} from '../../assets/img';
import {styles} from './styles';
import MovesHistoryBar from '../../components/MovesHistoryBar';
import PlayerTab from '../../components/PlayerTab';
import BoardComponent from '../../components/BoardComponent';
import {queen_black_icon, rook_white_icon} from '../../assets/img/chess';
import {Game} from '../../game/Game';
import {Player} from '../../game/Player';
import {ChessColors} from '../../game/models/ChessColors';

const GameScreen = () => {
  const [game, setGame] = useState(
    new Game(
      new Player('play#1', ChessColors.WHITE, 1600),
      new Player('play#22', ChessColors.BLACK, 1200),
    ),
  );

  const [board, setBoard] = useState(game.getBoard());
  const [moves, setMoves] = useState(game.getBoard().moves.getMoves());
  const [firstPlayer, setFirstPlayer] = useState(game.getFirstPlayer());
  const [secondPlayer, setSecondPlayer] = useState(game.getSecondPlayer());

  const [activeTimer, setActiveTimer] = useState(ChessColors.WHITE);

  return (
    <SafeAreaView style={styles.container}>
      <MovesHistoryBar moves={moves} />
      <ImageBackground source={background_dark} style={styles.wrapper}>
        <PlayerTab
          username={secondPlayer.name}
          elo={secondPlayer.getElo()}
          image={rook_white_icon}
          timeLimit={10}
          timerStatus={activeTimer === secondPlayer.color}
        />
        <BoardComponent
          board={board}
          setBoard={setBoard}
          setTimer={setActiveTimer}
        />
        <PlayerTab
          username={firstPlayer.name}
          elo={firstPlayer.getElo()}
          image={queen_black_icon}
          timeLimit={10}
          timerStatus={activeTimer === firstPlayer.color}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GameScreen;
