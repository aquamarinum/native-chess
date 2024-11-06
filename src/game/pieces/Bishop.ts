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
  public highlight(currentPos: CellPositionType, board: ChessBoard): void {
    const newPosition: CellPositionType = {
      y: currentPos.y - 1,
      x: currentPos.x - 1,
    };
    //MAIN DIAGONAL TO TOP
    while (newPosition.y >= 0 && newPosition.x >= 0) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.y--;
      newPosition.x--;
    }

    newPosition.y = currentPos.y + 1;
    newPosition.x = currentPos.x + 1;
    //MAIN DIAGONAL TO BOTTOM
    while (newPosition.y < 8 && newPosition.x < 8) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.y++;
      newPosition.x++;
    }

    newPosition.y = currentPos.y - 1;
    newPosition.x = currentPos.x + 1;
    //SIDE DIAGONAL TO TOP
    while (newPosition.y >= 0 && newPosition.x < 8) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.y--;
      newPosition.x++;
    }

    newPosition.y = currentPos.y + 1;
    newPosition.x = currentPos.x - 1;
    //SIDE DIAGONAL TO BOTTOM
    while (newPosition.y < 8 && newPosition.x >= 0) {
      if (!board.checkPosition(newPosition)) break;
      newPosition.y++;
      newPosition.x--;
    }
  }
}
