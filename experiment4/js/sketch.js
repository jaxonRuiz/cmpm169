// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

let capture;
let frontEffects;
let aspectRatio;

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");

  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  capture = createCapture(VIDEO);
  capture.size(canvasContainer.width(), canvasContainer.height());
  capture.hide();
  aspectRatio = capture.width / capture.height;

	frontEffects = createGraphics(capture.width,capture.height)
	backgroundEffects = createGraphics(capture.width,capture.height)

	// cacheGraphics.translate(capture.width, 0)
	// cacheGraphics.scale(-1,1)
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

let colorOffset = 0;
// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);    

  backgroundEffects.image(capture, 0, 0)

  frontEffects.image(capture, 0, 0)
  colorOffset += 5;
	let span = 10

  for (let i=0; i<backgroundEffects.width; i+=span) {
    for (let j=0; j<backgroundEffects.height; j+=span) {
      let pixel = backgroundEffects.get(i, j);

      let bk = (pixel[0]+pixel[1]+pixel[2])/3 // average pixel darkness

      fill(bk);
      noStroke();
      let n = noise()
      d = distance(mouseX, mouseY, i, j);
      let maxDist = distance(0,0,canvasContainer.width(),canvasContainer.height())
      ellipse(i,j, map(d, 0, maxDist, span*4, 0))

    }
  }


  span = 30
  for(var i=0;i<frontEffects.width;i+=span){
    for(var j=0;j<frontEffects.width;j+=span){
      let pixel = frontEffects.get(i,j)
      
      fill(255)
      fill(pixel)
      push()
      // blendMode(DIFFERENCE)
        colorMode(HSB)
        let bk = (pixel[0]+pixel[1]+pixel[2])/3
        let c = (bk + colorOffset) % 255
        d = distance(mouseX, mouseY, i, j);
        fill(c,100,90)
        translate(i,j)
        rotate(bk/70) 
        rectMode(CENTER) 
        rect(d/canvasContainer.width()*50, d/canvasContainer.height()*50, span*0.3 + bk/10)
        fill(0)
        // ellipse(0,0,5) // black dots
      pop()
    }
  }
  

}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}