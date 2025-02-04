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

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);    

  backgroundEffects.image(capture, 0, 0)

  frontEffects.image(capture, 0, 0)

	let span = 10

  for (let i=0; i<backgroundEffects.width; i+=span) {
    for (let j=0; j<backgroundEffects.height; j+=span) {
      let pixel = backgroundEffects.get(i, j);

      let bk = (pixel[0]+pixel[1]+pixel[2])/3 // average pixel darkness

      fill(pixel[0],pixel[1],pixel[2]);
      noStroke();  
      ellipse(i,j, span*map(bk,0,255,span/2, 0))
    }
  }


  span = 20
  for(var i=0;i<frontEffects.width;i+=span){
    for(var j=0;j<frontEffects.width;j+=span){
      let pixel = frontEffects.get(i,j)
      
      fill(255)
      fill(pixel)
      push()
      blendMode(DIFFERENCE)
        colorMode(HSB)
        fill(pixel[0],100,90)
        translate(i,j)
        rotate(pixel[0]/70) 
        rectMode(CENTER) 
        rect(1/10,1/10,span*0.3 + pixel[2]/10) // red rectangles
      
        
        fill(0)
        // ellipse(0,0,5) // black dots
      pop()
    }
  }
  
	// push()
	// 	blendMode(MULTIPLY)
  //   cacheGraphics.image(capture, 0, 0, canvasContainer.width(), canvasContainer.height());
	// pop()
  // cacheGraphics.image(capture, centerHorz-(capture.width/2), centerVert-(capture.height/2), capture.width, capture.height);

}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}