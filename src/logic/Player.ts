import {Colors} from './models/Colors';

export class Player {
  private name: string;
  private color: string;
  constructor(_name: string, _color: Colors) {
    this.name = _name;
    this.color = _color;
  }
}
