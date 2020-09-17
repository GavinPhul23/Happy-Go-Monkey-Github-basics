var play = 1;
var end = 0;
var gameState = 1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var ground, groundImage;
var FoodGroup, obstacleGroup;
var gameOver, gameOverImage;
//var score=0;
var background, backgroundImg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
   backgroundImg = loadImage("Back.png");
   gameOverImage = loadImage("Gameover.jpg");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
 
}



function setup() {
  createCanvas(400,400);
  background= createSprite(200,200,400,400); background.addImage(backgroundImg);
  background.scale = 2.5;
  
 monkey = createSprite(50,310,20,50);
  monkey.addAnimation("running",  monkey_running );
  monkey.scale = 0.1
  
  gameOver = createSprite(200, 199, 20, 20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.79;
  gameOver.visible = false;

 ground = createSprite(50,360,400,10);
  ground.shapeColor="black";
 // ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 // ground.velocityX = -(6 + 3*score/100);
  
   
  
  
  BananaGroup = new Group();
  obstacleGroup=new Group();
 score = 0;
  
}


function draw() {
   //background(255);
  
  
   if(gameState === play){
   
  Banana();
  rock(); 
  if (ground.x < 0){ 
    ground.x = ground.width/2; 
    ground.velocityX = -(4 + 3* score/100)
  } 
  if(keyDown("up_arrow")&& monkey.y >= 159) {
    monkey.velocityY = -12;
  } 
  monkey.velocityY =  monkey.velocityY + 0.8
  monkey.collide(ground);
  ground.velocityX = 0; 
  if (monkey.isTouching(BananaGroup)) { 
     score = score + 2;
    BananaGroup.destroyEach();
                                       if(obstacleGroup.isTouching(monkey)) {
    gameState = end
  }
     }
     if (obstacleGroup.isTouching(monkey)) {
    gameState = end
     }

  }
   

  
   if (gameState === end) {  
     monkey.destroy();
   obstacleGroup.destroyEach();
   
        
        obstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
        ground.velocityX = 0;
    monkey.velocityY = 0;
     gameOver.visible = true;
     
     obstacleGroup.setVelocityXEach(0);
     BananaGroup.setVelocityXEach(0); 
     
   }
   
  

    // text functions
    fill("black"); 
  stroke(-188); 
  textSize(22); 
  text("Score : " + score, 262, 37);
  drawSprites();
   fill(0); 
  stroke(-188); 
  textSize(18); 
  text("Score: " + score, 140, 37);

}



function rock(){
 if (frameCount % 90 === 0){
   var obstacle = createSprite(370,340,10,40);
obstacle.addImage(obstaceImage);
obstacle.scale = 0.1;  
     obstacle.velocityX = -5;
obstacle.velocityX = -(6 + score/100);
   obstacleGroup.add(obstacle);
    obstacle.lifetime = 200;
     
    }
   
    //assign scale and lifetime to the obstacle           
   
  
   
   //add each obstacle to the group
  
 
}
function Banana() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,160,40,10);
    banana.y = Math.round(random(130,170));
      banana.velocityX = -(8 + (score / 10));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
  banana.lifetime = 200;
    
    //adjust the depth
banana.depth = monkey.depth;
monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
   BananaGroup.add(banana);
  }
}