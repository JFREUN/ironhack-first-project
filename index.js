const canvas = document.getElementById("example");
const ctx = canvas.getContext("2d");

class Game {
  constructor() {
    this.ctx = null;
    this.bg = null;
    this.player = null;
    this.frames = 0;
    this.obstacles = [];
  }

  startGame() {
    console.log("starting");
    const canvas = document.getElementById("example");
    this.ctx = canvas.getContext("2d");
    

    //player

    const theAvatar = new Player(30, 30, 50, 290);
    this.player = theAvatar;
    console.log(theAvatar); 


    //for the animation
    this.updateCanvas();
    
  }

  drawLine() {
    ctx.beginPath();
    ctx.moveTo(0, 320);
    ctx.lineTo(700, 320);
    ctx.stroke();
    ctx.closePath();
  }

  drawPlayer() {
    this.ctx.fillRect(
      this.player.posX,
      this.player.posY,
      this.player.width,
      this.player.height
    );
  }

  drawObstacles(){
    this.frames += 1;
    if(this.frames % 120 ===0){
    this.obstacles.push(new Blocks(60,60,640,260,'red'))
    }
    for(let i = 0; i < this.obstacles.length; i++){
      this.obstacles[i].posX += -1;
      this.obstacles[i].update();
    }
   
    
  }

  updateCanvas() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, 700, 500);
      this.drawPlayer();
      this.drawLine();
      this.drawObstacles();
    }, 20);
  }
}

class Player {
  constructor(width, height, posX, posY,color) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.color = color;

    this.speedY = 0;
  }

  jump(){
    this.posY = 210;
  }

  land(){
    this.posY = 290;
  }

  move(e){
    switch (e.keyCode) {
        case 32:
          this.jump();
          break;
      }
  }


  
}

window.onload = () => {
  const game = new Game();
  game.startGame();
  document.addEventListener("keydown", (e) => {
    game.player.move(e);
  });
  document.addEventListener("keyup", (e) => {
    game.player.land();
  });
};



class Blocks {
  constructor(width, height, posX, posY,color) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.speedX = 0;
  }

  update(){
    ctx.fillRect(this.posX, this.posY, this.width,this.height);
    ctx.fillStyle = this.color;
  }
}

console.log(Game.ctx);


