// Emma Le
// Rise up game - major project

// Extra for expert:
// use a library called p5.play for physics and movements of the sprites
// used class objects with the p5.play Group() and Sprite()
// use local storage function from p5js to store the best score.
// use js's location.reload() 
// basically finished all the nice to have list



////////defining variables

//background
let theSky;
let backgroundY1;
let backgroundY2;
let scrollSpeed = 4;


// main sprites elements
let mainBall;
let theBalloon;
let imageScale = 0.5
let bgMusic;
let obstacleArr = [];
let arrTypeOfObstacles;
let theBall;

//score counting and game over variables
let startGame = false;
let gameLevel = 0;
let startFrame;
let bestScore;



//function to pick up random obstacle from the array
function randomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}



//loading images and sounds
function preload(){
  theSky = loadImage("asset/sky.jpg")
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
  theBalloon = new Sprite(width / 2, height/2 + 200);
  
  
  theBalloon.collider = 'static' //stay still
  theBall.collider = "static"

  theBalloon.image = "asset/orangeballoon.png"
  theBalloon.scale = 0.3

}


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

// function to make the obstacle scroll with the background
function scrollingObstacle(obsGroup) {
  for (let i = 0; i < obsGroup.length; i++) {
    obsGroup[i].position.y += scrollSpeed;
  }
}

// function to remove off screen obstacles, and check collision with balloon simultaneously
function removeOffscreenObstacles(groupObs, index) {
  //delete elements from the obstacleArr
  if (groupObs.length == 0) {
    obstacleArr.splice(index, 1);    
  }
  else {
    // delete obstacles when it goes off screen
    for (let i = groupObs.length - 1; i >= 0; i--) { //check collision with balloon
      
      if (checkCollision(groupObs[i])) {
        break;

      }
      if (
        groupObs[i].position.x + groupObs[i].width / 2 < 0 || 
        groupObs[i].position.x - groupObs[i].width / 2 > width ||
        groupObs[i].position.y + groupObs[i].height / 2 < 0 ||
        groupObs[i].position.y - groupObs[i].height / 2 > height)

      {

        groupObs[i].remove(); //remove the offscreen obstacle
      }
    }
  }
}


//check collide
function checkCollision(obstacle) {
  if (obstacle.collides(theBall)) {
    startGame = false;
    theBalloon.img = "asset/boom.png"; //change the balloon image to boom image
    theBalloon.scale = 0.7

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