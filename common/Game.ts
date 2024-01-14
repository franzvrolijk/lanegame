import type Player from "./Player";

export default class Game {
  code: string;
  players: Player[];

  constructor(code: string) {
    this.code = code;
    this.players = [];
  }
}
