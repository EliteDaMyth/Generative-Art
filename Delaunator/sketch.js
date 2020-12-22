let img;
let num_triangles = 5000;

function preload() {
  img = loadImage("./parrot.jpg");
}

function setup() {
  input = createFileInput(handleFile);
  input.position(0, 0);
  img.resize(img.width / 2, img.height / 2)
  createCanvas(img.width, img.height);

  noLoop()
}

function draw() {

  background(255);
  pixelDensity(1)

  img.loadPixels();
  loadPixels()

  var points = []
  for (var i = 0; i < num_triangles; i++) {
    points.push([Math.random() * img.width, Math.random() * img.height])
  }

  points.push([0, 0])
  points.push([0, img.height])
  points.push([img.width, img.height])
  points.push([img.width, 0])

  const delaunay = Delaunator.from(points);

  let triangle_points = [];

  for (let triangle_id = 0; triangle_id < delaunay.triangles.length / 3; triangle_id++) {

    triangle_points = []

    for (var i = 0; i < 3; i++) {
      let halfedge_id = 3 * triangle_id + i;
      let point_id = delaunay.triangles[halfedge_id];
      triangle_points.push(points[point_id]);
    }

    var center_x = (triangle_points[0][0] + triangle_points[1][0] + triangle_points[2][0]) / 3
    var center_y = (triangle_points[0][1] + triangle_points[1][1] + triangle_points[2][1]) / 3

    var index = (floor(center_x) + floor(center_y) * img.width) * 4;

    var r = img.pixels[index]
    var b = img.pixels[index + 1]
    var g = img.pixels[index + 2]
    var a = img.pixels[index + 3]

    fill(r, b, g, a)
    stroke(r, b, g, a)
    strokeWeight(0)
    beginShape()
    vertex(triangle_points[0][0], triangle_points[0][1])
    vertex(triangle_points[1][0], triangle_points[1][1])
    vertex(triangle_points[2][0], triangle_points[2][1])
    endShape()
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('Delaunated', 'png');
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    loadImage(file.data, im => {
      img = im;
      img.resize(img.width / 2, img.height / 2)
      resizeCanvas(img.width, img.height);
      draw();
    });
  }
}