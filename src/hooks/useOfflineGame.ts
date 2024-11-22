import {useState} from 'react';
import {CellPositionType, ChessBoard} from '../game/ChessBoard';
import {CellStates} from '../game/models/CellStates';
import {ChessColors} from '../game/models/ChessColors';
import {MovesAggregator} from '../game/MovesAggregator';

export function useOfflineGame(game: ChessBoard, gameid: string) {
  const converter = new MovesAggregator();
  const [board, setBoard] = useState(game.cells);
  const [moves, setMoves] = useState<Array<string>>(['']);
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
        return;
      }

      if (
        game.getPositionAt(target)?.state === CellStates.AVAILABLE ||
        game.getPositionAt(target)?.state === CellStates.SPECIAL
      ) {
        game.movePiece(activeCell, target);
        game.switchPlayer();
        setMoves(prev => [
          ...prev,
          converter.convertToPGN(activeCell) + converter.convertToPGN(target),
        ]);
        setActivePlayerColor(
          activePlayerColor === ChessColors.WHITE
            ? ChessColors.BLACK
            : ChessColors.WHITE,
        );
      }

      if (game.getPositionAt(target)?.state === CellStates.OCCUPIED) {
        game.capturePiece(target);
        game.movePiece(activeCell, target);
        game.switchPlayer();
        setMoves(prev => [
          ...prev,
          converter.convertToPGN(activeCell) + converter.convertToPGN(target),
        ]);
        setActivePlayerColor(
          activePlayerColor === ChessColors.WHITE
            ? ChessColors.BLACK
            : ChessColors.WHITE,
        );
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
  return {board, moves, onClickCell, activePlayerColor};
}
