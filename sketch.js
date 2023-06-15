var path,car,petrol,tire,engine,nail2;
var pathImg,carImg,petrolImg,tireImg,engineImg,nail2Img;
var essentialsCollection = 0;
var petrolG,tireG,engineG,nail2Group;
var car,carImg
//Game States
var PLAY=1;
var END=0;
var gameState=1;  

var checkpointSound,deathSound

function preload(){
  pathImg = loadImage("Road.png");
  carImg = loadAnimation("Runner-1.png","Runner-2.png");
  petrolImg = loadImage("petrol.png");
  tireImg = loadImage("tire.png");
  engineImg = loadImage("engine.png");
  nail2Img = loadImage("nail2.png");
  endImg =loadAnimation("gameOver.png");
  carImg=loadAnimation("Car.png")

  checkpointSound = loadSound("checkpoint.mp3")
  deathSound = loadSound("death.mp3")
  


}


function setup(){
  
//create a canvas

// createCanvas(window,window);
 createCanvas(windowWidth,windowHeight);
// createCanvas(width,height);
// createCanvas(200,200);

// Moving background

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;



//creating car running
car = createSprite(width/2,height-20,20,20);
car.addAnimation("CarRunning",carImg);
car.scale=0.5;
  
  
petrolG=new Group();
tireG=new Group();
engineG=new Group();
nail2Group=new Group();



}

function draw() {

  if(gameState===PLAY){
  background(0);
  car.x = World.mouseX;
  
  edges= createEdgeSprites();
  car.collide(edges);
  
  //code to reset the background

  // if(path.x > height ){
  //   path.x = height/2;
  // }

  // if(path.y > height ){
  //   path.x = height/2;
  // }

  // if(path.x > height ){
  //   path.y = height;
  // }

   if(path.y > height ){
     path.y = height/2;
   }
  
    createpetrol();
    createtire();
    createengine();
    createnail2();

    if (petrolG.isTouching(car)) {
      petrolG.destroyEach();
      essentialsCollection=essentialsCollection + 50;

      checkpointSound.play();

    }
    else if (tireG.isTouching(car)) {
      tireG.destroyEach();
      essentialsCollection=essentialsCollection + 100;

      checkpointSound.play();
      
    }else if(engineG.isTouching(car)) {
      engineG.destroyEach();
      essentialsCollection= essentialsCollection + 150;

      checkpointSound.play();
      
    }else{
      if(nail2Group.isTouching(car)) {
        gameState=END;
        deathSound.play();
        
        car.addAnimation("carRunning",endImg);
        car.x=width/2;
        car.y=height/2;
        car.scale=0.6;
        
        petrolG.destroyEach();
        tireG.destroyEach();
        engineG.destroyEach();
        nail2Group.destroyEach();
        
        petrolG.setVelocityYEach(0);
        tireG.setVelocityYEach(0);
        engineG.setVelocityYEach(0);
        nail2Group.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("essentials: "+ essentialsCollection,width-150,30);
  }

}

function createpetrol() {
  if (World.frameCount % 200 == 0) {
  var petrol = createSprite(Math.round(random(50, width-50),40, 10, 10));
  petrol.addImage(petrolImg);
  petrol.scale=0.25;
  petrol.velocityY = 5;
  petrol.lifetime = 200;
  petrolG.add(petrol);
  }
}

function createtire() {
  if (World.frameCount % 320 == 0) {
  var tire = createSprite(Math.round(random(50, width-50),40, 10, 10));
  tire.addImage(tireImg);
  tire.scale=0.25;
  tire.velocityY = 5;
  tire.lifetime = 200;
  tireG.add(tire);
}
}

function createengine() {
  if (World.frameCount % 410 == 0) {
  var engine = createSprite(Math.round(random(50, width-50),40, 10, 10));
  engine.addImage(engineImg);
  engine.scale=0.25;
  engine.velocityY = 5;
  engine.lifetime = 200;
  engineG.add(engine);
  }
}

function createnail2(){
  if (World.frameCount % 530 == 0) {
  var nail2 = createSprite(Math.round(random(50, width-50),40, 10, 10));
  nail2.addImage(nail2Img);
  nail2.scale=0.4;
  nail2.velocityY = 4;
  nail2.lifetime = 200;
  nail2Group.add(nail2);
  }
}