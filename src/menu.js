function swapImages(clickedItem) {
  // Wählen Sie das erste 'dropButton'-Element aus
  const dropButton = document.querySelector(".dropbutton");

  // Überprüfen, ob ein Bild mit der Klasse 'dropButton' existiert
  if (dropButton) {
    // Holen Sie sich das Bild des geklickten Dropdown-Elements
    const clickedImageSrc = clickedItem.src;

    // Tausche die Bilder:
    // 1. Setze das 'dropButton' Bild auf das Bild des geklickten Dropdown-Elements
    const currentDropButtonSrc = dropButton.src;
    dropButton.src = clickedImageSrc;

    // 2. Setze das Bild des geklickten Elements auf das ursprüngliche Bild des Buttons
    clickedItem.src = currentDropButtonSrc;
  } else {
    console.error('Kein Element mit der Klasse "dropButton" gefunden.');
  }
}
