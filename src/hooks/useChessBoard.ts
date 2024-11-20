import {useEffect, useState} from 'react';
import {ChessColors} from '../game/models/ChessColors';
import {CellPositionType, ChessBoard} from '../game/ChessBoard';
import {CellStates} from '../game/models/CellStates';
import {LichessApiService} from '../services/lichess/LichessApiService';
import {MovesAggregator} from '../game/MovesAggregator';

export function useChessBoard(game: ChessBoard, gameid: string) {
  const lichess = new LichessApiService(gameid);
  const converter = new MovesAggregator();
  const [board, setBoard] = useState(game.cells);
  const [moves, setMoves] = useState<Array<string>>([]);
  const [activePlayerColor, setActivePlayerColor] = useState(ChessColors.WHITE);
  const [activeCell, setActiveCell] = useState<CellPositionType | null>(null);
  //   const pollingInterval = 2000;
  //   const interval = setInterval(() => {
  //     lichess
  //       .getGameState()
  //       .then(res => {
  //         if (activePlayerColor !== ChessColors.WHITE) {
  //           if (res && res.moves) {
  //             const newMoves: Array<string> = res.moves.split(' ');
  //             const newBoard = board;
  //             for (let i = moves.length; i < newMoves.length; i++) {
  //               const from = converter.convertToPos(
  //                 newMoves[i].substring(0, 2),
  //               );
  //               const to = converter.convertToPos(newMoves[i].substring(2));
  //               game.movePiece(from, to);
  //             }
  //             game.activePlayerColor = ChessColors.WHITE;
  //             setActivePlayerColor(ChessColors.WHITE);
  //             setMoves(newMoves);
  //             setBoard(newBoard);
  //           }
  //           setMovementBlocked(false);
  //         }
  //       })
  //       .catch(err => console.log('[MOVES ERROR] ', err));
  //   }, pollingInterval);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

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
