import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import CellComponent from '../CellComponent';
import {CellPositionType, ChessBoard} from '../../game/ChessBoard';
import {ChessCell} from '../../game/ChessCell';

type BoardComponentProps = {
  board: Array<Array<ChessCell>>;
  onTapCell: (target: CellPositionType) => void;
};

const BoardComponent: React.FC<BoardComponentProps> = ({board, onTapCell}) => {
  return (
    <ScrollView>
      {board.map((row, rowidx) => (
        <View style={styles.row} key={rowidx}>
          {row.map((cell, cellidx) => (
            <CellComponent
              cell={cell}
              key={rowidx + '' + cellidx}
              setSelected={() => onTapCell(cell.position)}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BoardComponent;
