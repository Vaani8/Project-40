var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,honey,spikes;

var score;

function preload(){
  
  groundImg = loadImage("ground.png");
  bears = loadAnimation("bear2.png");

  spikeImg = loadImage("Spikes.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  honeyImg=loadImage("honey.png")

  restartImg=loadImage("restart.png")
  
}

function setup() {
  createCanvas(displayWidth,displayHeight-160);
  
  bear = createSprite(displayWidth/2,displayHeight/2,20,50);
  bear.addAnimation("walking",bears);
  bear.scale = 0.7;
  
  //ground = createSprite(displayWidth,displayHeight/2,400,20);
  //ground.x = ground.width /2;
  
  gameOver = createSprite(displayWidth/2,displayHeight/4);
  gameOver.addImage(gameOverImg);
  restart=createSprite(displayWidth/2,displayHeight/4+50);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(displayWidth/2,displayHeight/2+200,1500,10);
  invisibleGround.visible = true;
  bear.collide(invisibleGround);
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  honeyGroup = createGroup();

  bear.setCollider("rectangle",0,25,350,200);
  bear.debug = false;
  
  score = 0;
  
}

function draw() {
  
  background(1000 );
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    //ground.velocityX = -(4 + 3* score/100)
    
    //if (ground.x < 0){
    //  ground.x = ground.width/2;
    //}
    
    //jump when the space key is pressed
    if(keyDown("space")&& bear.y >= displayHeight/2-30) {
        bear.velocityY = -12;
    }
    
    //add gravity
    bear.velocityY = bear.velocityY + 0.3
  
    //spawn the clouds
    spawnHoney();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(honeyGroup.isTouching(bear)){
      honeyGroup.destroyEach();
      score=score+1;
    }
  
    if(obstaclesGroup.isTouching(bear)){
      //ground.velocityX = 0;
      bear.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      honeyGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      honeyGroup.setLifetimeEach(-1);
      honeyGroup.destroyEach();
      obstaclesGroup.destroyEach();
      honey.destroy();
     // gameOver.visible=true;
      gameState=END;
}
  }
   else if (gameState === END) {
     gameOver.visible = true;
    //restart.visible = true;

    //text("Game Over",gameOverImg,600,800);
      //ground.velocityX = 0;
      bear.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    honeyGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     honeyGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  bear.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running)
  score=0
}


function spawnObstacles(){
 if (frameCount % 200 === 0){
   var spikes = createSprite(displayWidth,displayHeight/2+170,10,40);
   spikes.velocityX = -5;
    spikes.addImage(spikeImg);
   
    //assign scale and lifetime to the spikes      
    spikes.scale = 0.5;
    spikes.lifetime = 300;
   
   //add each spikes to the group
    obstaclesGroup.add(spikes);
 }
}

function spawnHoney() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var honey = createSprite(displayWidth,displayHeight/2-150,40,10);
    //honey.y = Math.round(random(80,120));
    honey.addImage(honeyImg);
    honey.scale = 0.5;
    honey.velocityX = -6;
    
     //assign lifetime to the variable
    honey.lifetime = 300;
    
    //adjust the depth
   // honey.depth = bear.depth;
    //bear.depth = bear.depth + 1;
    
    //add each cloud to the group
    honeyGroup.add(honey);
  }
}

