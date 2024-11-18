import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {CellStates} from '../models/CellStates';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class Bishop extends ChessPiece {
  constructor(color: ChessColors) {
    super(
      Figures.BISHOP,
      color,
      color === ChessColors.BLACK
        ? ViewModels.BISHOP_BLACK
        : ViewModels.BISHOP_WHITE,
    );
  }
  public canMove(currentPos: CellPositionType, board: ChessBoard): void {
    //MAIN DIAGONAL TO TOP
    const newPosition: CellPositionType = {
      y: currentPos.y - 1,
      x: currentPos.x - 1,
    };

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.y--;
      newPosition.x--;
    }
    //MAIN DIAGONAL TO BOTTOM
    newPosition.y = currentPos.y + 1;
    newPosition.x = currentPos.x + 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.y++;
      newPosition.x++;
    }
    //SIDE DIAGONAL TO TOP
    newPosition.y = currentPos.y - 1;
    newPosition.x = currentPos.x + 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.y--;
      newPosition.x++;
    }
    //SIDE DIAGONAL TO BOTTOM
    newPosition.y = currentPos.y + 1;
    newPosition.x = currentPos.x - 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.y++;
      newPosition.x--;
    }
  }

  onmove(
    from: CellPositionType,
    to: CellPositionType,
    board: ChessBoard,
  ): void {
    if (board.getPositionAt(to)?.state === CellStates.OCCUPIED) {
      //! WRITE TO PGN
    } else {
      //! WRITE TO PGN
    }
  }
}
