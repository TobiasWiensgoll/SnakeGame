// HtmlModel.js
export default class HtmlModel {
  constructor(statusText, kronen) {
    this.statusText = statusText; // Der Text, der in der statustext div angezeigt wird
    this.kronen = kronen; // Der Wert der Kronen, der in der ScoreText span angezeigt wird
    this.skins = [];
    this.level;
  }

  // Gibt den Status-Text zurück
  setStatustext() {
    return this.statusText;
  }

  // Gibt die Anzahl der Kronen zurück
  setKronen() {
    return this.kronen;
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
//!gehört in den Controllr
// Wird ausgeführt, wenn die Seite vollständig geladen ist
window.onload = function () {
  let HtmlModels = new HtmlModel("Willkommen zurück!", 15); // Beispiel: Status-Text "Willkommen zurück!" und 35 Kronen
  HtmlModels.updateText(); // Ändert den Text in der 'statustext'-Klasse und die Kronenanzeige
};
