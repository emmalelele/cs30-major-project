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


 // class Obstacle(){

 // }






 function preload(){
  theSky = loadImage("sky.jpg")
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
  displayObstacles()
  
  }

  function displayObstacles() {
    if (frameCount - lastGemTime > 4 * 60) {
      if (frameCount % 4 === 0) {
        makeGemSquare(100, 100, () => random(0, width), 0, 4);
      } 
      else if (frameCount % 4 === 1) {
        makeGemSquare(50, 10, () => random(0, width), 0, 100);
        
      } 
      else if (frameCount % 4 === 2) {
        makeGemRect(300, 10, width/2, 0, 5)

      } 
      else if (frameCount % 3 === 0) {
        dotsObstacle(10, 10)
      } 
      else if (frameCount % 3 === 1) {
        dotsObstacle(50,4)
      } 
      else if (frameCount % 3 === 2 ) {
        dotsObstacle(100, () => random(0, width), 0, 5)
      } 
      else {
        dotsObstacle(70, () => random(0, width), 0, 10)
      }
      lastGemTime = frameCount;
    }
    updateGem();
    if (checkCollide(balloon, mainBall)) {
      balloon.allowSleeping = true;
    }
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

function dotsObstacle(diameter, x, y, amount) {
  gems = new Group();
  gems.diameter = diameter;
  gems.x = x;
  gems.y = y;
  gems.amount = amount
  obstacleArr.push(gems)
}

function makeGemSquare(width, height, x, y, amount) {
  gem2 = new Group();
  gem2.width = width;
  gem2.height = height;
  gem2.x = x;
  gem2.y = y;
  gem2.amount = amount;
  gem2.rotationSpeed = 1
  obstacleArr.push(gem2)
}

function makeGemRect(width, height, x, y, amount) {
  gem3 = new Group();
  gem3.width = width;
  gem3.height = height;
  gem3.x = x;
  gem3.y = y;
  gem3.amount = amount;
  while (gem3.length < 9){
  let newGem = new gem3.Sprite();
  newGem.y = gem3.length * 10;
  }
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
function scrollingObstacle(gemGroup) {
  for (let i = 0; i < gemGroup.length; i++) {
    gemGroup[i].position.y += scrollSpeed;
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
  balloon.collider = 'static'
}
// function manageGameOver(){
//   for (let i = 0; i < obstacleArr; i ++){
//     if (checkCollide(balloon, obstacleArr)){
//       balloon.sleeping = true;
//     }
//   }
// }