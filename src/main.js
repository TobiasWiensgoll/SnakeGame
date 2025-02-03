import Phaser from "phaser";
import Game from "./views/Game";

import HtmlController from "./controller/HtmlController";
import HtmlModel from "./models/HtmlModel";
let currentGame = null; // Globale Variable, um das aktuelle Spiel zu speichern

const config = {
  width: 1200,
  height: 800,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
};

let gameIsRunning = false; // Verhindert doppelten Start

export function startGame(levelId, skinId) {
  if (gameIsRunning) return; // Falls das Spiel schon läuft, tue nichts
  gameIsRunning = true; // Blockiere weitere Starts, bis das Spiel läuft

  if (currentGame) {
    currentGame.destroy(true, false);
    document.querySelector("canvas")?.remove();
    currentGame = null;
  }

  setTimeout(() => {
    currentGame = new Phaser.Game(config);
    currentGame.scene.add("game", new Game(levelId, skinId));
    currentGame.scene.start("game");

    gameIsRunning = false; // Nach dem Start wieder freigeben
  }, 100);
}


document.addEventListener("DOMContentLoaded", () => {
  const htmlModel = new HtmlModel("Willkommen", 0);
  const controller = new HtmlController(htmlModel);
});
