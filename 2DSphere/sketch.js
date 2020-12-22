const ROWS = 20;
const RADIUS = 260;
const MIN_LEN = 35;
const MAX_LEN = 85;
const SPACE = 15;

let stripes = [];
let colors;

function setup() {
  createCanvas(850, 850);
  stroke(255);
  strokeWeight(14);

  colors = [
    color(142, 192, 124),
    color(250, 189, 47),
    color(251, 71, 44),
    color(211, 134, 147),
    color(49, 69, 80),
  ];

  for (var i = 0; i < ROWS; i++) {
    let Y_POS = ((i + 0.5) / ROWS) * (RADIUS * 2) - RADIUS;
    let ROW_LEN = getRowLength(Y_POS);
    addStripeRow(Y_POS, ROW_LEN);
  }
}

function draw() {
  clear();
  translate(width / 2, height / 2);
  for (var row in stripes) {
    for (var s in stripes[row]) {
      var stripe = stripes[row][s];
      let length = getRowLength(stripe.y);
      if (!isOutsideCircle(stripe, length)) {
        stroke(stripe.color);
        line(
          max(stripe.start + SPACE, -length),
          stripe.y,
          min(stripe.end - SPACE, length),
          stripe.y
        );
      } else if (stripe.start > length) {
        stripes[row].splice(s, 1);
        let s_length = random(MIN_LEN, MAX_LEN);
        let end = stripes[row][0].start;
        let start = end - s_length;
        stripes[row].unshift({
          y: stripe.y,
          start: start,
          end: end,
          color: colors[floor(random(5))],
        });
      }
      let startx = constrain(stripe.start, -length, length);
      let endx = constrain(stripe.end, -length, length);
      let startspeed =
        sqrt(2) - sqrt(stripe.y * stripe.y + startx * startx) / RADIUS;
      let endspeed = sqrt(2) - sqrt(stripe.y * stripe.y + endx * endx) / RADIUS;
      stripe.start += startspeed;
      stripe.end += endspeed;
    }
  }
}

function getRowLength(Y_POS) {
  if (RADIUS * RADIUS < Y_POS * Y_POS) return 0;
  return sqrt(RADIUS * RADIUS - Y_POS * Y_POS);
}

function isOutsideCircle(stripe, length) {
  return stripe.end - SPACE < -length || stripe.start + SPACE > length;
}

function addStripeRow(Y_POS, ROW_LEN) {
  let row = [];
  let length = random(MIN_LEN, MAX_LEN);
  let start = -1000 + random(MIN_LEN, MAX_LEN);
  let end = start + length;
  while (end < -ROW_LEN) {
    row.push({
      y: Y_POS,
      start: start,
      end: end,
      color: colors[floor(random(5))],
    });
    length = random(MIN_LEN, MAX_LEN);
    start = end;
    end = start + length;
  }
  stripes.push(row);
}
