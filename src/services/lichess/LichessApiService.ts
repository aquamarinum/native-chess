import {Equine} from 'equine';

class LichessApiService {
  lichess: Equine;
  gameId: string;

  constructor(id: string) {
    this.lichess = new Equine('lip_xIeD7buI2HzyqqlTy6l0');
    this.gameId = id;
  }

  makeMove(move: string) {
    this.lichess.board.move({gameId: this.gameId, move: move});
  }

  getGameState() {
    this.lichess.board.stream({gameId: this.gameId});
  }
}
