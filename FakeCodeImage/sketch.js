// The width and height of our canvas. You can change these for experimentation!
let W = 1000;
let H = 1000;

// The startCode variable contains the value of the y axis of the first line of "code" we will draw.
let startCode = H / 20;
// The endCode variable contains the value of the y axis of the last line of "code" we will draw.
let endCode = H - startCode;

// noOfLines contains the value for the number of lines of "code".
let noOfLines = 30;
// lineSeparation contains the value for distance between each consecutive line of code.
let lineSeparation = (endCode - startCode) / noOfLines;

// Variables that we will reassign in our draw function. the names are self explanatory.
let lineY = startCode;
let lineX = 50;
let indent = 0;

/**
 * This is the setup function.
 * Every p5js sketch runs this function before the draw() function.
 */
function setup() {
  // Lets create a canvas with our width and height.
  createCanvas(W, H);
  // Setting the color mode to RGB. Not necessary, but working with RGB is easier imo.
  colorMode(RGB);
  // Set background color to black-ish type of color, but not pitch black.
  background(30, 30, 30);
  // Set the thickness of the lines we will draw
  strokeWeight(12);
  // Set the type of endings our lines will have
  strokeCap(ROUND);
  // This tells p5.js to not repeatedly execute the draw() function. WIthout this the draw function will be called indefinitely
  noLoop();
}

/**
 * This is the draw function. after the setup function, this is what is run.
 * It is run in a loop till the page is closed, to avoid this we use the noLoop() function in the setup function.
 * Contains all the code for drawing the actual image.
 */
function draw() {
  // We will make a loop, that will run `noOfLines` times.
  for (i = 0; i <= noOfLines; i++) {
    // Setting the value of lineX to the starting value (50) and adding the spaces for indentation where each indent is another 50 px.
    lineX = 50 + indent * 50;
    // Choosing a random amount of number of smaller lines or segments in each line.
    let lineSegments = random(2, 8);

    // random(1) returns a number between 0 and 1. if it is lesser than 0.5 (~50% chances) then change the color of line.
    if (random(1) < 0.5) {
      // stroke() is used to set the color to draw the line. it takes the values according to what we have set earlier.
      // We have set RGB so it will take 3 values. We randomize them all.
      stroke(random(50, 200), random(50, 200), random(50, 200));
    }

    // This loop basically makes small lines. It runs `lineSegments` times.
    for (j = 0; j <= lineSegments; j++) {
      // Set a random length between 10 px and 80 px.
      let segmentLength = random(10, 80);
      // create a line with the following syntax: line(startingX, startingY, endingX, endingY)
      line(lineX, lineY, lineX + segmentLength, lineY);
      // distance between each consecutive segment.
      lineX += segmentLength + 20;
    }

    // random(1) < 0.3 i.e. 30% chance. and also check if indent is not greater than 5, as if it becomes more than
    // 5, it will start to go out of the canvas.
    if (random(1) < 0.3 && indent < 5) {
      // increase the indent by 1 (multiplied by 50 later so technically increasing 50 px)
      indent += 1;
    } else if (random(1) < 0.5 && indent > 0) {
      // 50% chance, and checks if indent is not lesser than 0, else will become negative.

      // decrease the indent by 1 (multiplied by 50 later so technically increasing 50 px)
      indent -= 1;
    }

    // increase the y distance, i.e. next line will be drawn downwards at a distance of lineSeparation.
    lineY += lineSeparation;
  }
}

/**
 * This function is called when a key is pressed
 */
function keyTyped() {
  // If the pressed key is "s"
  if (key === "s") {
    // save the current Canvas to image. syntax: saveCanvas("name", "extension")
    saveCanvas("FakeCodeImage", "png");
  }
}
