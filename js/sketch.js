let theSky;
let y1;
let y2;
let scrollSpeed = 3;
let mainBall;
let gems =[];
let gem2 = [];
let gem3 = [];
let obstacleArr = [];
let lastGemTime = 0;
let balloon;




function preload(){
  theSky = loadImage("blue.jpg")
}

function setup() {
	new Canvas(windowWidth, windowHeight);
  y1 = 50;
  y2 = -550;
  makePlayer()
  makeBalloon()
  dotsObstacle();
  
}

function draw() {
  moveBackground()
  removeOffscreenObstacles(gems);
  removeOffscreenObstacles(gem2);
  removeOffscreenObstacles(gem3);

  mainBall.moveTowards(mouse);
  scrollingObstacle(gems)
  if (frameCount - lastGemTime > 5 * 60) { 
    if (frameCount % 3 === 0) {
      makeGemSquare();
      } 
    else if (frameCount % 3 === 1) {
        makeGemSquare();
        dotsObstacle()
      } 
    else {
        makeGemRect();
      }
      lastGemTime = frameCount; 
    }
    updateGem()
    // if (checkCollide(balloon, mainBall)){
    //   balloon.allowSleeping = true;
    // }
  }






function updateGem(){
    //update and draw the gems in gem3 group
    if (gems) {
      scrollingObstacle(gems)
      }
 
      //update and draw the gems in gem2 group
      if (gem2) {
        scrollingObstacle(gem2)
      }
 
      //update and draw the gems in gems group
      if (gem3) {
        scrollingObstacle(gem3)
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
  gems.y = 0;
  gems.amount = 200;
  obstacleArr.push(gems)
}

function makeGemSquare() {
  gem2 = new Group();
  gem2.width = 50;
  gem2.height = 10;
  gem2.x = () => random(0, width);
  gem2.y = 0
  gem2.amount = 100;
  obstacleArr.push(gem2)
}

function makeGemRect() {
  gem3 = new Group();
  gem3.width = 300;
  gem3.height = 10;
  gem3.x = width / 2;
  gem3.y = 0
  gem3.amount = 5;
  while (gem3.length < 9){
  let newGem = new gem3.Sprite();
  newGem.y = gem3.length * 10;
  }
  obstacleArr.push(gem3)
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


function scrollingObstacle(gemGroup){
  for (let i = 0; i < gemGroup.length; i++) {
    gemGroup[i].y += scrollSpeed; 
  }
}

function removeOffscreenObstacles(gemGroup) {
  let obstacleToRemove = [];
  for (let i = gemGroup.length - 1; i >= 0; i--) {
    if (gemGroup[i].position.x + gemGroup[i].width / 2 < 0 || gemGroup[i].position.x - gemGroup[i].width / 2 > width ||gemGroup[i].position.y + gemGroup[i].height / 2 < 0 ||gemGroup[i].position.y - gemGroup[i].height / 2 > height) {
      console.log("Removing gem at index:", i);
      //so it won't mess up the index
      obstacleToRemove.push(i);
    }
  }

  //delete after outside the first loop
  for (let i of obstacleToRemove) {
    gemGroup[i].remove();
  }
}





function checkCollide(balloon, obstacle){
  if (balloon.colliding(obstacle)){
    return true;
  }
}

function makeBalloon(){
  balloon = createSprite(width / 2, height / 2 + 50, 50);
}

// function manageGameOver(){
//   for (let i = 0; i < obstacleArr; i ++){
//     if (checkCollide(balloon, obstacleArr)){
//       balloon.sleeping = true;
//     }
//   }
// }