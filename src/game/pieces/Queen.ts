import {CellPositionType, ChessBoard} from '../ChessBoard';
import {ChessPiece} from '../ChessPiece';
import {CellStates} from '../models/CellStates';
import {ChessColors} from '../models/ChessColors';
import {Figures} from '../models/Figures';
import {ViewModels} from '../models/ViewModels';

export class Queen extends ChessPiece {
  constructor(color: ChessColors) {
    super(
      Figures.QUEEN,
      color,
      color === ChessColors.BLACK
        ? ViewModels.QUEEN_BLACK
        : ViewModels.QUEEN_WHITE,
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

    //VERTICAL TO TOP
    newPosition.y = currentPos.y - 1;
    newPosition.x = currentPos.x;

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.y--;
    }
    //VERTICAL TO BOTTOM
    newPosition.y = currentPos.y + 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.y++;
    }
    //HORIZONTAL TO LEFT
    newPosition.y = currentPos.y;
    newPosition.x = currentPos.x - 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.x--;
    }
    //HORIZONTAL TO RIGHT
    newPosition.x = currentPos.x + 1;

    while (board.getPositionAt(newPosition)) {
      if (!board.highlight(newPosition)) break;
      newPosition.x++;
    }
  }
  onmove(
    from: CellPositionType,
    to: CellPositionType,
    board: ChessBoard,
  ): void {
    // write to PGN
  }
}
