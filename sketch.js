let theSky;
let y1;
let y2;
let scrollSpeed = 3;


function preload(){
  theSky = loadImage("11.webp")
}

function setup() {
	new Canvas(windowWidth, windowHeight);
  y1 = 50;
  y2 = -550;

	
}

function draw() {
  moveBackground()
}

//make scrolling background
function moveBackground() {
  image(theSky, 0, y1, windowWidth, windowHeight);
  image(theSky, 0, y2, windowWidth, windowHeight);
  y1 += scrollSpeed;
  y2 += scrollSpeed;
  if (y1 >= windowHeight) {
    y1 = -500;
  }
  if (y2 >= windowHeight) {
    y2 = -500;
  }
}