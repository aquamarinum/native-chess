import {ChessColors} from './models/ChessColors';

export class Player {
  readonly name: string;
  readonly color: string;
  private elo: number | undefined;
  isActive: boolean;

  constructor(_name: string, _color: ChessColors, _elo: number | undefined) {
    this.name = _name;
    this.color = _color;
    this.elo = _elo;
    this.isActive = false;
  }
  getName() {
    return this.name;
  }
  getElo() {
    return this.elo;
  }
}
