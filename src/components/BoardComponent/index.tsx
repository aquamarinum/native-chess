import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import CellComponent from '../CellComponent';
import {Board} from '../../game/ChessBoard';
import {Cell} from '../../game/ChessCell';
import {Colors} from '../../game/Colors';

const BoardComponent = () => {
  console.log('RENDER BOARD');
  const [board, setBoard] = useState(new Board());
  const [selected, setSelected] = useState<Cell | null>(null);

  const selectCell = (target: Cell) => {
    const newBoard = board;
    if (selected) {
      if (
        selected.figure?.color === target.figure?.color ||
        selected.id === target.id
      ) {
        newBoard.highlightCells(target);
        setSelected(target);
      } else {
        newBoard.moveFigure(selected, target);
        newBoard.highlightCells(null);
        setSelected(null);
      }
    } else if (target.figure) {
      newBoard.highlightCells(target);
      setSelected(target);
    }
    setBoard(newBoard);
  };

  return (
    <ScrollView>
      {board.cells.map((row, row_idx) => (
        <View style={styles.row}>
          {row.map((col, col_idx) => (
            <CellComponent
              cell={col}
              isSelected={col.id === selected?.id ? true : false}
              setSelected={selectCell}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BoardComponent;
