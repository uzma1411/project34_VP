var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed,fedTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDogBtn = createButton('Feed Dog');
  feedDogBtn.position(700,95);
  feedDogBtn.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
  textSize(20);
 fill("White");
  //write code to display text lastFed time here
  if(lastFed>=12){
    text("Last Fed : "+ lastFed + " PM", 150,30)
  }
  else if(lastFed == 0){
    text("Last Fed : 12 AM", 150,30)
  }
  else
  {
    text("Last Fed : "+ lastFed + " AM", 150,30)
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  //foodObj.deductFood();
  var xx =  foodObj.getFoodStock();
  if(xx <= 0)
    foodObj.updateFoodStock(0);
  else
  foodObj.updateFoodStock(xx-1);

  database.ref('/').update({
    FeedTime:hour(),
    Food: foodObj.getFoodStock()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
