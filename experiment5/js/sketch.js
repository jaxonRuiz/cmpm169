// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let canvasContainer;
var centerHorz, centerVert;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

let buildings = [];
let canvasWidth = 400;
let canvasHeight = 400;
let cam;

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  canvas.parent("canvas-container");
  cam = createCamera();
  cam.setPosition(0, -600, 1200);
  cam.lookAt(0, -100, 0);
  // camera(0, -600, 800, 0, 0, 0)
  // debugMode(800);

  let temp = new Building(random(-canvasWidth/2, canvasWidth/2), random(-canvasHeight/2, canvasHeight/2), random(20, 100), int(random(3, 8)), random(10, 100));
  buildings.push(temp);
  for (let i=0; i<10; i++) {
    let temp = new Building(random(-canvasWidth/2, canvasWidth/2), random(-canvasHeight/2, canvasHeight/2), random(50, 100), int(random(3, 8)), random(10, 50));
    if (buildings.some(b => checkCollision(b, temp))) {
      i--;
      continue;
    }
    buildings.push(temp);
  }

}

let validWidth = canvasWidth/2;
let validHeight = canvasHeight/2;
function addBuilding() {
  let temp = new Building(random(-validWidth, validWidth), random(-validHeight, validHeight), random(20, 100), int(random(3, 8)), random(10, 30));
    if (buildings.some(b => checkCollision(b, temp))) {
      return;
    }
    buildings.push(temp);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(156, 230, 255);
  orbitControl();
  rectMode(CENTER);
  rotateX(PI/2);
  addBuilding();
  if (validWidth < canvasWidth) validWidth += 1;
  if (validHeight < canvasHeight) validHeight += 1;
  for (let i = 0; i < buildings.length; i++) {
    let distance = dist(cam.eyeX, cam.eyeY, buildings[i].x, buildings[i].y);
    buildings[i].draw(distance);
  }

  push();
  fill(100);
  rect(0, 0, canvasWidth*2.2, canvasHeight*2.2);
  pop();  
}
 
// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

function checkCollision(a, b) {
  let distance = dist(a.x, a.y, b.x, b.y);
  if (distance < a.size/2 + b.size/2) 
    return true
  return false;
}