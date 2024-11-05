import {ChessColors} from './models/ChessColors';

export class Player {
  private name: string;
  private color: string;
  private elo: number;
  constructor(_name: string, _color: ChessColors, _elo: number) {
    this.name = _name;
    this.color = _color;
    this.elo = _elo;
  }
  getName() {
    return this.name;
  }
  getElo() {
    return this.elo;
  }
}
