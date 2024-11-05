import React, {ReactElement} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {ChessBoardType} from '../../logic/ChessBoard';
import CellComponent from '../CellComponent';
import {ChessColors} from '../../logic/models/ChessColors';

type BoardComponentProps = {
  board: ChessBoardType;
};

const BoardComponent: React.FC<BoardComponentProps> = ({board}) => {
  return (
    <ScrollView>
      {board.map((row, row_idx) => (
        <View style={styles.row}>
          {row.map((col, col_idx) => (
            <CellComponent
              figure={col}
              color={
                (row_idx + col_idx) % 2 === 0
                  ? ChessColors.WHITE
                  : ChessColors.BLACK
              }
              isHighlighted={false}
              onClick={() => console.log(row_idx + '' + col_idx)}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BoardComponent;
