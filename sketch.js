var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300, 20, 20)
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  spookySound.loop()
}

function draw() {
  background(200);

  // ghost.debug = true 
  // doorsGroup.debug = true

  ghost.setCollider ("circle", 0, 0, 100)
   if(gameState === "play"){
    if(tower.y > 600){
      tower.y = 300
    }

    ghost.velocityY = ghost.velocityY + 0.8

    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x - 3
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 3
    }
    if(keyDown("space")){
      ghost.velocityY = -5
    }

    createDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.y = 0
    }


  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy()
    gameState = "end"
  }
   }
    
   if(gameState === "end"){
    fill("yellow")
    textSize(30)
    text("Game Over!", 230, 300)
    tower.velocityY = 0
    climbersGroup.setVelocityYEach(0)
    doorsGroup.setVelocityYEach(0)
   }
    drawSprites();
}

 function createDoors(){
  if(frameCount%240 === 0){
    door = createSprite(random(120,480), -55)
    door.addImage(doorImg)
    door.velocityY = 1

    climber = createSprite(200, 5)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.x = door.x
    invisibleBlock = createSprite(200, 10)
    invisibleBlock.visible = false 
    invisibleBlock.velocityY = 1
    invisibleBlock.x = climber.x 
  
    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800
    
    ghost.depth = door.depth 
    ghost.depth += 1

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    
  }
 }
