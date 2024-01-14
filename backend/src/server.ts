import type * as Party from "partykit/server";
import gameService from "./game/GameService";
import { ClientMessageType, ServerMessageType, type ConnectedData, type JoinData, type JoinedData, type Message, type ServerHandlers } from "../../common/Message";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    conn.send(JSON.stringify({ type: ServerMessageType.Connected, data: { playerId: conn.id } as ConnectedData }));
  }

  onMessage(message: string, sender: Party.Connection) {
    const msg = JSON.parse(message) as Message;
    const response = this.handlers[msg.type as ClientMessageType](msg.data);
    if (response) this.broadcast(response);
  }

  broadcast = (message: Message) => {
    this.room.broadcast(JSON.stringify(message));
  };

  handlers: ServerHandlers = {
    [ClientMessageType.Join]: (data: JoinData) => {
      const game = gameService.join(data.code, data.nickname, data.playerId);

      return { type: ServerMessageType.Joined, data: { game } as JoinedData } as Message;
    },
  };
}

Server satisfies Party.Worker;
