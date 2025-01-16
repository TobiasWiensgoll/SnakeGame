// HtmlModel.js
export default class HtmlModel {
  constructor(statusText, kronen) {
    this.statusText = statusText; // Der Text, der in der statustext div angezeigt wird
    this.kronen = kronen; // Der Wert der Kronen, der in der ScoreText span angezeigt wird
    this.skinId = 1;
    this.levelId = 1;
    this.initialise();
  }

  initialise() {
    this.updateText();
  }

  // Gibt den Status-Text zurück
  setStatustext() {
    return this.statusText;
  }

  // Gibt die Anzahl der Kronen zurück
  setKronen() {
    return this.kronen;
  }

  setLevelId(levelId) {
    this.levelId = levelId;
    console.log("Ich setze die levelid auf" + this.levelId);
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
      outputScoreText.textContent = this.setKronen(); // Setzt die Kronenanzahl
    } else {
      console.error('Element mit der Klasse "ScoreText" wurde nicht gefunden.');
    }
  }
}
