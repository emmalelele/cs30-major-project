// Rise up game - major project

// Extra for expert:
// use a library called p5.play for physics and movements of the sprites
// used class objects with the p5.play Group() and Sprite()
// use local storage from p5js to store the best score.
// use js's location.reload() 



//defining variables

//background
let theSky;
let backgroundY1;
let backgroundY2;
let scrollSpeed = 4;


// main sprites elements
let mainBall;
let balloon;
let imageScale = 0.5
let bgMusic;
let obstacleArr = [];
let theBall;

//score counting and game over variables
let startGame = false;
let gameLevel = 0;
let startFrame
let bestScore;



// object notations for the obstacle (type of obstacle, behaviour)
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
  {shape:"Stars",direction:"balloon"} // stars move toward balloon
];



//function to pick up random obstacle from the array
function randomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}



//loading images and sounds
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

  //making 2 main elements of the game
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
  obstacleArr.forEach(removeOffscreenObstacles); //remove off screen obstacles

}



//function to display obstacles
function displayObstacle(){
    if (frameCount % 299 == 0) {
      if (frameCount % 5 == 0) {
        makeGroupOfObstacles(7, "Pigs"); //make the pigs
      } 
      else {
        //randomly create other types of obstacle
        makeGroupOfObstacles(random(20,90), randomItemFromArray(arrTypeOfObstacles));
      }
    }
  
}

//displaying the scores
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

    para1.html("Score: " + gameLevel + " | Best Score: " + bestScore); //display the scores on the screen
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
  theBall = new Sprite(width / 2, height/2 + 166, 45); //make this circle under the balloon image so that when the obstacles touch the head of the balloon game over
  balloon = new Sprite(width / 2, height/2 + 200);
  
  
  balloon.collider = 'static'
  theBall.collider = "static"

  balloon.image = "orangeballoon.png"
  balloon.scale = 0.3

}



////////////////////////////////////////-----------------------------------------------/////////////////////////////////////////////

//function to make obstacles type and behaviour
function makeGroupOfObstacles(amount, typeOfSprites) {
  groupObs = new Group(); // build-in class objects Group()
  groupObs.y = 0;
  while (groupObs.length < amount) {
    let obs = new groupObs.Sprite();

    //square obstacles
    if (typeOfSprites.shape == "Squares") {

      if (typeOfSprites.rotate == "slow"){
        obs.width = random(20, 40);
        obs.height = obs.width;
        obs.rotationSpeed = 1;
        obs.x = random(0, width);
      }
      else if (typeOfSprites.rotate == "fast"){
        obs.width = random(20, 80);
        obs.height = obs.width;
        obs.rotationSpeed = 30;
        obs.width = random(20, 80);
        obs.height = obs.width;
        obs.x = random(0, width);
      }
      else{
        obs.width = 40;
        obs.height = obs.width;
        obs.y = 0
        obs.x = width
        obs.rotate = 80;
        obs.moveTowards(balloon, 0.01);
      }
      
    }

    //dots obstacle
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

    //rectangle obstacles
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

    //pigs obstacle
    if (typeOfSprites.shape == "Pigs") {
      obs.scale = random(0.3, 1.1);
      obs.y = random(0, -40);
      obs.img = "pig.png";
      if (typeOfSprites.direction == "balloon"){
        obs.x  = (groupObs.length-1)*(width/amount);
        obs.moveTowards(balloon, 0.3);
        obs.speed = obs.scale;
      }
      else{
        obs.x = random(0, width);
        obs.direction = "down";
        obs.speed = 0.01;
      }
    }

    //star obstacles
    if (typeOfSprites.shape == "Stars") {
      obs.scale = 0.02;
      obs.height = 30;
      obs.img = "star.png";
      if (typeOfSprites.direction == "balloon"){
        obs.y = random(0, -40);
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
  if (obstacle.collides(theBall)) {
    startGame = false;
    balloon.img = "boom.png";
    balloon.scale = 0.7

    //show GameOver Dialog
    const modalGameOverDialog = document.getElementById("game-over-dialog");
    document.getElementById("game-level-display").textContent = gameLevel;
    modalGameOverDialog.style.display = "block";
    //when Play again button click
    document
      .getElementById("play-again-button")
      .addEventListener("click", (e) => {
        location.reload(); //js function to reload the window
      });
    return true;
  } 
  else {
    return false;
  }
}