import usePartySocket from "partysocket/react";
import { useState } from "react";
import { ClientHandlers, ClientMessageType, ConnectedData, JoinData, JoinedData, Message, ServerMessageType } from "../../../../common/Message";
import Game from "../../../../common/Game";
import ColorScheme from "../ui/ColorScheme";
import GameMap from "./GameMap";

interface GameProps {
  code: string;
  nickname: string;
}

const GameView = ({ code: code, nickname: nickname }: GameProps) => {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  const ws = usePartySocket({
    host: "localhost:1999",
    room: code,

    onOpen() {},
    onMessage(e) {
      const msg = JSON.parse(e.data) as Message;
      const response = handlers[msg.type as ServerMessageType](msg.data);
      if (response) send(response);
    },
    onClose() {},
    onError() {},
  });

  const handlers: ClientHandlers = {
    [ServerMessageType.Connected]: (data: ConnectedData) => {
      setPlayerId(data.playerId);
      return {
        type: ClientMessageType.Join,
        data: { nickname: nickname, code: code, playerId: data.playerId } as JoinData,
      } as Message;
    },
    [ServerMessageType.Joined]: (data: JoinedData) => {
      setGame(data.game);
    },
  };

  const send = (data: Message) => {
    ws.send(JSON.stringify(data));
  };

  return (
    <>
      <div className="gameDetails" style={{ color: ColorScheme.mainLighter }}>
        <p>Game: {code}</p>
        <p>Nickname: {nickname}</p>
        <p>Player ID: {playerId}</p>
        <p>{JSON.stringify(game)}</p>
      </div>
      <div>
        <GameMap />
      </div>
    </>
  );
};

export default GameView;
