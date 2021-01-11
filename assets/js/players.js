import { disableChat, enableChat } from "./chat";
import {
  disableCanvas,
  enableCanvas,
  hideControls,
  resetCanvas,
  showControls,
} from "./paint";

const board = document.getElementById("jsPlayerBoard");
const notifs = document.getElementById("jsNotifs");
const countDown = document.getElementById("jsCountDown");

let count = 30;
let cd = null;

const addPlayer = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = (text) => {
  notifs.innerText = "";
  notifs.innerText = text;
};

const startCountDown = () => {
  count = count - 1;
  if (count !== 1) {
    countDown.innerText = `${count} seconds left`;
  } else {
    countDown.innerText = `${count} second left`;
  }
  if (count < 0) {
    clearInterval(cd);
    countDown.innerHTML = "";
  }
};

export const handlePlayerUpdate = ({ sockets }) => addPlayer(sockets);
export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
  count = 30;
  cd = setInterval(startCountDown, 1000);
};
export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are leader, paint: ${word}`;
};
export const handleGameEnded = () => {
  setNotifs("Game Ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
  enableChat();
  countDown.innerHTML = "";
  clearInterval(cd);
};
export const handleGameStarting = () => setNotifs("Game will start soon");
