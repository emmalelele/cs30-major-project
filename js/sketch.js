
//defining variables
let theSky;
let backgroundY1;
let backgroundY2;
let scrollSpeed = 4;
let mainBall;
let obstacleArr = [];
let lastGemTime = 0;
let balloon;
let theBirdImage;
let birdObstacle;
let birdGroup;
let imageScale = 0.5
let bgMusic;
let startGame = true;
let gameOver = false;


let arrTypeOfObstacles = [
  {shape:"Squares", rotate:"slow"},
  {shape:"Squares", rotate:"fast"}, //rotate fast
  {shape:"Dots", arrange:"random"}, //appear random
  {shape:"Dots", arrange:"center"}, //appear centre of the screen
  {shape:"Rectangles", arrange:"vertical"}, //arrange vertically
  {shape:"Rectangles", arrange:"horizontal"} // arrange horizontally
  
];

//function to pick up random obstacle from the array
function randomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}



//loading images
function preload(){
  theSky = loadImage("sky.jpg")
  bgMusic = loadSound("sound.mp3")

}

//set up
function setup() {
	new Canvas(windowWidth, windowHeight);
  backgroundY1 = 0;
  backgroundY2 = height;
  makePlayer()
  makeBalloon()
  manageGameOver(obstacleArr)
  
}

//draw 
function draw() {

  scrollingDownBackground();
  obstacleArr.forEach(scrollingObstacle); //update position of the obstacles
  obstacleArr.forEach(removeOffscreenObstacles);

  //making the shield move toward mouse
  mainBall.moveTowards(mouse);
  //display
  displayObstacle()
}




function displayObstacle(){
  if (frameCount % 299 == 0) {
    if (frameCount % 5 == 0) {
      makeGroupOfObstacles(5, "Rectangles");
    } 
    else {
      //random create "Squares" and "Dots"
      makeGroupOfObstacles(random(20,50), randomItemFromArray(arrTypeOfObstacles));
    }
  }
}




function mousePressed(){
  bgMusic.play()
}


//making the shield
function makePlayer() {
  noStroke();
  mainBall = new Sprite(width / 2, height / 2, 50);
  fill("grey")

}

//make the balloon
function makeBalloon(){
  balloon = createSprite(width / 2, height / 2 + 50, 50);
  balloon.collider = 'static'
}


////////////////////////////////////////-----------------------------------------------/////////////////////////////////////////////


function makeGroupOfObstacles(amount, typeOfSprites) {
  groupObs = new Group();
  groupObs.y = 0;
  while (groupObs.length < amount) {
    let obs = new groupObs.Sprite();
    if (typeOfSprites.shape == "Squares") {
      obs.width = random(20, 80);
      obs.height = obs.width;
      if (typeOfSprites.rotate == "slow"){
        obs.rotationSpeed = 1;
      }
      else{
        obs.rotationSpeed = 30;
      }
      obs.x = random(0, width);
    }
    if (typeOfSprites.shape == "Dots") {
      obs.diameter = random(20, 80);
      if (typeOfSprites.arrange == "random"){
        obs.x = random(0, width);
        obs.direction = random(0, 180);
        obs.speed = 3;
      }
      else{
        obs.x = random(width/2-40,width/2+40);
        obs.y = random(0, -40);
        obs.rotationSpeed = 0;
      }
      
    }
    if (typeOfSprites.shape == "Rectangles") {
      obs.height = random(100, 150);
      obs.width = 30;
      obs.y = 0
      if (typeOfSprites.arrange == "vertical"){
        while (obs.length < 15){
          let newGem = new gem3.Sprite();
          newGem.y = obs.length * 20;
        }
      }
      else{
        while (obs.length < 15){
          let newGem = new gem3.Sprite();
          newGem.x = obs.length * 20;
          }
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
function removeOffscreenObstacles(groupObs, index) {
  //delete elements from the obstacleArr
  if (groupObs.length == 0) {
    obstacleArr.splice(index, 1);    
  } 
  else {
    // delete obstacles when it goes off screen
    for (let i = groupObs.length - 1; i >= 0; i--) {
      if (
        groupObs[i].position.x + groupObs[i].width / 2 < 0 || 
        groupObs[i].position.x - groupObs[i].width / 2 > width ||
        groupObs[i].position.y + groupObs[i].height / 2 < 0 ||
        groupObs[i].position.y - groupObs[i].height / 2 > height)

      {
        // console.log("Removing obstacle at index:", i);
        groupObs[i].remove();
      }
    }
  }
}


//check collide
function checkCollision(obstacle) {
  if (obstacle.collides(balloon)) {
    return true;
  } 
  else {
    return false;
  }
}

function manageGameOver(groupObs){
  for (let i = groupObs.length - 1; i >= 0; i--){
    if (checkCollision(groupObs[i])){
      startGame = false;
      console.log("over")
    }
  }
}
