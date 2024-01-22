// object notations for the obstacle (type of obstacle, behaviour)
arrTypeOfObstacles = [
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
          obs.moveTowards(theBalloon, 0.01);
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
        obs.img = "asset/pig.png";
        if (typeOfSprites.direction == "balloon"){
          obs.x  = (groupObs.length-1)*(width/amount);
          obs.moveTowards(theBalloon, 0.3);
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
        obs.img = "asset/star.png";
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
    