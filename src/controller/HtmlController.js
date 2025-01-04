import { startGame } from "../main.js";

export default class HtmlController {
  constructor(HtmlModel) {
    this.initListeners();
    this.htmlModel = HtmlModel;
  }
  initListeners() {
    // Beispiel: Button mit ID "startButton" startet das Spiel
    const startButton = document.getElementById("startButton");
    if (startButton) {
      startButton.addEventListener("click", () => {
        this.startGameHandler();
      });
    }
  }

  startGameHandler() {
    console.log("Spiel wird gestartet...");
    this.hideMenus();
    console.log(this.htmlModel.getSkinId());
    startGame(1, this.htmlModel.getSkinId()); // Hier wird die Methode aus gameStarter.js aufgerufen
  }

  hideMenus() {
    const menuContainer = document.querySelector(".MenuContainer");
    const menuContainer2 = document.querySelector(".MenuContainer2");

    menuContainer.style.display = "none";
    menuContainer2.style.display = "none";
  }

  showMenus() {
    const menuContainer = document.querySelector(".MenuContainer");

    menuContainer.style.display = "flex";
  }

  handleDeath() {
    console.log("handledeath");
    this.showMenus();
  }
}
