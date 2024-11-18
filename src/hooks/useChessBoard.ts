import {useState} from 'react';
import {ChessColors} from '../game/models/ChessColors';
import {CellPositionType, ChessBoard} from '../game/ChessBoard';
import {CellStates} from '../game/models/CellStates';
import {MovesAggregator} from '../game/MovesAggregator';

export function useChessBoard(game: ChessBoard) {
  const [board, setBoard] = useState(game.cells);
  const [activePlayerColor, setActivePlayerColor] = useState(ChessColors.WHITE);
  const [activeCell, setActiveCell] = useState<CellPositionType | null>(null);

  const onClickCell = (target: CellPositionType) => {
    const newCells = board;
    if (activeCell) {
      const piece = game.getPieceAt(target);

      if (piece && piece.color === activePlayerColor) {
        game.clearHighlighting();
        piece.canMove(target, game);
        game.setCellState(target, CellStates.SELECTED);
        setActiveCell(target);
      }

      if (
        game.getPositionAt(target)?.state === CellStates.AVAILABLE ||
        game.getPositionAt(target)?.state === CellStates.SPECIAL
      ) {
        game.movePiece(activeCell, target);
        game.switchPlayer();
        setActivePlayerColor(
          activePlayerColor === ChessColors.WHITE
            ? ChessColors.BLACK
            : ChessColors.WHITE,
        );
        //! ADD TO PGN
        const moves = new MovesAggregator();
        const UCI_FROM = moves.convertToPGN(activeCell);
        const UCI_TO = moves.convertToPGN(target);
      }

      if (game.getPositionAt(target)?.state === CellStates.OCCUPIED) {
        game.capturePiece(target);
        game.movePiece(activeCell, target);
        game.switchPlayer();
        setActivePlayerColor(
          activePlayerColor === ChessColors.WHITE
            ? ChessColors.BLACK
            : ChessColors.WHITE,
        );
        //! ADD TO PGN
        const moves = new MovesAggregator();
        const UCI_FROM = moves.convertToPGN(activeCell);
        const UCI_TO = moves.convertToPGN(target);
      }

      game.clearHighlighting();
      setActiveCell(null);
    } else {
      const piece = game.getPieceAt(target);
      if (piece && piece.color === activePlayerColor) {
        piece.canMove(target, game);
        game.setCellState(target, CellStates.SELECTED);
        setActiveCell(target);
      }
    }
    setBoard(newCells);
  };

  return {board, onClickCell, activePlayerColor};
}