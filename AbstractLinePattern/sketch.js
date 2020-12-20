let width = 1000;
let height = 1000;

let colors = [[219, 177, 188], [211, 196, 227], [143, 149, 211], [137, 218, 255]];

let lines = [];
let lineGroups = [];

let possibleLength = 130;
let possibleStartDifference = 700;

let baseLineSize = 610;
let baseLineIncrement = 15;
let outLineSize = 10;

function setup() {
  createCanvas(width, height);
  colorMode(RGB);
  noLoop();
  pixelDensity(2)
  background(...randomElement(colors))
}

function draw() {
  let numOfLines = 40;
  let numOfGroups = 1;

  for (j in range(numOfGroups)) {
    lineGroups.push([])
    for (l in range(numOfLines)) {
      let lineStart = [width / 2 - random(-possibleStartDifference, possibleStartDifference), height / 2 - random(-possibleStartDifference, possibleStartDifference)];
      lineGroups[j].push([lineStart[0] - random(-possibleLength, possibleLength), lineStart[1] - random(-possibleLength, possibleLength), lineStart[0] - random(-possibleLength, possibleLength), lineStart[1] - random(-possibleLength, possibleLength)])
    }
  }

  let currentStroke = baseLineSize;
  strokeWeight(currentStroke)
  let outline = true;
  let lastColor = randomElement(colors);

  while (currentStroke >= baseLineIncrement) {

    for (g in range(numOfGroups)) {
      if (outline) {
        stroke(0)
      } else {
        let nextColor = randomElement(colors);
        while (nextColor == lastColor) {
          nextColor = randomElement(colors)
        }
        stroke(...nextColor)
        lastColor = nextColor;
      }
      for (l of lineGroups[g]) {
        line(...l)
      }
    }

    if (outline) {
      currentStroke -= outLineSize;
      outline = false;
    } else {
      currentStroke -= baseLineIncrement;
      outline = true;
    }
    strokeWeight(currentStroke)
  }
}

let randomElement = (arr) => arr[int(random(arr.length))]
let range = (size, start = 1) => [...Array(size).keys()].map(i => i + start);


function keyTyped() {
  if (key === 's') {
    saveCanvas('AbstractLinePattern', 'png');
  }
}