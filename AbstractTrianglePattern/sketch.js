var colors = [[111, 191, 183], [242, 198, 65], [242, 149, 68], [242, 102, 102], [3, 101, 140], [80, 191, 191]];
var tw = 75;
var th = 75;
function setup() {
  createCanvas(750, 750);
  noLoop();
}
function draw() {
  noStroke();
  for (var x = 0; x < width; x += tw) {
    for (var y = 0; y < height; y += th) {

      let rand = random();
      console.log(rand);
      drawTriangles(x, y, rand);
    }
  }
}
function drawSquare(x, y, w, h) {
  if (random() < 0.8) {
    fill(colors[parseInt(random() * colors.length)]);
    rect(x, y, w, h);
  } else {
    fill(100);
    rect(x, y, w, h);
  }
}

function drawTriangles(x, y, dir) {

  let ulx = x;
  let uly = y;
  let llx = x;
  let lly = y + th;
  let urx = x + tw;
  let ury = y;
  let lrx = x + tw;
  let lry = y + th;

  if (dir > .5) {
    fill(getColor());
    triangle(ulx, uly, llx, lly, urx, ury);
    fill(getColor());
    triangle(llx, lly, urx, ury, lrx, lry);
  } else if (dir <= .5) {
    fill(getColor());
    triangle(ulx, uly, llx, lly, lrx, lry);
    fill(getColor());
    triangle(ulx, uly, urx, ury, lrx, lry);
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('AbstractTriangle', 'png');
  }
}

var getColor = () => {
  let col;

  if (random() < 0.8) {
    col = colors[parseInt(random(colors.length))];
  } else {
    col = 100;
  }
  stroke(col);
  return col;
}