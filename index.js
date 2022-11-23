const canvas = document.getElementById("example");
const ctx = canvas.getContext("2d");

class Game {
  constructor() {
    this.ctx = null;
    this.bg = null;
    this.player = null;
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

  updateCanvas() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, 700, 500);
      this.drawPlayer();
      this.drawLine();
    }, 20);
  }
}

class Player {
  constructor(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;

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
          console.log("I jumped!");
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
  })
};
