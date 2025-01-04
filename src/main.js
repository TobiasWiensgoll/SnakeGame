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

// Funktion zum Starten des Spiels
export function startGame(levelId, skinId) {
  // Wenn ein Spiel bereits läuft, stoppen wir es
  if (currentGame) {
    currentGame.destroy(true); // Zerstöre das aktuelle Spiel, um Ressourcen freizugeben
  }

  // Erstelle das neue Spiel
  currentGame = new Phaser.Game(config);
  currentGame.scene.add("game", new Game(levelId, skinId)); // Übergebe die Parameter an den Konstruktor der Game-Klasse
  currentGame.scene.start("game");
}

document.addEventListener("DOMContentLoaded", () => {
  const htmlModel = new HtmlModel("Willkommen", 0);
  const controller = new HtmlController(htmlModel);
});
