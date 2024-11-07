import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import CellComponent from '../CellComponent';
import {ChessBoard} from '../../game/ChessBoard';
import {ChessCell} from '../../game/ChessCell';

type BoardComponentProps = {
  board: ChessBoard;
  setBoard: React.Dispatch<React.SetStateAction<ChessBoard>>;
};

const BoardComponent: React.FC<BoardComponentProps> = ({board, setBoard}) => {
  console.log('RENDER BOARD');

  const [selected, setSelected] = useState<ChessCell | null>(null);

  const selectCell = (target: ChessCell) => {
    const newBoard = board;
    if (selected) {
      if (target.piece && selected.piece?.color === target.piece?.color) {
        target.piece.highlight(target.position, newBoard);
        setSelected(target);
      } else {
        newBoard.moveFigure(selected, target);
        newBoard.clearHighlighting();
        setSelected(null);
      }
    } else if (target.piece) {
      target.piece.highlight(target.position, newBoard);
      setSelected(target);
    }
    setBoard(newBoard);
  };

  return (
    <ScrollView>
      {board.cells.map((row, row_idx) => (
        <View style={styles.row}>
          {row.map((col, col_idx) => (
            <CellComponent cell={col} setSelected={selectCell} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BoardComponent;
