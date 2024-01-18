
//defining variables
let theSky;
let backgroundY1;
let backgroundY2;
let scrollSpeed = 4;
let mainBall;
let obstacleArr = [];
let lastGemTime = 0;
let balloon;
let imageScale = 0.5
let bgMusic;
let startGame = false;
let gameLevel = 0;
let startFrame
let bestScore;
let theString;
let theBall



let arrTypeOfObstacles = [
  {shape:"Squares", rotate:"slow"},
  {shape:"Squares", rotate:"fast"}, //rotate fast
  {shape:"Squares", arrange:"toward"}, // move toward balloon
  {shape:"Dots", arrange:"random"}, //appear random
  {shape:"Dots", arrange:"center"}, //appear centre of the screen
  {shape:"Rectangles", arrange:"vertical"}, //arrange vertically
  {shape:"Rectangles", arrange:"horizontal"}, // arrange horizontally
  {shape:"Pigs",direction:"down"}, //move down like normal
  {shape:"Pigs",direction:"balloon"}, // move toward the balloon
  {shape:"Stars",direction:"balloon"}
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
  para1 = createElement('p', "");
  para1.position(width/2,height/2);
	new Canvas(windowWidth, windowHeight);
  backgroundY1 = 0;
  backgroundY2 = height;
  makeBalloon();
  makePlayer();
  
  
  
 
  //show start dialogue
  let modalStartDialog = document.getElementById("start-dialog");
  modalStartDialog.style.display = "block";

  // start game
  document.getElementById("start-button").addEventListener("click", (e) => {
    bgMusic.loop(); //start playing bgMusic
    modalStartDialog.style.display = "none"; //close start dialogue
    startGame = true
  });
 
  //set up local storage for best score
  bestScore = getItem("bestScore");

  //if bestScore is null (first time playing), set it to 0
  if (bestScore === null) {
    bestScore = 0;
  }
}

//draw 
function draw() {
  if (startGame){
    displayScore()
    mainBall.moveTowards(mouse);
    displayObstacle()
  }
  scrollingDownBackground();
  obstacleArr.forEach(scrollingObstacle); //update position of the obstacles
  obstacleArr.forEach(removeOffscreenObstacles);

}




function displayObstacle(){
    if (frameCount % 299 == 0) {
      if (frameCount % 5 == 0) {
        makeGroupOfObstacles(7, "Stars");
      } 
      else {
        //random create "Squares" and "Dots"
        makeGroupOfObstacles(random(20,90), randomItemFromArray(arrTypeOfObstacles));
      }
    }
  
}


function displayScore(){
  if (!startFrame){
    startFrame = frameCount;
  }
  if (frameCount < 20000) {
    gameLevel = Math.floor(1 + (frameCount - startFrame) / 100); //increase the gameLevel
    if (gameLevel > bestScore) {
      bestScore = gameLevel;

      //save best score to local storage
      storeItem("bestScore", bestScore);
    }

    para1.html("Score: " + gameLevel + " | Best Score: " + bestScore);
    console.log(gameLevel)
  }
}


//making the shield
function makePlayer() {
  noStroke()
  mainBall = new Sprite(width / 2, height / 2, 50);
  mainBall.color = "grey"

}

//make the balloon
function makeBalloon(){
  balloon = new Sprite(width / 2, height/2 + 200, 50);
  theString = new Sprite(250, 0, 10, 50, 'k');
  theBall = new GlueJoint(balloon, theString);

  balloon.collider = 'static'
  balloon.color = "white"
  theString.collider = 'static'

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
        obs.x = random(0, width);
      }
      else if (typeOfSprites.rotate == "fast"){
        obs.rotationSpeed = 30;
        obs.width = random(20, 80);
        obs.height = obs.width;
        obs.x = random(0, width);
      }
      else{

        obs.y = 0
        obs.x = width
        obs.rotate = 80;
        obs.moveTowards(balloon, 0.01);
      }
      
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
      if (typeOfSprites.arrange == "vertical"){
        obs.width = random(100, 150);
        obs.height = 30;
        obs.x = width/2;
        obs.y = 0-groupObs.length*30;
        obs.rotate = 0;
      }
      else {
        obs.height = random(100, 150);
        obs.width = 30;
        obs.x  = (groupObs.length-1)*(width/amount);
        obs.y = 0;
        obs.rotateTowards(mouse, 0.05, 0);
        obs.speed = 0.05;
      }
    }
    if (typeOfSprites.shape == "Pigs") {
      obs.scale = random(0.3, 1.1);
      obs.y = random(0, -40);
      obs.img = "pig.png";
      if (typeOfSprites.direction == "balloon"){
        obs.x  = (groupObs.length-1)*(width/amount);
        obs.moveTowards(balloon, 0.1);
        obs.speed = obs.scale;
      }
      else{
        obs.x = random(0, width);
        obs.direction = "down";
        obs.speed = 0.01;
      }
    }
    if (typeOfSprites.shape == "Stars") {
      obs.scale = 0.02;
      obs.height = 30;
      obs.img = "star.png";
      if (typeOfSprites.direction == "balloon"){
        obs.x = random(0, width);
        obs.direction = "down";
        obs.speed = 0.01;
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
    for (let i = groupObs.length - 1; i >= 0; i--) { //check collision with balloon
      
      if (checkCollision(groupObs[i])) {
        //Check collision with the balloons
        break;

      }
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
    startGame = false;
    balloon.img = "boom.png";
    console.log("over")
    //Show GameOver Dialog
    const modalGameOverDialog = document.getElementById("game-over-dialog");
    document.getElementById("game-level-display").textContent = gameLevel;
    modalGameOverDialog.style.display = "block";
    //When Play again button click
    document
      .getElementById("play-again-button")
      .addEventListener("click", (e) => {
        location.reload();
      });
    return true;
  } 
  else {
    return false;
  }
}