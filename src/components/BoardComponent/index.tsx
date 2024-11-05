import React, {ReactElement, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {
  CellCoordinatesType,
  ChessBoard,
  ChessBoardType,
} from '../../logic/ChessBoard';
import CellComponent from '../CellComponent';
import {ChessColors} from '../../logic/models/ChessColors';

type BoardComponentProps = {
  chessBoard: ChessBoard;
};

const BoardComponent: React.FC<BoardComponentProps> = ({chessBoard}) => {
  const [board, updateBoard] = useState(chessBoard);
  const [selected, setSelected] = useState<CellCoordinatesType | null>(null);

  const onSelectCell = (row: number, column: number) => {
    console.log(row, column);
    const newBoard = board;
    if (selected) {
      newBoard.movePiece(selected.y, selected.x, row, column);
      setSelected(null);
    } else {
      if (newBoard.getPieceAt(row, column)) {
        setSelected({y: row, x: column});
      }
    }
    updateBoard(newBoard);
  };

  return (
    <ScrollView>
      {board.board.map((row, row_idx) => (
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
              onClick={() => onSelectCell(row_idx, col_idx)}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BoardComponent;
