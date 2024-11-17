export default class Field {
    constructor(scene, width, height, tileSize) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;

        // Berechne die Anzahl der Spalten und Zeilen
        this.cols = Math.floor(width / tileSize);
        this.rows = Math.floor(height / tileSize);
    }

    // Methode, die eine Position an das Raster anpasst
    alignToGrid(x, y) {
        return {
            x: Math.floor(x / this.tileSize) * this.tileSize + this.tileSize / 2,
            y: Math.floor(y / this.tileSize) * this.tileSize + this.tileSize / 2
        };
    }

    // Methode, die eine zufällige Position im Raster zurückgibt
    getRandomPosition() {
        // Zufällige Kachelkoordinaten
        let x = Phaser.Math.Between(0, this.cols - 1);
        let y = Phaser.Math.Between(0, this.rows - 1);

        // Berechne die Mitte der Kachel
        let centerX = x * this.tileSize + this.tileSize / 2;
        let centerY = y * this.tileSize + this.tileSize / 2;

        return { x: centerX, y: centerY };
    }

    // Methode, die das Raster zeichnet
    drawGrid() {
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xff0000 } });
        for (let x = 0; x <= this.width; x += this.tileSize) {
            this.graphics.lineBetween(x, 0, x, this.height);
        }
        for (let y = 0; y <= this.height; y += this.tileSize) {
            this.graphics.lineBetween(0, y, this.width, y);
        }
    }

    // Zerstört das Spielfeld und entfernt alle visuellen Komponenten
    destroy() {
        console.log("Destroying graphics...");
        if (this.graphics) {
            // Zerstöre die Grafiken, die das Spielfeld zeichnen
            this.graphics.clear();
            this.graphics.destroy();
        }
        console.log("Destroying graphics...");
    }
}
