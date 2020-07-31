let player;
let aliens = [];
let bullets = [];
let alienBullets = [];
let alienImage;
let playerImage;
let backgroundImage;
let boomImage;
let menyImage;
let upgrademenyImage;
let bossImage;
let gameover = false;
let boom = false;
let showUpgrademeny = false;
let score = 0;
let level = 1;
let lives = 3;
let numBullets = 1;
let meny = true;
let myStorage = window.localStorage;
let playerSpeed = 1.5;
let bulletSpeed = 4;
let money = 0;

function getHighscore() {
  return myStorage.getItem("Highscore");
}

function setHighscore() {
  if (getHighscore() == null || parseInt(getHighscore()) < score) {
    myStorage.setItem("Highscore", "" + score);
  }
}


function preload() {
  alienImage = loadImage(alienPng);
  playerImage = loadImage(playerPng);
  backgroundImage = loadImage(backgroundPng);
  boomImage = loadImage(boomPng);
  menyImage = loadImage(menyPng);
  upgrademenyImage = loadImage(upgrademenyPng);
  bossImage = loadImage(bossPng);
}

function setup() {
  createCanvas(400, 400);
  player = new Player(175, 325);
  setupAliens();
}

function setupAliens() {
  aliens = [];
  alienBullets = [];
  gameover = false;
  for (let index = 0; index < 7; index++) {
    for (let rad = 0; rad < 6; rad++) {
      aliens.push(new Alien(25 + index * 35, 50 + rad * 25));
    }
  }
}

function drawAliens() {
  let aliensCollided = false;
  for (let index = 0; index < aliens.length; index++) {
    if (aliens[index].haveCollided()) {
      aliensCollided = true;
    }

    if (aliens[index].pos.y >= 360) {
      boom = true;
      lives--;
      setupAliens();
      setTimeout(setupAliens, 5000)
    }
  }
  for (let index = aliens.length - 1; index >= 0; index--) {
    aliens[index].show();
    aliens[index].update();
    if (aliensCollided) {
      aliens[index].turning();
    }

    for (let index2 = bullets.length - 1; index2 >= 0; index2--) {
      if (aliens[index].getCenter().dist(bullets[index2].pos) < 18) {
        //aliens.splice(index, 1);
        //bullets.splice(index2, 1);

        aliens[index].hit();
        if (aliens[index].isDead()) {
          score++;
          aliens[index].skalSlettes = true;
        }

        bullets[index2].skalSlettes = true;
      }
    }
  }
}

function drawBullets() {
  for (let index = bullets.length - 1; index >= 0; index--) {
    bullets[index].show();
    bullets[index].update();

    if (bullets[index].pos.y < 0) {
      //bullets.splice(index, 1);
      bullets[index].skalSlettes = true;
    }
  }

  for (let index = alienBullets.length - 1; index >= 0; index--) {
    alienBullets[index].show();
    alienBullets[index].update();

    if (alienBullets[index].pos.y > height) {
      //bullets.splice(index, 1);
      alienBullets[index].skalSlettes = true;
    }
  }
}



function deleteCharacters() {
  for (let indexA = aliens.length - 1; indexA >= 0; indexA--) {
    if (aliens[indexA].skalSlettes) {
      aliens.splice(indexA, 1);
    }
  }

  for (let indexB = bullets.length - 1; indexB >= 0; indexB--) {
    if (bullets[indexB].skalSlettes) {
      bullets.splice(indexB, 1);
    }
  }
}

function draw() {

  if (meny) {
    image(menyImage, 0, 0)
  }else if (gameover) {
    image(backgroundImage, 0, 0)
  }else if (showUpgrademeny) {
    image(upgrademenyImage, 0, 0)
    fill(255)
    text("Money: " + money, 10, 356);
    text("Bullet speed: " , 50, 190);
    text("Bullets: " , 178, 186);
    text("Player speed: " , 312, 189);
  } else if (boom) {
    image(boomImage, 0, 0)
    setTimeout(function() {
      console.log("test");
      boom = false;
    }, 1000)
  } else {

    rectMode(CENTER)
    background(0);
    fill(255);

    player.show();
    player.update();
    if (player.isHit()) {
      lives--;
      alienBullets = [];
      setupAliens();
      if (lives <= 0) {
        gameover = true;
        level = 1;
        score = 0;
        lives = 3;
        setTimeout(setupAliens, 5000);
      } else {
        boom = true;
      }



    }


    drawAliens();
    drawBullets();

    fill(255)
    text("Points: " + score, 10, 20);
    text("level: " + level, 10, 40);
    text("Highscore: " + getHighscore(), 10, 60);
    text("lives: " + lives, 10, 80);
    text("money: " + money, 10, 100);

    setHighscore();

    if (aliens.length == 0) {
      level++;
      money++;
      showUpgrademeny = true;
      setupAliens();
    }


    deleteCharacters();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.setSpeed(playerSpeed * -1);
  }

  if (keyCode === RIGHT_ARROW) {
    player.setSpeed(playerSpeed);
  }

  if (keyCode === DOWN_ARROW) {
    player.setSpeed(0);
  }

  if (key === ' ') {
    if (bullets.length <= 25) {
      for (let index = 0; index < numBullets; index++) {
        bullets.push(new Bullet(player.pos.x + 12 + index * 5, player.pos.y, bulletSpeed));
      }
    }
  }

  if (meny) {
    meny = false;
  }
}

function mousePressed() {
  console.log(mouseX + ", " + mouseY)
  if (showUpgrademeny) {

    if (money > 1 && mouseX > 9 && mouseX < 90 && mouseY > 90 && mouseY < 170) {
      bulletSpeed += 0.8;
      money--;
    }

    if (money > 3 && mouseX > 138 && mouseX < 220 && mouseY > 92 && mouseY < 177) {
      numBullets++;
      money--;
    }

    if (money > 2 && mouseX > 275 && mouseX < 356 && mouseY > 94 && mouseY < 178) {
      playerSpeed += 0.5;
      money--;
    }

    if (mouseX > 99 && mouseX < 175 && mouseY > 326 && mouseY < 355) {
      showUpgrademeny = false;
    }
  }
}
