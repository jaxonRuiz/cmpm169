// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

var formResolution = 360;
var stepSize = 2;
var distortionFactor = 10;
var initRadius = 150;
var radius = initRadius;
var fadeFactor = 0.1;
var centerX;
var centerY;
var x = [];
var y = [];
var myHue = 0;
var savedPoints = [];
var filled = false;
var freeze = false;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function() {
    resizeScreen();
  });

  resizeScreen();
  colorMode(HSB, 360, 100, 100);
  background(0);
  noFill();
  
  // init shape
  centerX = width / 2;
  centerY = height / 2;
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(cos(angle * i) * radius);
    y.push(sin(angle * i) * radius);
  }

  stroke(myHue, 0, 0);
  strokeWeight(0.75);
}

// draw() function is called repeatedly, it's the main animation loop


function drawShape(centerX, centerY, xs, ys) {
  for (var i = 0; i < formResolution; i++) {
    xs[i] += random(-stepSize, stepSize);
    ys[i] += random(-stepSize, stepSize);
  }

  myHue++;
  if (myHue > 360) myHue = 0;
  stroke(myHue, 100, 50);
  beginShape();
  // first controlpoint
  curveVertex(xs[formResolution - 1] + centerX, ys[formResolution - 1] + centerY);

  // only these points are drawn
  for (var i = 0; i < formResolution; i++) {
    curveVertex(xs[i] + centerX, ys[i] + centerY);
  }
  curveVertex(xs[0] + centerX, ys[0] + centerY);

  // end controlpoint
  curveVertex(xs[1] + centerX, ys[1] + centerY);
  endShape();
}

function draw() {
  // floating towards mouse position
  centerX += (mouseX - centerX) * 0.01;
  centerY += (mouseY - centerY) * 0.01;
  background(0, fadeFactor);

  // calculate new points
  drawShape(centerX, centerY, x, y);

  savedPoints.forEach(function(point) {
    drawShape(point.x, point.y, point.xs, point.ys);
  });
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  savedPoints.push({
    x: mouseX,
    y: mouseY,
    xs: x,
    ys: y
  });

  // init shape on mouse position
  centerX = mouseX;
  centerY = mouseY;
  var angle = radians(360 / formResolution);
  // var radius = initRadius * random(0.5, 1);
  for (var i = 0; i < formResolution; i++) {
    x[i] = cos(angle * i) * radius;
    y[i] = sin(angle * i) * radius;
  }
}