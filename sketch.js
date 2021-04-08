//Create variables here
var dog, happyDog, foodStock, foodS, dogImage, happyDogImage;
var database;

function preload(){
  happyDogImage = loadImage("dogImg.png");
  dogImage = loadImage("dogImg1.png");
}

function setup(){
  createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250,400,50,50);
  dog.addImage("dog",dogImage);
  dog.scale = 0.2;
}

function draw(){  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();

  textSize(25);
  fill("black");
  text("Food: " + foodStock,20,50);
}

function readStock(data){
  // foodStock = database.ref('Food');
  // foodStock.on("value",function(data){
  //    food = data.val();
  // })
  // foodStock = database.ref('Food');
  // foodStock.on("value",readStock);
  foodS = data.val();
  //   //Food = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}
