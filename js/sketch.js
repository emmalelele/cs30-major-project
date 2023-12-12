
//defining variables
let theSky;
let backgroundY1;
let backgroundY2;
let scrollSpeed = 4;
let mainBall;
let gems =[];
let gem2 = [];
let gem3 = [];
let obstacleArr = [];
let lastGemTime = 0;
let balloon;
let theBirdImage;
let birdObstacle;
let birdGroup;
let imageScale = 0.5
let score = 0


//loading images
function preload(){
  theSky = loadImage("sky.jpg")

}

//set up
function setup() {
	new Canvas(windowWidth, windowHeight);
  backgroundY1 = 0;
  backgroundY2 = height;
  makePlayer()
  makeBalloon()



}

//draw 
function draw() {
  //a timer to check which kind of obstacle to display
  score ++;
  scrollingDownBackground();
  obstacleArr.forEach(scrollingObstacle);
  obstacleArr.forEach(removeOffscreenObstacles);

  //making the shield move toward mouse
  mainBall.moveTowards(mouse);

  //update the position of the obstacles
  updateGem()

  console.log(score)


//displaying different scenario
  if (score < 1000){
    displayObstacles();
  }
  else if (score > 1000){
    displayObstacleScenario2()
  }
}

// scenario 1
function displayObstacles() {
    if (frameCount - lastGemTime > 4 * 60) { //make new obstacle every 4 seconds
      if (frameCount % 3 === 0) {
        makeGroupOfObstacles("Squares", 100, 100, () => random(0, width), 0, random(4,8), 0);
      } 
      else if (frameCount % 3=== 1) {
        makeGroupOfObstacles("Squares", random(10,20), () => random(0, width), 0, random(100));

      } 
      else if (frameCount % 3 === 2) {
        makeGroupOfObstacles("Rectangles", 600, 10, width/2, 0, 5, 0)

      } 
      lastGemTime = frameCount;
    } 
  }

//scenario 2
function displayObstacleScenario2(){
    if (frameCount - lastGemTime > 2 * 60){ // make new obstacle every 2 seconds
      if (frameCount % 3 === 0) {
        makeGroupOfObstacles("Dots", 0, 0, () => random(0, width), 0, random(4,8), 10)
      } 
      else if (frameCount % 3 === 1) {
        makeGroupOfObstacles("Dots", 0, 0, () => random(0, width), 0, random(4,8), 50)
      } 
      else if (frameCount % 3 === 2 ) {
        makeGroupOfObstacles("Dots", 0, 0, () => random(0, width), 0, random(4,8), 100)
      } 
      lastGemTime = frameCount;
    }

  }


// function to update position of the obstacles
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



//making the shield
function makePlayer() {
  noStroke();
  mainBall = new Sprite(width / 2, height / 2, 50, "lavender");

}

//make the balloon
function makeBalloon(){
  balloon = createSprite(width / 2, height / 2 + 50, 50);
  balloon.collider = 'static'
}


////////////////////////////////////////-----------------------------------------------/////////////////////////////////////////////


// circle obstacle
// function dotsObstacle(diameter, x, y, amount) {
//   gems = new Group();
//   gems.diameter = diameter;
//   gems.x = x;
//   gems.y = y;
//   gems.amount = amount
//   obstacleArr.push(gems)
// }

// // square obstacles
// function makeGemSquare(width, height, x, y, amount) {
//   gem2 = new Group();
//   gem2.width = width;
//   gem2.height = height;
//   gem2.x = x;
//   gem2.y = y;
//   gem2.amount = amount;
//   gem2.rotationSpeed = 10
//   obstacleArr.push(gem2)
// }

// //rectangle obstacles
// function makeGemRect(width, height, x, y, amount) {
//   gem3 = new Group();
//   gem3.width = width;
//   gem3.height = height;
//   gem3.x = x;
//   gem3.y = y;
//   gem3.amount = amount;
//   while (gem3.length < 15){
//   let newGem = new gem3.Sprite();
//   newGem.y = gem3.length * 20;
//   }
// }

function makeGroupOfObstacles(typeOfSprites, width, height, x, y, amount, diameter) {
  groupObs = new Group();

  while (groupObs.length < amount) {
    let obs = new groupObs.Sprite();
    if (typeOfSprites == "Squares") {
      obs.width = width;
      obs.height = height;
      obs.x = x;
      obs.y = y;
      obs.amount = amount;
      obs.rotationSpeed = 10
    }
    if (typeOfSprites == "Dots") {
      obs.diameter = diameter;
      obs.x = x;
      obs.y = y;
      obs.amount = amount
    }
    if (typeOfSprites == "Rectangles") {
      obs.width = width;
      obs.height = height;
      obs.x = x;
      obs.y = y;
      obs.amount = amount;
      while (obs.length < 15){
        let newGem = new obs.Sprite();
        newGem.y = obs.length * 20;
      }
    }
  }
  obstacleArr.push(groupObs);
}





/////////////////////////////////////////////////////-------------------------------------//////////////////////////////////////////////////////////



//Make the scrolling-down background
function scrollingDownBackground() {
  image(theSky, 0, backgroundY1, windowWidth, windowHeight);
  image(theSky, 0, backgroundY2, windowWidth, windowHeight);
  backgroundY1 += scrollSpeed;
  backgroundY2 += scrollSpeed;
  if (backgroundY1 >= height) {
    backgroundY1 = -height;
  }
  if (backgroundY2 >= height) {
    backgroundY2 = -height;
  }
}

function scrollingObstacle(gemGroup) {
  for (let i = 0; i < gemGroup.length; i++) {
    gemGroup[i].position.y += scrollSpeed;
  }
}

// function to remove off screen obstacles
function removeOffscreenObstacles(gemGroup) {
  let obstacleToRemove = [];
  for (let i = gemGroup.length - 1; i >= 0; i--) {
    if (gemGroup[i].position.x + gemGroup[i].width / 2 < 0 || 
       gemGroup[i].position.x - gemGroup[i].width / 2 > width ||
       gemGroup[i].position.y + gemGroup[i].height / 2 < 0 ||
       gemGroup[i].position.y - gemGroup[i].height / 2 > height) {
      //so it won't mess up the index
      obstacleToRemove.push(i);
    }
  }
  //delete after outside the first loop
  for (let i of obstacleToRemove) {
    gemGroup[i].remove();
  }
}

//check collide
function checkCollide(balloon, obstacle){
  if (balloon.colliding(obstacle)){
    return true;
  }
}



// function manageGameOver(){
//   for (let i = 0; i < obstacleArr; i ++){
//     if (checkCollide(balloon, obstacleArr)){
//       balloon.sleeping = true;
//     }
//   }
// }