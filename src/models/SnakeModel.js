import GameController from "../controller/GameController";

export default class SnakeModel {
  constructor(scene, field) {
    this.scene = scene;
    this.field = field;
    this.body = [];
    this.directions = [];
    this.positions = [];
    this.moveTime = 0;
    this.speed = 150;
    this.alive = true;
    this.direction = Phaser.Math.Vector2.UP;
    this.directions.unshift(this.direction.clone());
    this.snakeHead;
  }

  // Die grow() Methode fügt der Schlange ein neues Segment am Ende hinzu,
  // basierend auf der Richtung des letzten Segments. Es wird ein neues Sprite erstellt
  // und zur Schlange hinzugefügt, wobei eine Kollision mit dem Kopf verhindert wird.
  grow() {
    let lastBodyPart = this.body[this.body.length - 1];
    let lastDirection = this.directions[this.directions.length - 1];

    let newPart = this.scene.physics.add.sprite(
      lastBodyPart.x - lastDirection.x * this.field.tileSize,
      lastBodyPart.y - lastDirection.y * this.field.tileSize
    );

    this.body.push(newPart);
    this.directions.push(lastDirection.clone());

    this.scene.physics.add.collider(
      this.snakeHead,
      newPart,
      this.endGame,
      null,
      this
    );
  }

  // // Bewegt den Schlangenkopf in die aktuelle Richtung und aktualisiert die Positionen der Körpersegmente,
  // // sodass jedes Segment die Position des vorherigen übernimmt. Alle Positionen werden auf das Raster ausgerichtet.
  // // Wenn die Liste der Positionen länger ist als nötig, werden überschüssige Daten entfernt.
  // // Setzt die Zeit für die nächste Bewegung basierend auf der Geschwindigkeit der Schlange.
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
  // move() {
  //   return true;
  // }

  // moveStep() {
  //   // Den Kopf der Schlange definieren
  //   this.snakeHead = this.body[0];
  //   console.log(this.body);
  //   // Speichere die Richtung in directions für jedes Segment
  //   this.directions.unshift(this.direction.clone());
  //   this.tail = this.body[this.body.length - 1];
  //   console.log("Kopf:", this.snakeHead.x, this.snakeHead.y);
  //   console.log("Schwanz:", this.tail.x, this.tail.y);

  //   const step = 2; // Schrittweite pro Frame

  //   // Zielkoordinaten nur berechnen, wenn noch nicht gesetzt
  //   if (!this.targetSet) {
  //     this.targetX = this.snakeHead.x + this.direction.x * this.field.tileSize;
  //     this.targetY = this.snakeHead.y + this.direction.y * this.field.tileSize;
  //     this.targetSet = true; // Markiere, dass das Ziel gesetzt wurde
  //   }

  //   // Bewegung des Kopfes in kleinen Schritten
  //   if (
  //     Math.abs(this.snakeHead.x - this.targetX) > step ||
  //     Math.abs(this.snakeHead.y - this.targetY) > step
  //   ) {
  //     // Kopf in Richtung Zielpunkt bewegen
  //     this.snakeHead.x += Math.sign(this.targetX - this.snakeHead.x) * step;
  //     this.snakeHead.y += Math.sign(this.targetY - this.snakeHead.y) * step;
  //   } else {
  //     // Ziel erreicht: Kopf direkt auf Zielposition setzen
  //     console.log("kopf erreicht target");
  //     this.snakeHead.x = this.targetX;
  //     this.snakeHead.y = this.targetY;

  //     // Ziel-Status zurücksetzen, um neue Bewegung zu ermöglichen
  //     this.targetSet = false;

  //     // GameController.keyLock = false; // Input-Sperre aufheben
  //   }

  //   // Rest des Körpers nachziehen
  //   this.updateBodyPositions(step);

  //   // Zeitpunkt für die nächste Bewegung aktualisieren
  //   this.moveTime = this.scene.time.now + this.speed * 0.01;

  //   if (this.positions.length > this.body.length * this.bodyPartLength) {
  //     this.positions.pop();
  //     this.directions.pop();
  //   }
  //   return true;
  // }

  // updateBodyPositions(step) {
  //   // Die aktuelle Position des Kopfes speichern
  //   let previousSegmentPosition = {
  //     x: this.snakeHead.x,
  //     y: this.snakeHead.y,
  //   };

  //   console.log("Kopf-Position:", previousSegmentPosition); // Debugging: Kopf-Position ausgeben

  //   // Jedes Segment der Schlange wird smooth bewegt
  //   for (let i = 1; i < this.body.length; i++) {
  //     let segment = this.body[i];
  //     let currentSegmentPosition = { x: segment.x, y: segment.y };

  //     // Berechne den Abstand zwischen dem Segment und dem vorherigen Segment
  //     let distanceX = Math.abs(segment.x - previousSegmentPosition.x);
  //     let distanceY = Math.abs(segment.y - previousSegmentPosition.y);

  //     // Debugging: Ausgabe der Segmentpositionen
  //     console.log(`Segment ${i}: x=${segment.x}, y=${segment.y}`);
  //     console.log(
  //       `Abstand zu vorherigem Segment: distanceX=${distanceX}, distanceY=${distanceY}`
  //     );

  //     // Prüfen, ob das Segment nicht an der richtigen Position (40 hinter dem vorherigen Segment) ist
  //     if (distanceX > step || distanceY > step) {
  //       console.log("Bewege Segment", i);

  //       // Bewegung des Segments in Richtung des vorherigen Segments
  //       segment.x += Math.sign(previousSegmentPosition.x - segment.x) * step;
  //       segment.y += Math.sign(previousSegmentPosition.y - segment.y) * step;
  //     }

  //     // Das neue Ziel für das Segment berechnen
  //     segment.targetX = previousSegmentPosition.x;
  //     segment.targetY = previousSegmentPosition.y;

  //     // Die Position für das nächste Segment aktualisieren
  //     previousSegmentPosition = currentSegmentPosition;
  //   }
  // }
}
