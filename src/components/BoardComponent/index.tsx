import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import CellComponent from '../CellComponent';
import {ChessBoard} from '../../game/ChessBoard';
import {ChessCell} from '../../game/ChessCell';
import {ChessColors} from '../../game/models/ChessColors';

type BoardComponentProps = {
  board: ChessBoard;
  setBoard: React.Dispatch<React.SetStateAction<ChessBoard>>;
};

const BoardComponent: React.FC<BoardComponentProps> = ({board, setBoard}) => {
  console.log('RENDER BOARD');

  const [activeCell, setActiveCell] = useState<ChessCell | null>(null);

  const onSelectCell = (target: ChessCell) => {
    const newBoard = board;
    //? SANDBOX MOVES
    if (target.piece) {
      if (target.piece.color === ChessColors.WHITE)
        newBoard.gameRef.setCurrentPlayer(0);
      else newBoard.gameRef.setCurrentPlayer(1);
    }

    if (activeCell) {
      if (
        activeCell.position.y === target.position.y &&
        activeCell.position.x === target.position.x
      ) {
        newBoard.clearHighlighting();
        setActiveCell(null);
      } else {
        if (target.piece && activeCell.piece?.color === target.piece.color) {
          newBoard.clearHighlighting();
          target.piece.highlight(target.position, newBoard);
          setActiveCell(target);
        } else {
          newBoard.moveFigure(activeCell, target);
          newBoard.clearHighlighting();
          setActiveCell(null);
        }
      }
    } else if (target.piece) {
      target.piece.highlight(target.position, newBoard);
      setActiveCell(target);
    }
    setBoard(newBoard);
  };

  return (
    <ScrollView>
      {board.cells.map(row => (
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
