// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelscore;
var player;
var gameGravity = 600;
var pipeInterval = 1.5* Phaser.Timer.SECOND;
var jumpPower = -200;
var pipeGap = 125;
var pipes = [];
var gapMargin = 50;

var blockHeight = 50
var pipeEndExtraWidth = 10;
var pipeEndHeight = 25;
var gameSpeed=250;
/*
 * Loads all resources for the game and gives them names.
 */

function preload() {
  game.load.image('playerimg','../assets/flappy.png');
  game.load.audio('music', '../assets/Minecraft.m4a');
  game.load.image("pipeBlock","../assets/pipe_blue.png");
  game.load.image("pipeEnd","../assets/pipe-end.png");
  game.load.image("background","../assets/download (1) copy.jpeg")
}


/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.sound.play("music");
    // set the background colour of the scene
    game.stage.setBackgroundColor('#000000');
    bg=game.add.image(0,0,"background");
    bg.scale.setTo(2,2)
    // game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(space);

    labelScore=game.add.text(20,20,"0", {font: "60px Arial", fill: "#ffffff"});
    player = game.add.sprite(100,200,"playerimg");
    // game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    // game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    // game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    // game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = gameGravity;
    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump)
    game.input.onDown.add(playerJump);
    player.anchor.setTo(0.5, 0.5);
    game.time.events.loop(pipeInterval, generatePipe);

}

/*
 * This function updates the scene. It is called for every new frame.
 */
 //



 /*
function click(event){

  labelScore=game.add.text(event.x,event.y-20,score);
  game.add.sprite(event.x,event.y,'playerimg');
  game.sound.play("score");
  changeScore();
}




function moveRight(){
  player.x = player.x + 10;
}
function moveLeft(){
  player.x = player.x - 10;
}
function moveUp(){
  player.y = player.y - 10;

}
function moveDown(){
  player.y = player.y + 10;
}
 */
 function changeScore() {
  score +=1;
  labelScore.setText(score.toString());
}
 function playerJump(){
   player.body.velocity.y = jumpPower;
 }

function addPipeEnd(x,y){
  var block = game.add.sprite(x, y, "pipeEnd");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -gameSpeed;
}

function generatePipe(){
  var gapStart = game.rnd.integerInRange(gapMargin, height - pipeGap - gapMargin);

  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);

  for(var y = gapStart; y > 0; y -= blockHeight){
    addPipeBlock(width, y - blockHeight);
  }

  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + pipeGap)

  for(var y = gapStart + pipeGap + pipeEndHeight; y < height; y += blockHeight) {
    addPipeBlock(width, y);
  }
    pipeGap-=1
    gameSpeed+=10
   changeScore();
}


function addPipeBlock(x,y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -gameSpeed;
}
function update() {
  game.physics.arcade.overlap(player,pipes,gameOver);
  if (player.y<=0 || player.y>=height){
      gameOver();
    }
  player.rotation = Math.atan(player.body.velocity.y / 200);

}
function gameOver(){
  alert("Game over. Your score is:"+score)
  location.reload();
}

function changeScore(){
  score ++;
labelScore.setText(score.toString());
}
