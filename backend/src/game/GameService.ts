import Game from "../../../common/Game";
import Player from "../../../common/Player";

class GameService {
  games: Map<string, Game> = new Map<string, Game>();

  join(code: string, nickname: string, playerId: string) {
    const existingGame = this.getGameByPlayer(playerId);
    if (existingGame) return existingGame;

    if (!this.games.has(code)) {
      this.games.set(code, new Game(code));
    }

    const game = this.games.get(code)!;

    if (!game.players.find((player) => player.id === playerId)) {
      game.players.push(new Player(nickname, playerId));
    }

    return game;
  }

  getGameByPlayer(playerId: string): Game | null {
    this.games.forEach((game) => {
      if (game.players.some((player) => player.id === playerId)) return game;
    });

    return null;
  }
}

export default new GameService();
