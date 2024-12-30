function swapImages(clickedItem) {
  // Wählen Sie das erste 'dropButton'-Element aus
  const dropButton = document.querySelector(".dropbutton");

  // Überprüfen, ob ein Bild mit der Klasse 'dropButton' existiert
  if (dropButton) {
    // Holen Sie sich die 'src' und 'alt'-Attribute des geklickten Dropdown-Elements
    const clickedImageSrc = clickedItem.src;
    const clickedImageAlt = clickedItem.alt;

    // Tausche die Bilder:
    // 1. Setze das 'dropButton'-Bild auf das Bild des geklickten Dropdown-Elements
    const currentDropButtonSrc = dropButton.src;
    const currentDropButtonAlt = dropButton.alt;

    dropButton.src = clickedImageSrc;
    dropButton.alt = clickedImageAlt;

    // 2. Setze das Bild und den 'alt'-Text des geklickten Elements auf das ursprüngliche Bild und den 'alt'-Text des Buttons
    clickedItem.src = currentDropButtonSrc;
    clickedItem.alt = currentDropButtonAlt;
  } else {
    console.error('Kein Element mit der Klasse "dropButton" gefunden.');
  }
}
