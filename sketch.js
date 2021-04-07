var PLAY = 1;
var END = 0;
var WIN=2;
var gameState = PLAY;

var spaceship, spaceshipImage;
var space, spaceImage;

var obstaclesGroup, obstacleImage;
var aliensGroup, alienImage;

var score=0;

var gameOver, restart;
var gameOverImg, restartImg;



function preload(){
spaceshipImage =  loadImage("Images/Spaceship.png")
spaceImage = loadImage("Images/Space.jpg")

 obstacleImage = loadImage("Images/Asteroid3.png");
 alienImage = loadImage("Images/aliensaved.png");
  
  gameOverImg = loadImage("Images/GameOver.jpg");
  restartImg = loadImage("Images/Restart.jpg");
}

function setup() {
  createCanvas(displayWidth-20, displayHeight-20);
  
  spaceship = createSprite(20, displayHeight/2,20,50);
  
  space = createSprite(0, 0, displayWidth, displayHeight);
  space.addImage("space",spaceImage);
  space.scale = 5;
  space.x = space.width/2;
  space.velocityX = -(6 + 3*score/100);

  
  spaceship.addImage("spaceship", spaceshipImage)

  gameOver = createSprite(650,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(650,525);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.6;
  restart.scale = 0.4;
  spaceship.scale = 0.05;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();
  aliensGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  

  spaceship.depth = space.depth;
  spaceship.depth = spaceship.depth + 1;

  //gameOver.depth = ObstaclesGroup.depth;
  //gameOver.depth = ObstaclesGroup.depth + 1;
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    space.velocityX = -(6 + 6*score/100);
  
    if(keyDown("space")) {
      spaceship.velocityY = -8;
    }
  
    spaceship.velocityY = spaceship.velocityY + 0.8
  
    if (space.x < 0){
      space.x = space.width/2;
    }
  
    spawnObstacles();
   // spawnAliens();
  
    if(obstaclesGroup.isTouching(spaceship)||spaceship.y>=displayHeight){
        gameState = END;
    }

    else if(score===10000){
      gameState=WIN;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    space.velocityX = 0;
    spaceship.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    //aliensGroup.setLifetimeEach(-1);

    gameOver.depth=gameOver.depth+1;
    restart.depth=restart.depth+1;
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  text("Score: "+ score, displayWidth-100,displayHeight-30);
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth, 30, 10, 40);
    var rand = Math.round(random(30, displayHeight-30))
    obstacle.y=rand;
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacle.depth=gameOver.depth;
    obstacle.depth=restart.depth;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

/*function spawnAliens() {
  if (frameCount % 60 === 0) {
    var alien = createSprite(displayWidth, 30, 10, 40);
    var rand = Math.round(random(30, displayHeight-30))
    alien.y=rand;
    alien.velocityX = -(6 + 3*score/100);

    alien.addImage(alienImage);
    alien.scale = 0.5;

    alien.scale = 1;
    alien.lifetime = 300;

    aliensGroup.add(alien);
  }
}*/

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  aliensGroup.destroyEach();


  
 
  
  score = 0;
  spaceship.y=displayHeight/2;
  
}