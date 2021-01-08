import { handleDisconneted, handleNewUser } from "./notifications";
import { handleNewMsg } from "./chat";
import { handleBeganPath, handleStrokedPath } from "./paint";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);

export const initSockets = (aSocket) => {
  const { events } = window;
  updateSocket(aSocket);
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconneted);
  aSocket.on(events.newMsg, handleNewMsg);
  aSocket.on(events.beganPath, handleBeganPath);
  aSocket.on(events.strokedPath, handleStrokedPath);
};
