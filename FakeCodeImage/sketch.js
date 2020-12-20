let width = 1000;
let height = 1000;

let startCode = height / 20;
let endCode = height - startCode;

let noOfLines = 30;
let lineSeparation = (endCode - startCode) / noOfLines

let lineY = startCode;
let lineX = 50;
let indent = 0;

function setup() {
  createCanvas(width, height);
  colorMode(RGB);
  background(30, 30, 30);
  strokeWeight(12)
  strokeCap(ROUND)
  stroke(0, 255, 255)
  noLoop()
}

function draw() {
  for (i = 0; i <= noOfLines; i++) {
    lineX = 50 + (indent * 50);
    let lineSegments = random(2, 8)

    if (random(1) < .5) {
      stroke(random(50, 200), random(50, 200), random(50, 200))
    }
    for (j = 0; j <= lineSegments; j++) {
      let segmentLength = random(10, 80)
      line(lineX, lineY, lineX + segmentLength, lineY)
      lineX += segmentLength + 20
    }

    if (random(1) < .3 && indent < 5) {
      indent += 1;
    } else if (random(1) < .5 && indent > 0) {
      indent -= 1;
    }

    lineY += lineSeparation;
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('FakeCodeImage', 'png');
  }
}