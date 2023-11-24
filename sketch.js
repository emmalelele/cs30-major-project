let theSky;
let y1;
let y2;
let scrollSpeed = 3;
let mainBall;
let gems;
let lastGemTime = 0;


function preload(){
  theSky = loadImage("11.webp")
}

function setup() {
	new Canvas(windowWidth, windowHeight);
  y1 = 50;
  y2 = -550;
  makePlayer()
  dotsObstacle();

	
}

function draw() {
  moveBackground()
  mainBall.moveTowards(mouse);
  scrollingObstacle(gems)
  if (frameCount - lastGemTime > 5 * 60) { 
    if (frameCount % 3 === 0) {
      dotsObstacle();
    } 
    lastGemTime = frameCount; 
  }
  updateGem()
}

function updateGem(){
  //update and draw the gems in gem3 group
  if (gems) {
    scrollingObstacle(gems)
    }

}
  



function makePlayer() {
  noStroke();
  mainBall = new Sprite(width / 2, height / 2, 50, "lavender");
  
}


function dotsObstacle() {
  gems = new Group();
  gems.diameter = 10;
  gems.x = () => random(0, width);
  gems.y = ()  => random(0, width);
  gems.amount = 200;
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


function scrollingObstacle(){
  for (let i = 0; i < gemGroup.length; i++) {
    gemGroup[i].y += scrollSpeed; 
  }
}