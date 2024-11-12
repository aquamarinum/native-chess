import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import CellComponent from '../CellComponent';
import {CellPositionType, ChessBoard} from '../../game/ChessBoard';
import {ChessCell} from '../../game/ChessCell';
import {ChessColors} from '../../game/models/ChessColors';

type BoardComponentProps = {
  board: ChessBoard;
  setBoard: React.Dispatch<React.SetStateAction<ChessBoard>>;
  setTimer: React.Dispatch<React.SetStateAction<ChessColors>>;
};

const BoardComponent: React.FC<BoardComponentProps> = ({
  board,
  setBoard,
  setTimer,
}) => {
  console.log('[+] RENDER BOARD');

  const [activeCell, setActiveCell] = useState<CellPositionType | null>(null);

  const onSelectCell = (target: ChessCell) => {
    const newBoard = board;

    newBoard.onClickCell(target.position);
    setActiveCell(newBoard.getActivePosition());
    setTimer(newBoard.activePlayerColor);
    setBoard(newBoard);
  };

  return (
    <ScrollView>
      {board.getBoard().map(row => (
        <View style={styles.row}>
          {row.map(cell => (
            <CellComponent cell={cell} setSelected={() => onSelectCell(cell)} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BoardComponent;
