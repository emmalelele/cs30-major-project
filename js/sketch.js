
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
let startGame = false;
let gameLevel = 0;
let startFrame



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
 
  console.log(startGame)
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
        makeGroupOfObstacles(random(5, 10), "Rectangles");
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
    para1.html("Score: " + gameLevel);
    console.log(gameLevel)
  }
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
    console.log("over")
    //Show GameOver Dialog
    const modalGameOverDialog = document.getElementById("game-over-dialog");
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