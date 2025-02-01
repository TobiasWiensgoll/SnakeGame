let globalHighScore = 0;
// HtmlModel.js
export default class HtmlModel {
  constructor(statusText, kronen) {
    this.statusText = statusText; // Der Text, der in der statustext div angezeigt wird
    this.kronen = kronen; // Der Wert der Kronen, der in der ScoreText span angezeigt wird
    this.skinId = 1;
    this.levelId = 1;
    this.GameModeId = 0;
    this.initialise();
    this.highscore = globalHighScore;
  }

  initialise() {
    this.updateText();
  }

  // Gibt den Status-Text zurück
  setStatustext() {
    console.log("statustext" + this.statusText);
    return this.statusText;
  }

  changeStatusText(text) {
    this.statusText = text;
  }

  // Gibt die Anzahl der Kronen zurück
  setKronen(kronen) {
    this.kronen = kronen;
    console.log("Set Kronen: " + this.kronen);

    if (this.kronen > this.highscore) {
      this.highscore = this.kronen;
      globalHighScore = this.highscore;
      console.log("Neuer Highscore: " + this.highscore);
    } else {
      console.log("Highscore bleibt unverändert: " + this.highscore);
    }
  }

  getKronen() {
    return this.kronen;
  }
  getGameModeId() {
    return this.GameModeId;
  }
  setLevelId(levelId) {
    this.levelId = levelId;
    console.log("Ich setze die levelid auf" + this.levelId);
  }

  setGameModeId(gameModeId) {
    this.gameModeId = gameModeId;
    console.log("Ich setze die GameModeId auf" + this.gameModeId);
  }

  getLevelId() {
    return this.levelId;
  }

  getSkinId() {
    let altText = document.querySelector(".dropbutton");
    const altTextAsInt = parseInt(altText.alt, 10);
    this.skinId = altTextAsInt;
    return this.skinId;
  }

  getHighScore() {
    return this.highscore;
  }

  // Aktualisiert den Text der statustext und der Kronen (ScoreText)
  updateText() {
    // Wähle das Element mit der Klasse 'statustext'
    const outputStatustext = document.querySelector(".statustext");

    // Überprüfen, ob das Element existiert, bevor wir den Text setzen
    if (outputStatustext) {
      outputStatustext.textContent = this.setStatustext(); // Setzt den Status-Text
    } else {
      console.error(
        'Element mit der Klasse "statustext" wurde nicht gefunden.'
      );
    }

    // Wähle das Element mit der Klasse 'ScoreText', um die Kronenanzahl anzuzeigen
    const outputScoreText = document.querySelector(".ScoreText");

    // Überprüfen, ob das Element existiert, bevor wir die Kronenanzahl setzen
    if (outputScoreText) {
      outputScoreText.textContent = this.getKronen(); // Setzt die Kronenanzahl
    } else {
      console.error('Element mit der Klasse "ScoreText" wurde nicht gefunden.');
    }

    const highScoreText = document.querySelector(".highScoretext");
    if (highScoreText) {
      highScoreText.textContent = "Highscore: " + this.getHighScore();
    } else {
      console.error(
        'Element mit der Klasse "highScoretext" wurde nicht gefunden.'
      );
    }
  }
}
