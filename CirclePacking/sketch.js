let w = 1000;
let h = 1000;

let circles = [];

let counter = 0;

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(10, 50);
  }
}

function setup() {
  createCanvas(w, h);
  colorMode(RGB);
  background(30, 30, 30);
  noLoop();
}

function draw() {
  let colors = [randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()];
  while (circles.length < 1000) {
    let overlapping = false;
    let proposalCircle = new Circle();
    for (j in range(circles.length)) {
      let existingCircle = circles[j];
      let d = dist(proposalCircle.x, proposalCircle.y, existingCircle.x, existingCircle.y);
      if (d < proposalCircle.r + existingCircle.r) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      circles.push(proposalCircle);
      noStroke();
      fill(...randomElement(colors))
      ellipse(proposalCircle.x, proposalCircle.y, proposalCircle.r * 2, proposalCircle.r * 2);
    }
    counter++;
    if (counter > 100000) {
      break;
    }
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('CirclePacking', 'png');
  }
}

let range = (size, start = 1) => [...Array(size).keys()].map(i => i + start);
let randomElement = (arr) => arr[int(random(arr.length))];
let randomColor = () => [random(10, 200), random(10, 200), random(10, 200)];
