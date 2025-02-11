// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

class Building {
  basePoints = [[]];
  shape;
  currentHeight = 0;
  level = 0;
  constructor(x, y, size, sides, height) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.size = size;
    this.maxLevel = 2;

    // set up base shape (polygon)
    this.rotationFactor = TWO_PI / sides;
    this.angleOffset = random(TWO_PI);
    for (let i=0; i < sides; i++) {
      let angle = this.angleOffset + i * this.rotationFactor;
      let dx = cos(angle) * size/2;
      let dy = sin(angle) * size/2;
      this.basePoints[this.level].push({x: dx, y: dy, z: 0});
    }

    this.size = size; 
    this.height = height;

    // beginGeometry();
    // this.createShape();
    // this.shape = endGeometry();
  }

  draw() {
    push();
    translate(this.x, this.y, 0);
    if (this.shape) model(this.shape);

    // draw current level
    if (this.level < this.maxLevel) this.drawLevel();
    
    // growing height
    if (this.currentHeight < this.height) this.currentHeight += 1;
    else {
      // saving lower shape
      beginGeometry();
      if (this.shape) model(this.shape);
      this.drawLevel();
      this.shape = endGeometry();

      // incrementing level and resetting height
      this.level += 1;
      this.currentHeight = 0;
      this.basePoints.push([]);

      // set up points for next level
      if (this.level < this.maxLevel) {
        for (let i=0; i < this.sides; i++) {
          let angle = this.angleOffset + i * this.rotationFactor;
          let dx = cos(angle) * this.size/(2+this.level);
          let dy = sin(angle) * this.size/(2+this.level);
          this.basePoints[this.level].push({x: dx, y: dy, z: 0});
        }
      }
    }
    pop();
  }

  drawLevel() {
    let h = this.currentHeight + this.height*this.level;
    // side faces
    for (let i=0; i < this.basePoints[this.level].length; i++) {
      let next = (i+1) % this.basePoints[this.level].length;
      beginShape();
      vertex(this.basePoints[this.level][i].x, this.basePoints[this.level][i].y, this.height*this.level);
      vertex(this.basePoints[this.level][next].x, this.basePoints[this.level][next].y, this.height*this.level);
      vertex(this.basePoints[this.level][next].x, this.basePoints[this.level][next].y, h);
      vertex(this.basePoints[this.level][i].x, this.basePoints[this.level][i].y, h);
      endShape(CLOSE);
    }

    // bottom face
    beginShape();
    for (let i=0; i < this.basePoints[this.level].length; i++) {
      vertex(this.basePoints[this.level][i].x, this.basePoints[this.level][i].y, this.height*this.level);
    }
    endShape(CLOSE);

    // top face
    beginShape();
    for (let i=0; i < this.basePoints[this.level].length; i++) {
      vertex(this.basePoints[this.level][i].x, this.basePoints[this.level][i].y, h);
    }
    endShape(CLOSE);
  }
}