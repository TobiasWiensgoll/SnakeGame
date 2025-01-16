import { startGame } from "../main.js";

export default class HtmlController {
  constructor(HtmlModel) {
    this.htmlModel = HtmlModel;
    this.initListeners();
  }
  initListeners() {
    // Beispiel: Button mit ID "startButton" startet das Spiel
    const startButton = document.getElementById("startButton");
    if (startButton) {
      startButton.addEventListener("click", () => {
        this.startGameHandler();
      });
    }
    const level1Button = document.querySelector(".level1");
    const level2Button = document.querySelector(".level2");
    const level3Button = document.querySelector(".level3");

    if (level1Button) {
      level1Button.addEventListener("click", () => {
        this.htmlModel.setLevelId(1);
        this.startGameHandler();
      });
    }
    if (level2Button) {
      level2Button.addEventListener("click", () => {
        this.htmlModel.setLevelId(2);
        this.startGameHandler();
      });
    }
    if (level3Button) {
      level3Button.addEventListener("click", () => {
        this.htmlModel.setLevelId(3);

        this.startGameHandler();
      });
    }
  }

  startGameHandler() {
    console.log("Spiel wird gestartet...");
    this.hideMenus();
    console.log(this.htmlModel.getSkinId());
    startGame(this.htmlModel.getLevelId(), this.htmlModel.getSkinId()); // Hier wird die Methode aus gameStarter.js aufgerufen
  }

  hideMenus() {
    const menuContainer = document.querySelector(".MenuContainer");
    const menuContainer2 = document.querySelector(".MenuContainer2");

    menuContainer.style.display = "none";
    menuContainer2.style.display = "none";
  }

  showMenus() {
    this.htmlModel.updateText();
    const menuContainer = document.querySelector(".MenuContainer");

    menuContainer.style.display = "flex";
  }

  handleDeath() {
    console.log("handledeath");
    this.htmlModel.changeStatusText("Du bist gestorben :/");
    this.showMenus();
  }
}
