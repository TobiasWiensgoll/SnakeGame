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
function toggleMenus() {
  const menuContainer = document.querySelector(".MenuContainer");
  const menuContainer2 = document.querySelector(".MenuContainer2");

  if (menuContainer && menuContainer2) {
    // Level Button Event Listener
    const levelButton = document.getElementById("levelButton");
    if (levelButton) {
      levelButton.addEventListener("click", () => {
        menuContainer.style.display = "none";
        menuContainer2.style.display = "flex";
      });
    }

    // Back Button Event Listener
    const backButton = document.getElementById("backButton");
    if (backButton) {
      backButton.addEventListener("click", () => {
        menuContainer.style.display = "flex";
        menuContainer2.style.display = "none";
      });
    }
  }
}
// Referenzen zu den Elementen
const musicToggleOff = document.getElementById("musicToggle"); // Music-Off-Button
const musicToggleOn = document.querySelector(".musicOn"); // Music-On-Bild
const backgroundMusic = document.getElementById("backgroundMusic"); // Audio-Element

// Initialer Zustand: Musik aus
let isMusicOn = false;

// Anfangszustand: Music-On-Bild verstecken
// musicToggleOn.style.display = "none";

// Event-Listener für den Music-Off-Button
musicToggleOff.addEventListener("click", () => {
  if (!isMusicOn) {
    // Musik einschalten
    backgroundMusic.play();

    // Bilder entsprechend umschalten
    // musicToggleOff.style.display = "none"; // Music-Off-Bild verstecken
    musicToggleOn.style.display = "inline"; // Music-On-Bild anzeigen

    isMusicOn = true;
  }
});

// Event-Listener für den Music-On-Button
musicToggleOn.addEventListener("click", () => {
  if (isMusicOn) {
    // Musik ausschalten
    backgroundMusic.pause();

    // Bilder entsprechend umschalten
    musicToggleOn.style.display = "none"; // Music-On-Bild verstecken
    // musicToggleOff.style.display = "inline"; // Music-Off-Bild anzeigen

    isMusicOn = false;
  }
});

// Stellt sicher, dass die Funktion nach dem Laden des DOMs ausgeführt wird
document.addEventListener("DOMContentLoaded", toggleMenus);
