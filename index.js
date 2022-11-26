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
   
    const canvas = document.getElementById("example");
    this.ctx = canvas.getContext("2d");

     //background 
     const background = new Image(); //not working
     background.src = "./images/mountain-background.jpg";
 
     background.onload = () => {
       this.bg = background;
       this.updateCanvas();
       this.drawPlayer();
     };
 

    //player

    const theAvatar = new Player(60, 90, 50, 350);
    this.player = theAvatar;

    //to stop the game 

    function checkGameOver() {
      const crashed = this.obstacles.some(function (obstacle) {
        console.log(this.player)
        return this.player.crashWith(obstacle);
      });
  
      if(crashed){
        this.stop();
      }
    };
    
    //for the animation
    this.updateCanvas();
  }

  drawLine() {
    ctx.beginPath();
    ctx.moveTo(0, 440);
    ctx.lineTo(700, 440);
    ctx.stroke();
    ctx.closePath();
  }

  drawPlayer() {
    this.ctx.drawImage(
      this.player.img,
      this.player.posX,
      this.player.posY,
      this.player.width,
      this.player.height
    );
  }

  drawObstacles() {
    this.frames += 1;
    let minDistance = 40;
    let maxDistance = 100;

    let unroundedDistance = Math.floor(
      Math.random() * (maxDistance - minDistance + 1) + minDistance
    );
    let distance = Math.round(unroundedDistance / 10) * 10;

    if (this.frames % distance === 0) {
      this.obstacles.push(new Blocks(30, 30, 640, 390, "red"));
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].posX += -3;
      this.obstacles[i].update();
    }
  }

  

  updateCanvas() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, 700, 500);
      this.ctx.drawImage(this.bg,0,0,700,500);
      this.drawPlayer();
      this.drawLine();
      this.drawObstacles();
      //this.checkGameOver();
    }, 20);
  }

  stop() {
    clearInterval(this.interval);
  }
}

class Player {
  constructor(width, height, posX, posY, color) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.img = this.createAvatar();
  }

  createAvatar(){
    const avatar = new Image();
    avatar.src = "./images/Aang.png";

    return avatar;
  }


  left() {
    return this.posX;
  }

  right() {
    return this.posX + this.width;
  }

  top() {
    return this.posY;
  }

  bottowm() {
    return this.posY + this.height;
  }

  jump() {
    this.posY = 290;
  }

  land() {
    this.posY = 350;
  }

  move(e) {
    switch (e.keyCode) {
      case 32:
        this.jump();
        break;
    }
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
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
  constructor(width, height, posX, posY, color) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
  }

  left() {
    return this.posX;
  }

  right() {
    return this.posX + this.width;
  }

  top() {
    return this.posY;
  }

  bottom() {
    return this.posY + this.height;
  }
  update() {
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.fillStyle = this.color;
  }
}
