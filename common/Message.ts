import type Game from "./Game";

/** --- Message definitions --- **/

export interface ConnectedData {
  playerId: string;
}

export interface JoinData {
  code: string;
  nickname: string;
  playerId: string;
}

export interface JoinedData {
  game: Game;
}

/** Infrastructure types */

export interface Message {
  type: MessageType;
  data: MessageData;
}

export type MessageType = ServerMessageType & ClientMessageType;
export type MessageData = ConnectedData & JoinedData & JoinData;

export enum ServerMessageType {
  Connected = "CONNECTED",
  Joined = "JOINED",
}

export enum ClientMessageType {
  Join = "JOIN",
}

export interface MessageDataMap {
  [ServerMessageType.Connected]: ConnectedData;
  [ServerMessageType.Joined]: JoinedData;
  [ClientMessageType.Join]: JoinData;
}

export type Handlers = { [T in MessageType]: (data: MessageDataMap[T]) => void | Message };
export type ClientHandlers = { [T in ServerMessageType]: (data: MessageDataMap[T]) => void | Message };
export type ServerHandlers = { [T in ClientMessageType]: (data: MessageDataMap[T]) => void | Message };
