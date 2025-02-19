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

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

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
  // let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  // canvas.parent("canvas-container");
  // resize canvas is the page is resized
  let textBox = document.getElementById("textBox");
  // create an instance of the class
  civ = new Civilization();

  textBox.innerHTML = civ.generateCivilization();
  let regenButton = document.getElementById("regenButton");
  regenButton.onclick = function() {
    console.log("Regenerating...");
    textBox.innerHTML = civ.generateCivilization();
  }

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
// function draw() {
//   background(220);    
  
//   text(civ.generateCivilization(), centerHorz, centerVert);
// }

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}