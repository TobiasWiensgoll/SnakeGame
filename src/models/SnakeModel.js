export default class SnakeModel {
  constructor(scene, field) {
    this.scene = scene;
    this.field = field;
    this.body = [];
    this.directions = [];
    this.positions = [];
    this.score =0;
    this.lives = 1;
    this.speed = 150;
    this.moveTime = this.speed;
    this.alive = true;
    this.direction = Phaser.Math.Vector2.UP;
    this.directions.unshift(this.direction.clone());
    this.isDoublePointsActive = false; // Flag, das angibt, ob der Multiplikator aktiv ist
    this.isFrozen= false;  //neuer Zustand für eingefrorene Bewegung
  }

  // Bewegung der Schlange einfrieren
  freeze() {
    this.isFrozen = true;
    this.setSpeed(3000);
  }

   // Bewegung der Schlange wieder aktivieren
   unfreeze() {
    this.isFrozen = false;
    this.setSpeed(150);
  }

  



  // Die grow() Methode fügt der Schlange ein neues Segment am Ende hinzu,
  // basierend auf der Richtung des letzten Segments. Es wird ein neues Sprite erstellt
  // und zur Schlange hinzugefügt, wobei eine Kollision mit dem Kopf verhindert wird.
  grow() {
    let lastBodyPart = this.body[this.body.length - 1];
    let lastDirection = this.directions[this.directions.length - 1];
  
    let newPart = this.scene.physics.add.sprite(
      lastBodyPart.x - lastDirection.x * this.field.tileSize,
      lastBodyPart.y - lastDirection.y * this.field.tileSize,
    );
  
    this.body.push(newPart);
    this.directions.push(lastDirection.clone());
  
    this.scene.physics.add.collider(this.snakeHead, newPart, this.endGame, null, this);

    // Punktestand erhöhen, jedes Mal wenn die Schlange wächst
  this.addPoints(10); // 10 Punkte für jedes Wachsen der Schlange, du kannst das anpassen

  }

  doublePoints(isActive) {
    this.isDoublePointsActive = isActive;
  }

  addPoints(amount) {

    if (this.isDoublePointsActive) {
      amount *= 2; // Verdoppelt die Punkte
    }

    this.score += amount; // Punktestand erhöhen
    console.log('Score:', this.score); // Optional: Ausgabe des Punktestands im Konsolenlog
  }

  // Setzt die Geschwindigkeit der Schlange
  setSpeed(speed) {
    this.speed = speed;
  }

  // Gibt die aktuelle Geschwindigkeit der Schlange zurück
  getSpeed() {
    return this.speed;
  }
    
    // Bewegt den Schlangenkopf in die aktuelle Richtung und aktualisiert die Positionen der Körpersegmente,
    // sodass jedes Segment die Position des vorherigen übernimmt. Alle Positionen werden auf das Raster ausgerichtet.
    // Wenn die Liste der Positionen länger ist als nötig, werden überschüssige Daten entfernt.
    // Setzt die Zeit für die nächste Bewegung basierend auf der Geschwindigkeit der Schlange.
    move() {
      let oldHeadPosition = { x: this.body[0].x, y: this.body[0].y };
      this.directions.unshift(this.direction.clone());
    
      this.snakeHead = this.body[0];
      this.snakeHead.x += this.direction.x * this.field.tileSize;
      this.snakeHead.y += this.direction.y * this.field.tileSize;
    
      const alignedHeadPosition = this.field.alignToGrid(this.snakeHead.x, this.snakeHead.y);
      this.snakeHead.x = alignedHeadPosition.x;
      this.snakeHead.y = alignedHeadPosition.y;
    
      for (let i = 1; i < this.body.length; i++) {
        let oldBodyPosition = { x: this.body[i].x, y: this.body[i].y };
        this.body[i].x = oldHeadPosition.x;
        this.body[i].y = oldHeadPosition.y;
        oldHeadPosition = oldBodyPosition;
    
        const alignedBodyPartPosition = this.field.alignToGrid(this.body[i].x, this.body[i].y);
        this.body[i].x = alignedBodyPartPosition.x;
        this.body[i].y = alignedBodyPartPosition.y;
      }
    
      if (this.positions.length > this.body.length * this.bodyPartLength) {
        this.positions.pop();
        this.directions.pop();
      }
    
      this.moveTime = this.scene.time.now + this.speed;
      return true;
    }

    loseLife() {
      this.lives -= 1;
      if (this.lives <= 0) {
        this.alive = false;
      }
    }
  }
