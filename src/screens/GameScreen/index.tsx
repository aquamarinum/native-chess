import React, {useState} from 'react';
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
import {gameIdSelector} from '../../redux/game/selectors';
import {useOfflineGame} from '../../hooks/useOfflineGame';
import {useOnlineGame} from '../../hooks/useOnlineGame';

const GameScreen = () => {
  const [game, setGame] = useState(
    new Game(
      new Player('play#1', ChessColors.WHITE, 1600),
      new Player('play#22', ChessColors.BLACK, 1200),
    ),
  );
  const gameid = useAppSelector(gameIdSelector);
  const {board, moves, activePlayerColor, onClickCell} = useOnlineGame(
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
          username={game.getSecondPlayer().name}
          elo={game.getSecondPlayer().getElo()}
          image={queen_black_icon}
          timeLimit={10}
          timerStatus={activePlayerColor === game.getSecondPlayer().color}
        />
        <BoardComponent board={board} onTapCell={onClickCell} />
        <PlayerTab
          username={game.getFirstPlayer().name}
          elo={game.getFirstPlayer().getElo()}
          image={queen_white_icon}
          timeLimit={10}
          timerStatus={activePlayerColor === game.getFirstPlayer().color}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GameScreen;
