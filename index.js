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
  
  // to stop the game
  // checkGameOver() { 
  //   const crashed = this.obstacles.some(function (obstacle) {
  //     console.log(this.player);
  //     return this.player.crashWith(obstacle);
  //   });

  //   if (crashed) {
  //     this.stop();
  //   }
  // }
  // stop() {
  //   clearInterval(this.updateCanvas); //what do I enter here
  // }

  updateCanvas() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, 700, 500);
      this.ctx.drawImage(this.bg, 0, 0, 700, 500);
      this.drawPlayer();
      this.drawLine();
      this.drawObstacles();
      //how to implement shooting bullets?
     // this.checkGameOver();
    }, 20);
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
    this.bullets = [];
    this.frames = 0;
  }

  createAvatar() {
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

  bottom() {
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
      case 13:
        this.shootBullets();
        break;
    }
  }

  shootBullets() {
    this.bullets.push(new Blocks(20, 20, 80, 390, "black"));

    
    console.log(this.bullets);
    console.log('shoot');
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
    this.image = this.createElement();
  }

  createElement() {
    const element = new Image();
    element.src = "./images/fire-ball.png";
    return element;
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
    ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  drawBullets(){
    ctx.fillRect(this.posX,this.posY,this.width,this.height);
  }


}

class Bullets {
  constructor(posX, posY, speed) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.width = 10;
    this.height = 10;
  }

  update() {
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
