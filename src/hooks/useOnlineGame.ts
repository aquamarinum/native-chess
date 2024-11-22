import {useEffect, useRef, useState} from 'react';
import {ChessColors} from '../game/models/ChessColors';
import {CellPositionType, ChessBoard} from '../game/ChessBoard';
import {LichessApiService} from '../services/lichess/LichessApiService';
import {MovesAggregator} from '../game/MovesAggregator';
import {CellStates} from '../game/models/CellStates';

export function useOnlineGame(game: ChessBoard, gameid: string) {
  const lichess = new LichessApiService(gameid);
  const converter = new MovesAggregator();
  const [board, setBoard] = useState(game.cells);
  const [moves, setMoves] = useState<Array<string>>([]);
  const [activeCell, setActiveCell] = useState<CellPositionType | null>(null);
  const [activePlayerColor, setActivePlayerColor] = useState<ChessColors>();
  const [currentPlayerColor, setCurrentPlayerColor] = useState<ChessColors>(
    ChessColors.WHITE,
  );
  const savedLength = useRef(0);

  useEffect(() => {
    lichess.getGameState().then(state => {
      if (state) {
        if (!state.moves) {
          setActivePlayerColor(ChessColors.WHITE);
        } else {
          const newMoves: string[] = state.moves.split(' ');
          const gap = newMoves.length - moves.length;
          console.log('NEW MOVES => ', newMoves);
          console.log('OLD MOVES => ', moves);
          console.log('GAP: ', gap);
          if (gap > 0) {
            const newBoard = board;
            for (let i = moves.length; i < newMoves.length; i++) {
              game.setPieceFromPGN(newMoves[i]);
            }

            if (newMoves.length % 2 === 0) {
              game.setActivePlayerColor(ChessColors.WHITE);
              setActivePlayerColor(ChessColors.WHITE);
            } else {
              game.setActivePlayerColor(ChessColors.BLACK);
              setActivePlayerColor(ChessColors.BLACK);
            }
            savedLength.current = newMoves.length;
            setMoves(newMoves);
            setBoard(newBoard);
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    const interval = 3000;
    const intervalRef = setInterval(() => {
      if (activePlayerColor !== currentPlayerColor) {
        lichess.getGameState().then(state => {
          if (state && state.moves) {
            updateMoves(state.moves);
          }
        });
      }
    }, interval);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  const updateMoves = (newMoves: string) => {
    const newMovesArray = newMoves.split(' ');
    console.warn('NEW MOVES: => ', newMovesArray);
    console.warn('OLD MOVES: => ', moves);
    if (newMovesArray.length - savedLength.current > 0) {
      console.log('updating...........', savedLength.current);
      const newBoard = game.cells;
      for (let i = moves.length; i < newMovesArray.length; i++) {
        game.setPieceFromPGN(newMovesArray[i]);
      }
      if (newMovesArray.length % 2 === 0) {
        game.setActivePlayerColor(ChessColors.WHITE);
        setActivePlayerColor(ChessColors.WHITE);
      } else {
        game.setActivePlayerColor(ChessColors.BLACK);
        setActivePlayerColor(ChessColors.BLACK);
      }
      savedLength.current = newMovesArray.length;
      setBoard(newBoard);
      setMoves(prev => {
        console.log('SETTING NEW STATE TO', prev);
        return newMovesArray;
      });
    }
  };

  const onClickCell = (target: CellPositionType) => {
    //! IF NOT MY TURN
    if (currentPlayerColor !== activePlayerColor) return;

    const newCells = board;
    if (activeCell) {
      const piece = game.getPieceAt(target);

      if (piece && piece.color === currentPlayerColor) {
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
        const move =
          converter.convertToPGN(activeCell) + converter.convertToPGN(target);
        game.movePiece(activeCell, target);
        game.switchPlayer();
        setMoves(prev => [...prev, move]);
        setActivePlayerColor(
          activePlayerColor === ChessColors.WHITE
            ? ChessColors.BLACK
            : ChessColors.WHITE,
        );
        lichess
          .sendMove(move)
          .then(res => {
            console.log('move sended');
          })
          .catch(err => console.log('[E] UNRECOGNIZED ERROR'));
      }

      if (game.getPositionAt(target)?.state === CellStates.OCCUPIED) {
        const move =
          converter.convertToPGN(activeCell) + converter.convertToPGN(target);
        game.capturePiece(target);
        game.movePiece(activeCell, target);
        game.switchPlayer();
        setMoves(prev => [...prev, move]);
        setActivePlayerColor(
          activePlayerColor === ChessColors.WHITE
            ? ChessColors.BLACK
            : ChessColors.WHITE,
        );
        lichess
          .sendMove(move)
          .then(res => {
            if (res) {
              console.log('move sended');
            }
          })
          .catch(err => console.log('[E] UNRECOGNIZED ERROR'));
      }
      game.clearHighlighting();
      setActiveCell(null);
    } else {
      const piece = game.getPieceAt(target);
      if (piece && piece.color === currentPlayerColor) {
        piece.canMove(target, game);
        game.setCellState(target, CellStates.SELECTED);
        setActiveCell(target);
      }
    }
    setBoard(newCells);
  };

  return {board, moves, onClickCell, activePlayerColor};
}
