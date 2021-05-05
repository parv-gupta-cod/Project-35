var balloon;
function preload(){
  BackgroundImg = loadImage("images/bg.png")
  BalloonImg = loadImage("images/Baloon.png")
}

function setup() {
  createCanvas(1000,800);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(BalloonImg)
  DATABASE=firebase.database()
  DATABASE.ref("balloon/position").on("value", (snapshot)=>{
    var data=snapshot.val()
    console.log(data)
    balloon.x=data.x
    balloon.y=data.y
  })
}

function draw() {
  background(BackgroundImg);  
  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);
}
drawSprites();
}

function changePosition(x,y){
balloon.x = balloon.x + x;
balloon.y = balloon.y + y;
DATABASE.ref("balloon/position").set({x:balloon.x,y:balloon.y})
}