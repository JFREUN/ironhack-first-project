const canvas = document.getElementById("example");
const ctx = canvas.getContext("2d");

class Game {
  constructor() {
    this.ctx = null;
    this.bg = null;
    this.player = null;
    this.frames = 0;
    this.obstacles = [];
    this.bulletsArray = [];
    this.isGameOn = true;
    this.shootPressed = false;
    this.lives = null;
  }

  startGame() {
    const canvas = document.getElementById("example");
    this.ctx = canvas.getContext("2d");

    //background
    const background = new Image();
    background.src = "./images/mountain-background.jpg";

    background.onload = () => {
      this.bg = background;
      this.updateCanvas();
      this.drawPlayer();
    };

    //player

    const theAvatar = new Player(60, 90, 50, 350);
    this.player = theAvatar;

    //lives 
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
    let maxDistance = 150;

    let unroundedDistance = Math.floor(
      Math.random() * (maxDistance - minDistance + 1) + minDistance
    );
    let distance = Math.round(unroundedDistance / 60) * 60;

    if (this.frames % distance === 0) {
      this.obstacles.push(new Blocks(30, 30, 640, 390, "red"));
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].posX += -3;
      this.obstacles[i].update();
    }
  }

  stop() {
    this.isGameOn = false;
    document.getElementById("stop-screen").style.display = "flex";
    document.getElementById("restart-button").onclick = () => {
      document.getElementById("stop-screen").style.display = "none";
      this.frames = 0;
      this.obstacles = [];
      this.bulletsArray = [];
      this.startGame();
    };
  }

  checkGameOver() {
    for (let i = 0; i < this.obstacles.length; i++) {
      if (
        !(
          this.player.bottom() < this.obstacles[i].top() ||
          this.player.top() > this.obstacles[i].bottom() ||
          this.player.right() < this.obstacles[i].left() ||
          this.player.left() > this.obstacles[i].right()
        )
      ) {
        return this.stop();
      }
    }
  }

  score() {
    const score = Math.floor(this.frames / 10);
    this.ctx.font = "24px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${score}`, 580, 50);
  }

  shootBullets() {
    let bullet = new Bullets(80, 400, 10, 10);
    if (this.shootPressed === true) {
      this.bulletsArray.push(bullet);
    }

    return (this.shootPressed = false);
  }

  shootSwitch(e) {
    switch (e.keyCode) {
      case 13:
        this.shootPressed = true;
        break;
    }
  }
  // destroyObstacles() {
  //   for (let i = 0; i < this.obstacles; i++) {  
  //     const crashed = this.bulletsArray.some(function (bullet) {
  //       console.log("attack!");
  //       return this.obstacles[i].crashWith(bullet);
  //     });

  //     if (crashed) {
  //       this.obstacles.splice(0, 1);
  //     }
  //   }
  // } //doesn't work

  updateCanvas() {
    let gameSwitch = this.isGameOn;
    if (gameSwitch === true) {
      setInterval(() => {
        this.ctx.clearRect(0, 0, 700, 500);
        this.ctx.drawImage(this.bg, 0, 0, 700, 500);
        this.drawPlayer();
        this.drawLine();
        this.drawObstacles();
        this.checkGameOver();
        this.score();
        this.shootBullets();

        for (let i = 0; i < this.bulletsArray.length; i++) {
          this.bulletsArray[i].move();
          this.bulletsArray[i].update();
        }
        // this.destroyObstacles(); // doesn't work
      }, 20);
    }
    requestAnimationFrame(this.updateCanvas);
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
    }
  }
}

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
  drawLife(){
    ctx.fillRect(this.posX,this.posY,this.width,this.height);
  }
  update() {
    ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }
}

class Bullets {
  constructor(posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.delay = 0;
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
  }

  move() {
    this.posX += 1;
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
  document.getElementById("start-button").onclick = () => {
    document.getElementById("start-screen").style.display = "none";
    const game = new Game();
    game.startGame();
    document.addEventListener("keydown", (e) => {
      game.player.move(e);
      game.shootSwitch(e);
    });
    document.addEventListener("keyup", (e) => {
      game.player.land();
    });
  };
};
